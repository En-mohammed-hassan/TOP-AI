import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
	return (
		<>
			<div>
				<Skeleton className=" mb-6 h-12 w-64 mx-auto" />
				<Skeleton className="h-32 w-[90%] mx-auto" />
			</div>
			<div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				<Skeleton className="h-48 mx-2"></Skeleton>
				<Skeleton className="h-48 mx-2"></Skeleton>
				<Skeleton className="h-48 mx-2"></Skeleton>
			</div>
		</>
	);
};
export default loading;
