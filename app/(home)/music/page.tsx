import Heading from "@/components/dashboard/Heading";
import Empty from "@/components/Empty";
import { BugOff } from "lucide-react";
import React from "react";

const page = async () => {
	return (
		<div className="m-3">
			<div className="mb-10">
				<Heading
					bgColor="bg-blue-700/10"
					description="The service will be available as soon as possible."
					icon={BugOff}
					iconColor="text-blue-700"
					title="Music"
				></Heading>
			</div>
			<Empty lable="Coming soon ...."></Empty>
		</div>
	);
};

export default page;
