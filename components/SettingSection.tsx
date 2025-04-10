"use client";
import React from "react";
import { Image, MessageCircleMoreIcon, Settings } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useProModel } from "@/hooks/useProModel";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import Heading from "./dashboard/Heading";
import { extractErrorMessage } from "@/lib/utils";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const SettingSection = ({
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
	const router = useRouter();
	const chatlimit = parseInt(process.env.NEXT_PUBLIC_MAX_REQUEST_LIMIT || "50");
	const imagelimit = parseInt(process.env.NEXT_PUBLIC_MAX_IMAGE_LIMIT || "2");
	const handleSubmit = async () => {
		try {
			const res = await fetch("/api/stripe");
			if (res.ok) {
				const data = await res.json();
				router.push(data.url);
			} else {
				const error = await res.json();
				const errorMessage = extractErrorMessage(error);
				toast.error(errorMessage);
			}
		} catch (error: unknown) {
			const errorMessage = extractErrorMessage(error);
			toast.error(errorMessage);
		}
	};
	return (
		<div className="m-3 ">
			<Heading
				bgColor="bg-blue-700/10"
				description="Account status"
				icon={Settings}
				iconColor="text-blue-700"
				title="Settings"
			></Heading>
			{isLogged && isSubscribed ? (
				<div className="flex flex-col justify-center gap-4 items-center h-[60vh] w-full">
					<h1 className="text-2xl font-bold">You are subscribed</h1>

					<Card className=" bg-white/10 border-white/10 shadow-lg m-1 py-3 w-full lg:w-1/2">
						<div className=" flex flex-col gap-2 px-4">
							<p className="text-gray-700 text-center text-xl font-semibold ">
								You have unlimited requests
							</p>

							<Button
								className="w-full mx-auto"
								variant="Pro"
								onClick={handleSubmit}
							>
								Manage Subscription<Settings></Settings>
							</Button>
						</div>
					</Card>
				</div>
			) : (
				<div className="flex flex-col justify-center gap-4 items-center h-[60vh] w-full ">
					<h1 className="text-2xl font-bold">You are on free plane</h1>

					<Card className=" bg-white/10 border-white/10 shadow-lg m-1 py-3 w-full lg:w-1/2 border-none shadow-none">
						<div className=" flex flex-col gap-2 px-4">
							<p className="text-gray-700 text-center text-xl font-semibold ">
								Usage of free tear
							</p>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<div className="flex gap-x-2 flex-row items-center">
											<MessageCircleMoreIcon className="h-10 w-10 text-purple-700"></MessageCircleMoreIcon>
											<Progress
												className="h-4 bg-slate-600"
												value={(apiLimitCount / chatlimit) * 100}
											></Progress>
										</div>
									</TooltipTrigger>
									<TooltipContent>
										{chatlimit - apiLimitCount > 0 ? (
											<p>
												You still have {chatlimit - apiLimitCount} chat messages
											</p>
										) : (
											<p>You have exceed your image chat free tear</p>
										)}
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<div className="flex gap-x-2 flex-row items-center">
											<Image className="h-10 w-10 text-purple-700"></Image>
											<Progress
												className="h-4 bg-slate-600"
												value={(apiImageLimitCount / imagelimit) * 100}
											></Progress>
										</div>
									</TooltipTrigger>
									<TooltipContent>
										{imagelimit - apiImageLimitCount > 0 ? (
											<p>
												You still have {imagelimit - apiImageLimitCount} image
												generation request
											</p>
										) : (
											<p>You have exceed your image free tear</p>
										)}
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
							<Button className="w-full mx-auto" variant="Pro" onClick={onOpen}>
								Subscribe Now
							</Button>
						</div>
					</Card>
				</div>
			)}
		</div>
	);
};

export default SettingSection;
