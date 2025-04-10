import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const UserAvatar = async () => {
	const { getUser } = getKindeServerSession();
	const user = await getUser();
	return (
		<div>
			{!!user ? (
				<Avatar>
					<AvatarImage src={user?.picture || ""} alt="avatar"></AvatarImage>
					<AvatarFallback>
						<p>{user.given_name?.charAt(0)}</p>
						<p>{user.family_name?.charAt(0)}</p>
					</AvatarFallback>
				</Avatar>
			) : (
				<Avatar>
					<AvatarImage src="/user.jpg"></AvatarImage>
					<AvatarFallback>
						<p>US</p>
					</AvatarFallback>
				</Avatar>
			)}
		</div>
	);
};

export default UserAvatar;
