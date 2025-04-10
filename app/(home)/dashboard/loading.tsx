import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = async () => {
	return (
		<>
			<Skeleton className="h-16 w-48 mx-auto" />
			<div className="flex flex-col gap-6 w-2/3 mx-auto mt-6">
				<Skeleton className="h-16 w-full" />
				<Skeleton className="h-16 w-full" />
				<Skeleton className="h-16 w-full" />
				<Skeleton className="h-16 w-full" />
				<Skeleton className="h-16 w-full" />
			</div>
		</>
	);
};
export default loading;
