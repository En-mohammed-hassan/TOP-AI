import {
	CodeXml,
	Image,
	MessageCircleMoreIcon,
	Music,
	VideoIcon,
} from "lucide-react";

export const DashboardLinks = [
	{
		name: "Conversation",
		href: "/conversation",
		icon: MessageCircleMoreIcon,
		color: "text-purple-700",
		available: true,
	},
	{
		name: "Music Generation",
		href: "/music",
		icon: Music,
		color: "text-blue-700",
		available: false,
	},
	{
		name: "Vedio Generation",
		href: "/vedio",
		icon: VideoIcon,
		color: "text-red-700",
		available: false,
	},
	{
		name: "Image Generation",
		href: "/image",
		icon: Image,
		color: "text-green-700",
		available: true,
	},
	{
		name: "Code Generation",
		href: "/code",
		icon: CodeXml,
		color: "text-gray-700",
		available: true,
	},
];
