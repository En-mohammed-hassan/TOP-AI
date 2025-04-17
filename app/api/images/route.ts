import { imageSchema } from "@/constants/Types";
import {
	checkImageLimit,
	checkSubscription,
	increaseImageLimit,
} from "@/lib/server-utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
	try {
		const openai = new OpenAI({
			apiKey: process.env.OPENAI_KEY,
		});
		const { getUser } = getKindeServerSession();
		const isSubsicribed = await checkSubscription();
		const haveFreePlane = await checkImageLimit();

		const body = await req.json();
		const user = await getUser();
		const { prompt, count = "1", resolution = "256x256" } = body;
		const result = imageSchema.safeParse(body);
		console.log(result);
		console.log(result.success);
		if (!result.success) {
			return NextResponse.json(
				{ error: result.error.errors[0] },
				{ status: 400 }
			);
		}
		if (!user) {
			return NextResponse.json(
				{ error: { message: "Not Authinticated " } },
				{ status: 401 }
			);
		}
		if (!haveFreePlane && !isSubsicribed) {
			return NextResponse.json(
				{ error: { message: "You have exceed your limit" } },
				{ status: 402 }
			);
		}

		const response = await openai.images.generate({
			prompt: prompt,
			n: parseInt(count),
			size: resolution,
		});
		if (!isSubsicribed) {
			await increaseImageLimit();
		}

		return NextResponse.json(
			{
				data: response.data,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.log(error);
		return NextResponse.json(error, { status: 500 });
	}
}
