import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { DashboardLinks } from "@/constants/DashboardLinks";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
const dashboard = async () => {
	await new Promise((resolve) => setTimeout(resolve, 3000));

	return (
		<div>
			<h1 className="text-4xl text-center font-bold">TOP - AI </h1>
			<p className=" font-medium text-gray-500 text-center">
				Explore Ai And Touch The Sky
			</p>
			<div className="flex flex-col gap-6 w-2/3 mx-auto mt-6">
				{DashboardLinks.map((link) => (
					<Link href={link.href} key={link.href}>
						<Card className=" group transition-all hover:bg-gray-400 duration-300">
							<div className="flex justify-between items-center  p-4">
								<div className="flex justify-start items-center  gap-4">
									<link.icon className={cn("h-8 w-8", link.color)}></link.icon>

									<p className="my-auto">{link.name}</p>
								</div>
								<ArrowRight className="text-gray-500 group-hover:translate-x-2 duration-500 group-hover:text-gray-900 transition-all"></ArrowRight>
							</div>
						</Card>
					</Link>
				))}
			</div>
		</div>
	);
};

export default dashboard;
