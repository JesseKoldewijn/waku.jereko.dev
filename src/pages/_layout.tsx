import "@/styles/tailwind.css";

import type { ReactNode } from "react";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { serverGetHostUrl } from "@/server/utils/context";
import { getContext } from "waku/server";
import { Theme } from "@/middleware/cookie";
import { cn } from "@/utils/cn";

interface RootLayoutProps {
	children: ReactNode;
}

const RootLayout = async ({ children }: RootLayoutProps) => {
	const data = await getData();
	const ctx = getContext<{ theme: Theme }>();

	return (
		<div
			className={cn(
				ctx.theme === "dark" ? "dark" : "",
				"inset-0 w-full min-h-screen h-full font-sans bg-background text-foreground "
			)}
		>
			<meta property="description" content={data.description} />
			<link rel="icon" type="image/png" href={data.icon} />
			<Header />
			<main className="m-6 flex items-center lg:m-0 lg:min-h-svh lg:justify-center">
				{children}
			</main>
			<Footer />
		</div>
	);
};
export default RootLayout;

const getData = async () => {
	const uri = serverGetHostUrl();

	const data = {
		url: uri,
		description: "A very experimental React.js RSC Stack!",
		icon: "/images/favicon.png",
	};

	return data;
};

export const getConfig = async () => {
	return {
		render: "dynamic",
	};
};
