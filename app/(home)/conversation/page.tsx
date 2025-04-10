import UserAvatar from "@/components/UserAvatar";
import ConversationSection from "@/components/sections/ConversationSection";

import React from "react";

const page = async () => {
	return (
		<div>
			<ConversationSection>
				<UserAvatar></UserAvatar>
			</ConversationSection>
		</div>
	);
};

export default page;
