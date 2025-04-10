import { Card, CardContent } from "@/components/ui/card";

export default function page() {
	return (
		<section className="w-full px-6 py-4 bg-white dark:bg-gray-950">
			<div className="max-w-5xl mx-auto text-center">
				<h2 className="text-4xl font-bold tracking-tight mb-6 text-gray-900 dark:text-white">
					About Top AI
				</h2>
				<p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
					Top AI is your all-in-one AI assistant powered by OpenAI's
					cutting-edge models. Whether you're chatting with an intelligent
					assistant, generating stunning images, or crafting clean code — we
					make AI work for you.
				</p>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					<Card className="bg-gray-100 dark:bg-gray-900 border-0">
						<CardContent className="p-6 text-left">
							<h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
								💬 Chatbot Assistant
							</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400">
								Engage in natural, intelligent conversations. From productivity
								to problem-solving, our chatbot is designed to assist you 24/7.
							</p>
						</CardContent>
					</Card>

					<Card className="bg-gray-100 dark:bg-gray-900 border-0">
						<CardContent className="p-6 text-left">
							<h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
								🖼️ Image Generator
							</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400">
								Create stunning AI-generated visuals from simple prompts. Ideal
								for designers, marketers, and creatives.
							</p>
						</CardContent>
					</Card>

					<Card className="bg-gray-100 dark:bg-gray-900 border-0">
						<CardContent className="p-6 text-left">
							<h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
								💻 Code Generator
							</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400">
								Speed up development with smart code suggestions and generation.
								Perfect for developers at all levels.
							</p>
						</CardContent>
					</Card>
				</div>

				<p className="mt-12 text-sm text-gray-500 dark:text-gray-400">
					Powered by OpenAI's GPT models. We're committed to delivering
					reliable, secure, and intelligent AI experiences.
				</p>
			</div>
		</section>
	);
}
