import ActionTransitionDemo from "@/components/actions/transition";
import { Link } from "@/components/core/Link";
import { Button } from "@/components/ui/button";
import { getEnv } from "waku";

const Page = () => {
	const localUrl = getEnv("API_URL");
	const vercelUrl = getEnv("VERCEL_URL");
	const actualUrl =
		localUrl ?? vercelUrl
			? vercelUrl?.includes("localhost")
				? `http://${vercelUrl}`
				: `https://${vercelUrl}`
			: undefined;

	const remoteUrl = actualUrl ? `${actualUrl}/v1/` : undefined;
	return (
		<div className="demo-box flex flex-col gap-4 lg:items-center">
			<h2 className="lg:mx-auto font-semibold text-xl">
				View Transitions
			</h2>
			<section className="pb-1 lg:text-center max-w-md text-balance flex flex-col gap-4">
				<ActionTransitionDemo remoteUrl={remoteUrl} />
			</section>
			<Button asChild className="w-max mx-auto">
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
