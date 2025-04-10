import React from "react";
import { headingProops } from "@/constants/Types";
import { cn } from "@/lib/utils";

const Heading = ({
	title,
	description,
	icon: Icon,
	bgColor,
	iconColor,
}: headingProops) => {
	return (
		<div className="flex  items-center  gap-5">
			<Icon
				className={cn("h-12 w-12 p-2 rounded-md", bgColor, iconColor)}
			></Icon>
			<div>
				<h1 className="text-3xl font-bold">{title}</h1>
				<p className="text-sm text-gray-600">{description}</p>
			</div>
		</div>
	);
};

export default Heading;
