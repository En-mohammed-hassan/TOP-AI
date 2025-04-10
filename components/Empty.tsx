import Image from "next/image";
import React from "react";

const Empty = ({ lable }: { lable: string }) => {
	return (
		<div className=" flex flex-col  gap-4 items-center ">
			<h1 className="text-2xl text-muted-foreground text-center font-semiboldi animate-pulse">
				{lable}
			</h1>
			<div className=" aspect-[1] relative w-[50%]">
				<Image fill className="" alt="logo" src="/logo.jpg"></Image>
			</div>
		</div>
	);
};

export default Empty;
