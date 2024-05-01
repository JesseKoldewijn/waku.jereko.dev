import { getContext } from "waku/server";
import { Link } from "./core/Link";
import ThemeToggle from "./theme/themeToggle";
import { Theme } from "@/types/theme";

export const Header = () => {
	const ctx = getContext<{ theme: Theme }>();

	return (
		<header className="flex items-center w-full gap-4 p-6 lg:fixed lg:left-0 lg:top-0">
			<h2 className="text-lg font-bold tracking-tight">
				<Link to="/">Waku Jereko</Link>
			</h2>
			<nav className="flex gap-4">
				<Link to="/about">About</Link>
				<Link to="/actions">Actions</Link>
				<Link to="/view-transitions">View Transitions</Link>
			</nav>
			<div className="ml-auto">
				<ThemeToggle initialTheme={ctx?.theme} />
			</div>
		</header>
	);
};
