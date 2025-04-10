import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const settingsUrl = `${process.env.APP_URL}/settings`;
		const { getUser } = getKindeServerSession();
		const user = await getUser();

		if (!user)
			return NextResponse.json(
				{ error: { message: "Unauthorized" } },
				{ status: 401 }
			);

		const userSubscribtion = await prisma.userSubscription.findUnique({
			where: { userId: user.id },
		});

		if (userSubscribtion && userSubscribtion.stripeCustomerId) {
			const stripeSession = await stripe.billingPortal.sessions.create({
				customer: userSubscribtion.stripeCustomerId,
				return_url: settingsUrl,
			});
			return NextResponse.json({ url: stripeSession.url }, { status: 200 });
		}
		const stripeSession = await stripe.checkout.sessions.create({
			cancel_url: settingsUrl,
			success_url: settingsUrl,
			payment_method_types: ["card"],
			billing_address_collection: "auto",
			mode: "subscription",
			metadata: { userId: user.id },
			line_items: [
				{
					price_data: {
						currency: "USD",
						unit_amount: 2000,
						recurring: { interval: "month" },
						product_data: {
							name: "PRO AI",
							description: "Unlimited ai generation",
						},
					},

					quantity: 1,
				},
			],
		});

		return NextResponse.json({ url: stripeSession.url }, { status: 200 });
	} catch (error: unknown) {
		console.log(error);
		return NextResponse.json(error, { status: 500 });
	}
}
