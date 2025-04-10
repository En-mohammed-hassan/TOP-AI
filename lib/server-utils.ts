import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "./prisma";

export async function increaseLimit() {
	try {
		const { getUser } = getKindeServerSession();
		const user = await getUser();
		if (!user) return;
		const dbUser = await prisma.apiLimit.findUnique({
			where: { userID: user.id },
		});
		if (!dbUser) {
			await prisma.apiLimit.create({
				data: { userID: user.id, count: 0, imageCount: 0 },
			});
		} else {
			await prisma.apiLimit.update({
				where: { userID: dbUser.userID },
				data: { count: dbUser.count + 1 },
			});
		}
	} catch (error) {
		console.log(error);
		return;
	}
}
export async function increaseImageLimit() {
	try {
		const { getUser } = getKindeServerSession();
		const user = await getUser();
		if (!user) return;
		const dbUser = await prisma.apiLimit.findUnique({
			where: { userID: user.id },
		});
		if (!dbUser) {
			await prisma.apiLimit.create({
				data: { userID: user.id, count: 0, imageCount: 0 },
			});
		} else {
			await prisma.apiLimit.update({
				where: { userID: dbUser.userID },
				data: { imageCount: dbUser.imageCount + 1 },
			});
		}
	} catch (error) {
		console.log(error);
		return;
	}
}

export async function checkLimit() {
	try {
		const { getUser } = getKindeServerSession();
		const user = await getUser();
		if (!user) return false;

		const dbUser = await prisma.apiLimit.findUnique({
			where: { userID: user.id },
		});
		if (!dbUser) {
			await prisma.apiLimit.create({
				data: { userID: user.id, count: 0, imageCount: 0 },
			});
			return true;
		} else {
			if (dbUser.count >= parseInt(process.env.MAX_REQUEST_LIMIT || "50"))
				return false;
			else return true;
		}
	} catch (error) {
		console.log(error);
		return false;
	}
}

export async function checkImageLimit() {
	try {
		const { getUser } = getKindeServerSession();
		const user = await getUser();
		if (!user) return false;

		const dbUser = await prisma.apiLimit.findUnique({
			where: { userID: user.id },
		});
		if (!dbUser) {
			await prisma.apiLimit.create({
				data: { userID: user.id, imageCount: 0, count: 0 },
			});
			return true;
		} else {
			if (
				dbUser.imageCount >=
				parseInt(process.env.NEXT_PUBLIC_MAX_IMAGE_LIMIT || "2")
			)
				return false;
			else return true;
		}
	} catch (error) {
		console.log(error);
		return false;
	}
}

export async function apiImageLimitCount() {
	try {
		const { getUser } = getKindeServerSession();
		const user = await getUser();
		if (!user) return 0;
		const apiImageLimitCount = await prisma.apiLimit.findUnique({
			where: { userID: user.id },
		});
		if (!apiImageLimitCount) return 0;
		return apiImageLimitCount?.imageCount;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		console.log("error");
		return 0;
	}
}
export async function getApiLimitCount() {
	try {
		const { getUser } = getKindeServerSession();
		const user = await getUser();
		if (!user) return 0;

		const apiLimitCount = await prisma.apiLimit.findUnique({
			where: { userID: user.id },
		});
		if (!apiLimitCount) return 0;
		return apiLimitCount?.count;
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		console.log("error");
		return 0;
	}
}
export async function checkSubscription() {
	try {
		const { getUser } = getKindeServerSession();
		const user = await getUser();
		if (!user) return false;
		const userSubscription = await prisma.userSubscription.findUnique({
			where: { userId: user.id },
		});

		if (
			(userSubscription && userSubscription.stripePeriodEnd?.getTime()) ||
			0 > Date.now()
		) {
			return true;
		}
		return false;
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		console.log("error");
		return false;
	}
}
