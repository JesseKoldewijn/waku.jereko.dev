import { Link } from "./core/Link";

export const Header = () => {
	return (
		<header className="flex items-center gap-4 p-6 lg:fixed lg:left-0 lg:top-0">
			<h2 className="text-lg font-bold tracking-tight">
				<Link to="/">Waku Jereko</Link>
			</h2>
			<nav className="flex gap-4 ml-auto">
				<Link to="/about">About</Link>
				<Link to="/view-transitions">View Transitions</Link>
			</nav>
		</header>
	);
};
