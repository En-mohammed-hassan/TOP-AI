import Link from "next/link";
import { Link as LinkIcon } from "lucide-react";

export default function Footer() {
	return (
		<footer className="  w-full py-1 text-center bg-gray-900 text-white text-sm">
			<p>© {new Date().getFullYear()} All rights reserved </p>
			<Link href={process.env.NEXT_PUBLIC_PORTFOLIO!}>
				<div className=" flex flex-row justify-center items-center gap-2">
					<p className="font-semibold"> Designed By</p>
					<LinkIcon></LinkIcon>
					<p className="font-semibold"> En Mhd Hassan </p>
				</div>
			</Link>
		</footer>
	);
}
