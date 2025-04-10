"use client ";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

const SubmitingButton = ({ isSubmitting }: { isSubmitting?: boolean }) => {
	const { pending } = useFormStatus();
	if (isSubmitting === undefined) isSubmitting = pending;
	return isSubmitting ? (
		<Button type="submit" disabled className=" max-sm:w-full " variant="Pro">
			Generating
		</Button>
	) : (
		<Button type="submit" className=" max-sm:w-full" variant="Pro">
			Generate
		</Button>
	);
};

export default SubmitingButton;
