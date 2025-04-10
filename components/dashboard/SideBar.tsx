"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DashboardNavLinks } from "@/constants/DashboardNavLinks";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { ZapIcon } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useProModel } from "@/hooks/useProModel";

const SideBar = ({
	apiLimitCount = parseInt(process.env.NEXT_PUBLIC_MAX_REQUEST_LIMIT || "50"),
	apiImageLimitCount = parseInt(process.env.NEXT_PUBLIC_MAX_IMAGE_LIMIT || "2"),
	isLogged = false,
	isSubscribed = false,
}: {
	apiImageLimitCount: number;
	apiLimitCount: number;
	isLogged: boolean;
	isSubscribed: boolean;
}) => {
	const { onOpen } = useProModel();
	const path = usePathname();
	const limit =
		path == "/image"
			? parseInt(process.env.NEXT_PUBLIC_MAX_IMAGE_LIMIT || "2")
			: parseInt(process.env.NEXT_PUBLIC_MAX_REQUEST_LIMIT || "50");
	const userCount = path == "/image" ? apiImageLimitCount : apiLimitCount;

	return (
		<div className=" h-screen flex flex-col gap-5 mt-4 w-72 ">
			<Link href="/">
				<div className="flex justify-center  item-center cursor-pointer hover:opacity-60 transition-all hover:scale-110 duration-700 ">
					<Image
						src="/logo.jpg"
						width={40}
						height={40}
						alt="logo"
						className="rounded-full mx-3"
					></Image>
					<p className="text-white my-auto font-bold text-2xl">TOP - AI</p>
				</div>
			</Link>
			<div className="m-3 flex flex-col gap-y-3">
				{DashboardNavLinks.map((link) => (
					<Link
						href={link.href}
						key={link.href}
						className={cn(
							"flex  gap-4 hover:bg-white/10 rounded-sm p-1 transition-all",
							path == link.href && "bg-white/10"
						)}
					>
						<div>
							<link.icon className={cn("h-5 w-5", link.color)}></link.icon>
						</div>
						<p className={cn("text-white tracking-wider")}>{link.name}</p>
					</Link>
				))}
			</div>
			{isLogged && !isSubscribed && (
				<div className="fixed left-0 bottom-0 w-72 p-2">
					<Card className=" bg-white/10 border-white/10 shadow-lg m-1 py-3">
						<div className=" flex flex-col gap-2 px-4">
							<p className="text-white text-center">Usage of free tear</p>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Progress
											className="h-4 bg-slate-600"
											value={(userCount / limit) * 100}
										></Progress>
									</TooltipTrigger>
									<TooltipContent>
										{limit - userCount > 0 ? (
											<p>You still have {limit - userCount} request</p>
										) : (
											<p>You have exceed your free tear</p>
										)}
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
							<Button className="w-full mx-auto" variant="Pro" onClick={onOpen}>
								Upgrade<ZapIcon></ZapIcon>
							</Button>
						</div>
					</Card>
				</div>
			)}
		</div>
	);
};

export default SideBar;
