import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function extractErrorMessage(error: unknown): string {
	// Check if the error is an instance of Error
	if (error instanceof Error) {
		return error.message;
	}

	// Check if the error is an object with a 'message' property
	if (typeof error === "object" && error !== null && "message" in error) {
		return (error as { message: string }).message;
	}

	// If the error doesn't match any of the above conditions, return a default message
	return "An unknown error occurred";
}
