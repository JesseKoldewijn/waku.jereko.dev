import { Link } from "@/components/core/Link";

const Page = () => {
	return (
		<div className="demo-box flex flex-col gap-2">
			<h2>
				This is the{" "}
				<span className="[view-transition-name:title]">
					Some target
				</span>
			</h2>
			<p>OK you just saw the demo :)</p>
			<Link to="/" className="block">
				Open homepage →
			</Link>
			<Link
				to="/view-transitions/2"
				className="block [view-transition-name:link]"
			>
				Open Page 2 →
			</Link>
		</div>
	);
};
export default Page;

export const getConfig = async () => {
	return {
		render: "static",
	};
};
