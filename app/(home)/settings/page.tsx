import SettingSection from "@/components/SettingSection";
import {
	apiImageLimitCount,
	checkSubscription,
	getApiLimitCount,
} from "@/lib/server-utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";

const page = async () => {
	const [ImageLimitCount, apiLimitCount, isSubscribed, userSession] =
		await Promise.all([
			apiImageLimitCount(),
			getApiLimitCount(),
			checkSubscription(),
			getKindeServerSession(),
		]);

	const user = await userSession.getUser();
	const isLogged = !!user; // Converts user object to boolean

	return (
		<SettingSection
			apiImageLimitCount={ImageLimitCount}
			isSubscribed={isSubscribed}
			apiLimitCount={apiLimitCount}
			isLogged={isLogged}
		></SettingSection>
	);
};

export default page;
