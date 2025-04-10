import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = async () => {
	return (
		<>
			<div className="flex gap-6 m-4 ">
				<Skeleton className="h-12 w-16" />
				<div className="flex flex-col gap-2">
					<Skeleton className="h-6 w-36" />
					<Skeleton className="h-4 w-32" />
				</div>
			</div>
			<div className="mt-16">
				<Skeleton className="h-8 w-64 mx-auto"></Skeleton>
			</div>
			<Skeleton className="h-48 w-80 mx-auto mt-12"></Skeleton>
		</>
	);
};
export default loading;
