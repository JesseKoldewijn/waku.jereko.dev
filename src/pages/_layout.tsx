import { type ReactNode, isValidElement } from "react";

import { getContext } from "waku/server";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ViewTransitions } from "@/providers/ViewTransitions";
import { serverGetHostUrl } from "@/server/utils/context";
import "@/styles/tailwind.css";
import { Theme } from "@/types/theme";
import { cn } from "@/utils/cn";

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
          "bg-background text-foreground inset-0 h-full min-h-screen w-full font-sans ",
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
