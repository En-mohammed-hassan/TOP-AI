import type { LucideIcon } from "lucide-react";
import { z } from "zod";

export type headingProops = {
	title: string;
	description: string;
	icon: LucideIcon;
	bgColor: string;
	iconColor: string;
};

export const promptSchema = z.object({
	prompt: z
		.string()
		.trim()
		.min(1, "At least one character is required")
		.max(1000, "Your message should be no longer than 1000 character"),
});

export const ChatSchema = z.array(
	z.object({
		role: z.string(),
		content: z.string().trim().min(1, "At least one character is required"),
	})
);

export const imageSchema = z.object({
	prompt: z
		.string()
		.trim()
		.min(1, "At least one character is required")
		.max(1000, "Your message should be no longer than 1000 character"),
	count: z.string().optional(),
	resolution: z.string().optional(),
});
