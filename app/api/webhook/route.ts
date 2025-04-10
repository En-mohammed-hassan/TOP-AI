import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
	const body = await req.text();
	const signature = (await headers()).get("Stripe-Signature") as string;
	try {
		const event = stripe.webhooks.constructEvent(
			body,
			signature,
			process.env.STRIPE_WEBHOOK_SECRET_KEY!
		);
		const session = event.data.object as Stripe.Checkout.Session;
		console.log("🔎 Received event:", event.type);

		if (event.type == "checkout.session.completed") {
			const subscription = await stripe.subscriptions.retrieve(
				session.subscription as string
			);
			if (!session?.metadata?.userId) {
				return NextResponse.json(
					{ error: "There is no user signed in " },
					{ status: 403 }
				);
			}
			await prisma.userSubscription.create({
				data: {
					userId: session.metadata.userId,
					stripeSubscriptionId: subscription.id,
					stripeCustomerId: subscription.customer as string,
					stripePriceId: subscription.items.data[0].price.id,
					stripePeriodEnd: new Date(subscription.current_period_end * 1000),
				},
			});
		}
		if (event.type === "customer.subscription.updated") {
			const subscription = event.data.object as Stripe.Subscription;

			await prisma.userSubscription.update({
				where: { stripeSubscriptionId: subscription.id },
				data: {
					stripePriceId: subscription.items.data[0].price.id,
					stripePeriodEnd: new Date(subscription.current_period_end * 1000),
				},
			});
		}

		revalidatePath("/", "layout");
		return NextResponse.json(null, { status: 200 });
	} catch (error: unknown) {
		console.log(error);
		return NextResponse.json({ error: error }, { status: 400 });
	}
}
