import Image from "next/image";
import { useFormStatus } from "react-dom";

const Loader = ({ isSubmitting }: { isSubmitting?: boolean }) => {
	const { pending } = useFormStatus();
	if (isSubmitting === undefined) isSubmitting = pending;

	return (
		<>
			{isSubmitting && (
				<div className="flex justify-center items-center rounded-sm m-3 h-[80vh] bg-muted-foreground/5 ">
					<div className="animate-bounce h-24 w-24 m-3 ">
						<Image
							fill
							alt="logo"
							src="/logo.jpg"
							className="rounded-full"
						></Image>
					</div>
				</div>
			)}
		</>
	);
};

export default Loader;
