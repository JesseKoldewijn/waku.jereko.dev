import { Button } from "@/components/ui/button";
import { Link } from "waku";

const HomePage = async () => {
	const data = await getData();

	return (
		<div className="flex justify-center gap-3 flex-col">
			<title>{data.title}</title>
			<h1 className="text-4xl font-bold tracking-tight">
				{data.headline}
			</h1>
			<Button asChild className="w-max">
				<Link to="/about">About</Link>
			</Button>
		</div>
	);
};
export default HomePage;

const getData = async () => {
	const data = {
		title: "Waku Jereko",
		headline: "Waku Jereko",
	};

	return data;
};

export const getConfig = async () => {
	return {
		render: "static",
	};
};
