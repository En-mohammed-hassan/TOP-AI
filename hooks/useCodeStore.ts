import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ChatCompletionMessageParam } from "openai/resources/index.mjs";
interface chatStore {
	messages: ChatCompletionMessageParam[];
	push: (message: ChatCompletionMessageParam[]) => void;
	resetMessages: () => void;
}

export const useCodeStore = create<chatStore>()(
	persist(
		(set, get) => ({
			messages: [],
			push: (message) => {
				set({ messages: [...get().messages, ...message] });
			},
			resetMessages: () => {
				set({ messages: [] });
			},
		}),
		{
			name: "code-storage",
		}
	)
);
