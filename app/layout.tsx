import "@/app/globals.css";
import TawkWidget from "@/components/TawkWidget";

import { Toaster } from "react-hot-toast";

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<TawkWidget></TawkWidget>
			<body className="bg-white">
				<Toaster position="top-right" />

				<main>{children}</main>
			</body>
		</html>
	);
}
