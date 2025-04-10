import { ChatSchema } from "@/constants/Types";
import {
	checkLimit,
	checkSubscription,
	increaseLimit,
} from "@/lib/server-utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export async function POST(req: Request) {
	try {
		const { getUser } = getKindeServerSession();
		const user = await getUser();
		const isSubscribed = await checkSubscription();
		const haveFreePlane = await checkLimit();
		const openAi = new OpenAI({ apiKey: process.env.OPENAI_KEY });
		const instructionMessage: ChatCompletionMessageParam = {
			role: "system",
			content:
				"you are code generator , try to give best answer with the shortest way , you must answer only in markdown, use code comment for explations ",
		};
		const data = await req.json();
		const reqMessages = data.newRequestMessage;
		const result = ChatSchema.safeParse(reqMessages);
		if (!result.success) {
			return NextResponse.json(
				{ error: result.error.errors[0] },
				{ status: 400 }
			);
		}
		if (!user) {
			return NextResponse.json(
				{ error: { message: "Not authenticated" } },
				{ status: 401 }
			);
		}
		if (!isSubscribed && !haveFreePlane) {
			return NextResponse.json(
				{ error: { message: "you have exceed your limit" } },
				{ status: 402 }
			);
		}
		const response = await openAi.chat.completions.create({
			model: "gpt-4o-mini",
			messages: [instructionMessage, ...reqMessages],
		});
		if (!isSubscribed) await increaseLimit();
		return NextResponse.json(
			{ data: response.choices[0].message },
			{ status: 200 }
		);
	} catch (error: unknown) {
		return NextResponse.json(error, { status: 500 });
	}
}
