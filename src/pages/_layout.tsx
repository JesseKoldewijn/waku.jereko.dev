import "@/styles/tailwind.css";

import { isValidElement, type ReactNode } from "react";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { serverGetHostUrl } from "@/server/utils/context";
import { getContext } from "waku/server";
import { cn } from "@/utils/cn";
import { ViewTransitions } from "@/providers/ViewTransitions";
import { Theme } from "@/types/theme";

interface RootLayoutProps {
	children: ReactNode;
}

const RootLayout = async ({ children }: RootLayoutProps) => {
	const data = await getData();
	const ctx = getContext<{ theme: Theme }>();

	const childrenIncludesDescription = Array(children).some((child) => {
		if (isValidElement(child)) {
			const childProps = child.props as Record<string, unknown>;
			return (
				child.type === "meta" &&
				childProps?.property &&
				childProps?.property === "description"
			);
		}
		return false;
	});

	const childrenIncludesTitle = Array(children).some((child) => {
		if (isValidElement(child)) {
			const childProps = child.props as Record<string, unknown>;
			return child.type === "title" && childProps?.children;
		}
		return false;
	});

	return (
		<ViewTransitions>
			<main
				data-app-root
				className={cn(
					ctx.theme === "dark" ? "dark" : "",
					"inset-0 w-full min-h-screen h-full font-sans bg-background text-foreground "
				)}
			>
				<link rel="icon" type="image/png" href={data.icon} />
				{!childrenIncludesTitle && <title>Waku Jereko</title>}
				{!childrenIncludesDescription && (
					<meta name="description" content={data.description} />
				)}
				<Header />
				<main className="m-6 flex items-center lg:m-0 lg:min-h-svh lg:justify-center">
					{children}
				</main>
				<Footer />
			</main>
		</ViewTransitions>
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
