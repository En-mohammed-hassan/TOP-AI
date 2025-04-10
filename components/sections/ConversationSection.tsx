"use client";
import { useEffect } from "react";

import Heading from "../dashboard/Heading";
import { Textarea } from "../ui/textarea";
import SubmitingButton from "../SubmitingButton";
import Loader from "../Loader";
import Empty from "../Empty";
import FormattedText from "../FormattedText";
import { MessageCircle } from "lucide-react";
import { useProModel } from "@/hooks/useProModel";
import type { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { cn, extractErrorMessage } from "@/lib/utils";
import BotAvatar from "../BotAvatar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { promptSchema } from "@/constants/Types";
import toast from "react-hot-toast";
import type { z } from "zod";
import { useRouter } from "next/navigation";
import { useChatStore } from "@/hooks/useChatStore";
import { Button } from "../ui/button";

const ConversationSec = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const { onOpen } = useProModel();
	const { push, messages, resetMessages } = useChatStore();
	type promptSchemaType = z.infer<typeof promptSchema>;

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<promptSchemaType>({ resolver: zodResolver(promptSchema) });
	const onSubmit = async function (data: promptSchemaType) {
		try {
			const userMessage: ChatCompletionMessageParam = {
				role: "user",
				content: data.prompt,
			};
			const newRequestMessage: ChatCompletionMessageParam[] = [
				...messages,
				userMessage,
			];

			const response = await fetch("/api/conversation", {
				headers: { "Content-Type": "application/json" },
				method: "POST",
				body: JSON.stringify({ newRequestMessage }),
			});

			if (!response.ok) {
				if (response.status === 402) {
					onOpen();
				} else {
					const error = await response.json();
					const errorMessage = extractErrorMessage(error);
					toast.error(errorMessage);
				}
			} else {
				const data = await response.json();
				push([userMessage, data?.data]);
			}
		} catch (error) {
			const errorMessage = extractErrorMessage(error);
			toast.error(errorMessage);
		} finally {
			reset();
			router.refresh();
		}
	};
	useEffect(() => {
		if (errors.prompt) {
			toast.error(errors.prompt.message);
		}
	}, [errors]);

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			onKeyDown={(event) => {
				if (event.key === "Enter" && !event.shiftKey) {
					event.preventDefault();
					const form = event.target as HTMLElement;
					const closestForm = form.closest("form") as HTMLFormElement;
					closestForm?.requestSubmit(); // This will submit the form and trigger the server action
				}
			}}
		>
			<div className="mx-3 ">
				<div className="flex flex-row justify-between items-center gap-2">
					<Heading
						title="Conversation"
						description="Hello im here for any question."
						icon={MessageCircle}
						iconColor="text-purple-700 "
						bgColor="bg-purple-700/10"
					></Heading>
					<Button
						onClick={(e) => {
							e.preventDefault();
							resetMessages();
						}}
						variant="outline"
					>
						New Chat
					</Button>
				</div>

				<div className=" bg-white  shadow-sm my-5 border rounded-sm p-2  ">
					<div className="  flex   gap-3 justify-between  max-sm:flex-col overflow-hidden ">
						<Textarea
							rows={1}
							{...register("prompt")}
							className="focus-visible:ring-0 border-none focus-visible:ring-transparent fit-textare break-words overflow-wrap-anywhere"
							placeholder="What is in your mind"
						></Textarea>
						<SubmitingButton isSubmitting={isSubmitting}></SubmitingButton>
					</div>
				</div>

				<Loader isSubmitting={isSubmitting}></Loader>
				{messages?.length === 0 ? (
					<div>
						{!isSubmitting && <Empty lable="Start chat with Top-Ai"></Empty>}
					</div>
				) : (
					<div className="text-xl text-gray-900 m-3 mt-5 flex flex-col-reverse">
						{messages?.map((message, index) => (
							<div key={index} className="flex gap-4 items-center">
								{message.role === "user" ? children : <BotAvatar />}
								<div
									className={cn(
										"text-muted-foreground my-2 shadow-lg rounded-sm p-3 max-w-[95%]",
										message.role === "user"
											? "bg-white"
											: "bg-muted-foreground/5"
									)}
								>
									<FormattedText
										content={message?.content as string}
									></FormattedText>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</form>
	);
};

export default ConversationSec;
