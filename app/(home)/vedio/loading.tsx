import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
	return (
		<>
			<div className="flex gap-6 m-4 ">
				<Skeleton className="h-12 w-16" />
				<div className="flex flex-col gap-2">
					<Skeleton className="h-6 w-32" />
					<Skeleton className="h-4 w-64" />
				</div>
			</div>
			<div className="m-12">
				<Skeleton className="h-8 w-32 mx-auto"></Skeleton>
			</div>
			<Skeleton className="h-72 w-56 mx-auto mt-10"></Skeleton>
		</>
	);
};
export default loading;
