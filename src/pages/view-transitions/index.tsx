import { Link } from "@/components/core/Link";
import { Button } from "@/components/ui/button";

const Page = () => {
	return (
		<div className="demo-box flex flex-col gap-4 items-center">
			<h2 className="mx-auto font-semibold text-xl">View Transitions</h2>
			<div className="pb-1 text-center max-w-md text-balance flex flex-col gap-2">
				To use the View Transitions API, you need to intercent the
				<code className="px-2 py-1 bg-accent-foreground mx-auto">
					startViewTransition
				</code>
				on the document. Swap out the page content for the next page and
				you're done.
			</div>
			<Button asChild className="w-max">
				<Link to="/" className="block">
					Go back to home
				</Link>
			</Button>
		</div>
	);
};
export default Page;

export const getConfig = async () => {
	return {
		render: "static",
	};
};
