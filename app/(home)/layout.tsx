import "@/app/globals.css";
import { MenuIcon } from "lucide-react";

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import LogOutMenu from "@/components/dashboard/LogOutMenu";
import SideBar from "@/components/dashboard/SideBar";
import {
	checkSubscription,
	getApiLimitCount,
	apiImageLimitCount,
} from "@/lib/server-utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import ProModel from "@/components/ProModel";
import Footer from "@/components/Footer";
export const dynamic = "force-dynamic";

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [ImageLimitCount, apiLimitCount, isSubscribed, userSession] =
		await Promise.all([
			apiImageLimitCount(),
			getApiLimitCount(),
			checkSubscription(),
			getKindeServerSession(),
		]);

	const user = await userSession.getUser();
	const isLogged = !!user; // Converts user object to boolean

	return (
		<>
			<ProModel />
			<div className="flex h-screen w-full">
				<aside className="w-72 h-full bg-gray-900 text-white shadow-md fixed left-0 top-0 max-sm:hidden">
					<SideBar
						apiImageLimitCount={ImageLimitCount}
						isSubscribed={isSubscribed}
						apiLimitCount={apiLimitCount}
						isLogged={isLogged}
					/>
				</aside>
				<div className="flex flex-col flex-1 ml-72 max-sm:ml-0">
					<nav className="w-auto h-16  flex  bg-transparent items-center justify-between px-6  fixed top-0 left-72 max-sm:left-0 right-0">
						<div className="flex items-center ">
							<div className="sm:hidden">
								<Sheet>
									<SheetTrigger>
										<MenuIcon className="w-6 h-6" />
									</SheetTrigger>
									<SheetTitle></SheetTitle>
									<SheetDescription></SheetDescription>
									<SheetContent
										side="left"
										className="bg-gray-900 border-none text-white 	 p-0 w-72"
									>
										<SideBar
											apiImageLimitCount={ImageLimitCount}
											isSubscribed={isSubscribed}
											apiLimitCount={apiLimitCount}
											isLogged={isLogged}
										/>
									</SheetContent>
								</Sheet>
							</div>
						</div>
						<LogOutMenu />
					</nav>
					<main className="flex-1 p-2 mt-16 ">{children}</main>
					<Footer></Footer>
				</div>
			</div>
		</>
	);
}
