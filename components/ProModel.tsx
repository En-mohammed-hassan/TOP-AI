"use client";

import { useProModel } from "@/hooks/useProModel";
import { Check, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { DashboardLinks } from "@/constants/DashboardLinks";
import { Card } from "./ui/card";
import { cn, extractErrorMessage } from "@/lib/utils";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ProModel = () => {
	const router = useRouter();
	const { isOpen, onClose } = useProModel();
	const onUpgrade = async () => {
		try {
			const res = await fetch("/api/stripe");
			if (res.ok) {
				const data = await res.json();
				router.push(data.url);
			} else {
				const data = await res.json();
				const error = data?.error || "Unknown error";
				const errorMessage = extractErrorMessage(error);
				toast.error(errorMessage);
			}
		} catch (error: unknown) {
			const errorMessage = extractErrorMessage(error);
			toast.error(errorMessage);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="text-center">
						Upgrade To Pro Model
					</DialogTitle>
					<DialogDescription></DialogDescription>
					<div className="flex flex-col gap-6 w-full mx-auto mt-6">
						{DashboardLinks.map((link) => (
							<Card key={link.href}>
								<div className="flex justify-between items-center  p-4">
									<div className="flex justify-start items-center  gap-4">
										<link.icon
											className={cn("h-8 w-8", link.color)}
										></link.icon>

										<p className="my-auto">{link.name}</p>
									</div>
									{link.available ? (
										<Check className="text-green-500 "></Check>
									) : (
										<XIcon className="text-red-500 "></XIcon>
									)}
								</div>
							</Card>
						))}
					</div>
				</DialogHeader>

				<DialogFooter className="sm:justify-start">
					<DialogClose asChild>
						<Button
							type="button"
							variant="Pro"
							className="w-full"
							onClick={onUpgrade}
						>
							Upgrade Now
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default ProModel;
