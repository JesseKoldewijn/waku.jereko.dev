import { getContext } from "waku/server";

import { Theme } from "@/types/theme";

import { Link } from "./core/Link";
import DesktopNavigation from "./desktop-navigation";
import MobileNavigation from "./mobile-navigation";
import ThemeToggle from "./theme/themeToggle";

export const Header = () => {
  const ctx = getContext<{ theme: Theme }>();

  return (
    <header className="flex w-full items-center gap-4 p-6 lg:fixed lg:top-0 lg:left-0">
      <h2 className="text-lg font-bold tracking-tight">
        <Link to="/">Waku Jereko</Link>
      </h2>
      <nav
        aria-roledescription="desktop navigation"
        className="pointer-events-none hidden gap-4 lg:pointer-events-auto lg:flex"
      >
        <DesktopNavigation />
      </nav>

      <div className="ml-auto">
        <ThemeToggle initialTheme={ctx?.theme} />
      </div>

      <nav
        aria-roledescription="mobile navigation"
        className="pointer-events-auto gap-4 lg:pointer-events-none lg:hidden"
      >
        <MobileNavigation />
      </nav>
    </header>
  );
};
