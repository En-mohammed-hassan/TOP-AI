import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
	return (
		<div className="px-6 my-4">
			<div className="flex justify-between ">
				<Skeleton className=" h-10 w-28"></Skeleton>
				<Skeleton className=" h-10 w-28"></Skeleton>
			</div>
			<div className="my-6">
				<Skeleton className="mb-2 h-14 w-96 mx-auto"></Skeleton>
				<Skeleton className="mb-2 h-12 w-72 mx-auto"></Skeleton>
				<Skeleton className="mb-2 h-12 w-64 mx-auto"></Skeleton>
			</div>
			<div className="my-6">
				<Skeleton className="mb-2 h-64 md:w-1/2 mx-auto"></Skeleton>
			</div>
		</div>
	);
};
export default loading;
