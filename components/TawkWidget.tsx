"use client";

import { useEffect } from "react";

export default function TawkWidget() {
	useEffect(() => {
		if (typeof window === "undefined") return;

		const tawk = document.createElement("script");
		tawk.src = "https://embed.tawk.to/67f02a92c691e11910004256/1io12cnvl";
		tawk.async = true;
		tawk.charset = "UTF-8";
		tawk.setAttribute("crossorigin", "*");
		document.body.appendChild(tawk);

		return () => {
			// Optional cleanup if needed
		};
	}, []);

	return null; // This component doesn't render anything
}
