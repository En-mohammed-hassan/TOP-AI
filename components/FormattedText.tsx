import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css"; // ✅ Change theme if needed

export default function MessageDisplay({ content }: { content: string }) {
	return (
		<div className="text-black/80 my-auto w-full max-w-full break-words">
			<ReactMarkdown
				remarkPlugins={[remarkGfm]}
				rehypePlugins={[rehypeHighlight]}
				components={{
					h1: ({ children }) => (
						<h1 className="text-2xl font-bold my-2">{children}</h1>
					),
					h2: ({ children }) => (
						<h2 className="text-xl font-bold my-2">{children}</h2>
					),
					h3: ({ children }) => (
						<h3 className="text-lg font-bold my-2">{children}</h3>
					),
					h4: ({ children }) => (
						<h4 className="text-base font-bold my-2">{children}</h4>
					),
					h5: ({ children }) => (
						<h5 className="text-sm font-bold my-2">{children}</h5>
					),
					h6: ({ children }) => (
						<h6 className="text-xs font-bold my-2">{children}</h6>
					),

					// ✅ Fix Inline and Block Code Handling
					code({ inline, className, children, ...props }) {
						if (inline) {
							return (
								<code className="px-1 py-0.5 bg-gray-200 rounded-md text-sm break-words">
									{children}
								</code>
							);
						}
						return (
							<pre className="w-full max-w-full overflow-auto whitespace-pre-wrap rounded-lg p-4 my-2 bg-black text-white">
								<code className={className}>{children}</code>
							</pre>
						);
					},

					// ✅ Fix Lists
					li({ children }) {
						return <li className="ml-5 list-disc">{children}</li>;
					},

					// ✅ Fix Paragraph Wrapping Issue (Prevention of `<pre>` inside `<p>`)
					p({ node, children }) {
						if (node.children.some((child) => child.tagName === "pre")) {
							// Prevent <pre> from being wrapped in <p>
							return <>{children}</>;
						}
						return <p className="w-full max-w-full break-words">{children}</p>;
					},
				}}
			>
				{content}
			</ReactMarkdown>
		</div>
	);
}
