import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import TypeEffect from "@/components/TypeEffect";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import Footer from "@/components/Footer";

export default async function Home() {
	const { isAuthenticated } = getKindeServerSession();
	const isLogged = await isAuthenticated();
	return (
		<>
			<div className=" bg-zinc-800 h-screen text-white  overflow-hidden ">
				<nav className="flex justify-between p-4 ">
					<Link href="/">
						<div className="flex justify-center  item-center cursor-pointer hover:opacity-60 transition-all hover:scale-110 duration-700 ">
							<Image
								src="/images/logo.jpg"
								width={40}
								height={40}
								alt="logo"
								className="rounded-full mx-3"
							></Image>
							<p className="text-white my-auto font-bold text-2xl">TOP - AI</p>
						</div>
					</Link>
					<div className="">
						{isLogged ? (
							<Link href={"/dashboard"}>
								<Button variant="secondary" className="text-xl  rounded-full">
									Get Started
								</Button>
							</Link>
						) : (
							<Button variant="secondary" className="text-xl  rounded-full">
								<RegisterLink> Get Started</RegisterLink>
							</Button>
						)}
					</div>
				</nav>
				<div>
					<h1 className="mx-auto  text-center  text-4xl font-bold">
						The Best AI Tool For You
					</h1>
					<div className="flex justify-center m-4 text-4xl font-semibold ">
						<TypeEffect></TypeEffect>
					</div>

					<div className="flex justify-center my-4">
						{isLogged ? (
							<Link href={"/dashboard"}>
								<Button variant="Pro" className="text-xl  rounded-full ">
									Start Generating For Free
								</Button>
							</Link>
						) : (
							<Button asChild variant="Pro" className="text-xl  rounded-full ">
								<RegisterLink> Start Generating For Free</RegisterLink>
							</Button>
						)}
					</div>

					{/* <h1 className="text-center mt-4 text-m ">No credit Card required</h1> */}
				</div>
				<TestimonialCarousel></TestimonialCarousel>
			</div>
			<Footer></Footer>
		</>
	);
}
