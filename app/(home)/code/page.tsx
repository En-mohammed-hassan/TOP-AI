import CodeSection from "@/components/sections/CodeSection";
import UserAvatar from "@/components/UserAvatar";
import React from "react";

const page = async () => {

	return (
		<div>
			<CodeSection>
				<UserAvatar></UserAvatar>
			</CodeSection>
		</div>
	);
};

export default page;
