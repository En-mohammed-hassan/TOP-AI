"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Components } from "react-markdown";
import "highlight.js/styles/github.css";

type MessageDisplayProps = {
	content: string;
};

const MessageDisplay: React.FC<MessageDisplayProps> = ({ content }) => {
	const components: Components = {
		code({ className, children, ...rest }) {
			const isInline = !className;

			return isInline ? (
				<code
					className="bg-gray-200 dark:bg-gray-700 rounded px-1 py-0.5 text-sm break-words"
					{...rest}
				>
					{children}
				</code>
			) : (
				<pre className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 overflow-x-auto text-sm w-full break-words">
					<code className={className} {...rest}>
						{children}
					</code>
				</pre>
			);
		},
	};

	return (
		<div className=" max-w-[280px]  lg:max-w-screen-sm  xl:max-w-screen-md overflow-hidden ">
			<div className="text-base w-full break-words whitespace-pre-wrap overflow-hidden">
				<ReactMarkdown
					remarkPlugins={[remarkGfm]}
					rehypePlugins={[rehypeHighlight]}
					components={components}
				>
					{content}
				</ReactMarkdown>
			</div>
		</div>
	);
};

export default MessageDisplay;
