import React from "react";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuItem,
	DropdownMenuContent,
	DropdownMenuSeparator,
	DropdownMenuLabel,
} from "../ui/dropdown-menu";
import Image from "next/image";
import {
	LoginLink,
	LogoutLink,
	RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "../ui/button";

const LogOutMenu = async () => {
	const { getUser } = getKindeServerSession();
	const user = await getUser();
	return (
		<div className="  ">
			{user ? (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<button>
							<Image
								src={
									user?.picture ??
									"https://avatar.vercel.sh/rauchg.svg?text=User"
								}
								alt="profile"
								width={33}
								height={33}
								className="rounded-full"
							></Image>
						</button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>{user.email}</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem asChild>
							<LogoutLink className="cursor-pointer">Logout</LogoutLink>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			) : (
				<div className="flex justify-between gap-4">
					<Button variant="Pro">
						<LoginLink>Login</LoginLink>
					</Button>
					<Button variant="Pro">
						<RegisterLink>SignUp</RegisterLink>
					</Button>
				</div>
			)}
		</div>
	);
};

export default LogOutMenu;
