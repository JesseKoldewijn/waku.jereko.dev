import { Suspense, lazy } from "react";

import { unstable_getCustomContext } from "waku/server";

import { Theme } from "@/types/theme";

import { Link } from "./core/Link";
import ThemeToggle from "./theme/themeToggle";

const MobileNavigation = lazy(() =>
  import("./mobile-navigation").then((mod) => ({ default: mod.default })),
);
const DesktopNavigation = lazy(() =>
  import("./desktop-navigation").then((mod) => ({ default: mod.default })),
);

export const Header = () => {
  const ctx = unstable_getCustomContext<{ theme: Theme }>();

  return (
    <header className="flex w-full items-center gap-4 p-6 lg:fixed lg:top-0 lg:left-0">
      <h2 className="text-lg font-bold tracking-tight">
        <Link to="/">Waku Jereko</Link>
      </h2>

      <Suspense fallback={null}>
        <nav
          aria-roledescription="desktop navigation"
          className="pointer-events-none hidden gap-4 sm:pointer-events-auto sm:flex"
        >
          <DesktopNavigation />
        </nav>
      </Suspense>

      <div className="ml-auto">
        <ThemeToggle initialTheme={ctx?.theme} />
      </div>

      <Suspense fallback={null}>
        <nav
          aria-roledescription="mobile navigation"
          className="pointer-events-auto gap-4 sm:pointer-events-none sm:hidden"
        >
          <MobileNavigation />
        </nav>
      </Suspense>
    </header>
  );
};
