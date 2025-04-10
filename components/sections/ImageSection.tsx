"use client";
import Heading from "@/components/dashboard/Heading";
import Empty from "@/components/Empty";
import Loader from "@/components/Loader";

import { countOptions } from "@/constants/CountOptions";
import { resolutionOptions } from "@/constants/ResolutionOptions";
import { imageSchema } from "@/constants/Types";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";
import { Image as image } from "lucide-react";
import { extractErrorMessage } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import SubmitingButton from "@/components/SubmitingButton";
import { useProModel } from "@/hooks/useProModel";
import { useRouter } from "next/navigation";

const ImgeSection = () => {
	const router = useRouter();
	const { onOpen } = useProModel();
	type ImageSchemaType = z.infer<typeof imageSchema>;
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		control,
		reset,
	} = useForm<ImageSchemaType>({ resolver: zodResolver(imageSchema) });

	const [images, setImages] = useState<string[]>([]);

	const handleOnSubmit = async function (data: ImageSchemaType) {
		try {
			const response = await fetch("/api/images", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					prompt: data.prompt,
					count: data.count,
					resolution: data.resolution,
				}),
			});

			if (!response.ok) {
				if (response.status == 402) onOpen();
				else {
					const errorData = await response.json();
					const errorMessage = extractErrorMessage(errorData?.error);
					toast.error(errorMessage);
				}
				return;
			} else {
				const dataFromServer = await response.json();
				const images = dataFromServer.data?.map(
					(image: { url: string }) => image.url
				);
				setImages(images);
			}
		} catch (error) {
			const errorMessage = extractErrorMessage(error);
			toast.error(errorMessage);
			return;
		} finally {
			router.refresh();
			reset();
		}
	};
	useEffect(() => {
		if (errors.prompt) {
			toast.error(errors.prompt.message);
		}
		if (errors.count) {
			toast.error(errors.count.message);
		}
		if (errors.resolution) {
			toast.error(errors.resolution.message);
		}
	}, [errors]);
	return (
		<form
			onSubmit={handleSubmit(handleOnSubmit)}
			onKeyDown={(event) => {
				if (event.key === "Enter" && !event.shiftKey) {
					event.preventDefault();
					const form = event.target as HTMLElement;
					const closestForm = form.closest("form") as HTMLFormElement;
					closestForm?.requestSubmit();
				}
			}}
		>
			<div className="mx-3 ">
				<Heading
					title="Image"
					description="Change any prompt to actual image."
					icon={image}
					iconColor="text-green-700"
					bgColor="bg-green-700/10"
				></Heading>

				<div className=" bg-white  shadow-sm my-5 border rounded-sm p-2 ">
					<div className="  flex   gap-3 justify-between  max-lg:flex-col ">
						<Textarea
							{...register("prompt")}
							rows={1}
							className=" focus-visible:ring-0 border-none focus-visible:ring-transparent fit-textare"
							placeholder="Generate your photo by adding you prompt here"
						></Textarea>
						<Controller
							name="count"
							control={control}
							render={({ field }) => (
								<Select
									onValueChange={field.onChange}
									value={field.value || ""}
								>
									<SelectTrigger className="lg:max-w-[110px]">
										<SelectValue placeholder="count"></SelectValue>
									</SelectTrigger>

									<SelectContent>
										{countOptions.map((option) => (
											<SelectItem key={option.value} value={option.value}>
												{option.lable}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							)}
						/>
						<Controller
							name="resolution"
							control={control}
							render={({ field }) => (
								<Select
									onValueChange={field.onChange}
									value={field.value || ""}
								>
									<SelectTrigger className="lg:max-w-[110px]">
										<SelectValue placeholder="resolution"></SelectValue>
									</SelectTrigger>

									<SelectContent>
										{resolutionOptions.map((option) => (
											<SelectItem key={option.value} value={option.value}>
												{option.lable}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							)}
						/>

						<SubmitingButton isSubmitting={isSubmitting}></SubmitingButton>
					</div>
				</div>

				<Loader isSubmitting={isSubmitting}></Loader>
				{images?.length === 0 ? (
					<div>
						{!isSubmitting && (
							<Empty lable="Get the best code for your project "></Empty>
						)}
					</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{images?.map((image, index) => (
							<div key={index} className="relative w-full aspect-[1] group">
								<Image
									src={image}
									alt="generated image"
									fill
									className="object-contain rounded-lg shadow-lg "
								/>
								<div className=" rounded-lg  absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
									<Button className=" text-lg" asChild>
										<a href={image} target="_blank">
											Download
										</a>
									</Button>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</form>
	);
};

export default ImgeSection;
