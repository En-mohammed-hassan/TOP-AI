import { Home, Info, LayoutDashboard, Settings } from "lucide-react";

export const DashboardNavLinks = [
	{
		name: "Home",
		href: "/",
		icon: Home,
		color: "text-blue-700",
	},
	{
		name: "Dashboard",
		href: "/dashboard",
		icon: LayoutDashboard,
		color: "text-purple-700",
	},
	{
		name: "Settings",
		href: "/settings",
		icon: Settings,
		color: "text-gray-700",
	},

	{
		name: "About",
		href: "/about",
		icon: Info,
		color: "text-red-700",
	},
];
