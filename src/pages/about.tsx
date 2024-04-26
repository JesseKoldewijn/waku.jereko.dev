import { Button } from "@/components/ui/button";
import { Link } from "waku";

const AboutPage = async () => {
	const data = await getData();

	return (
		<div className="flex justify-center gap-3 flex-col">
			<title>{data.title}</title>
			<h1 className="text-4xl font-bold tracking-tight">
				{data.headline}
			</h1>
			<Button asChild className="w-max">
				<Link to="/">Return home</Link>
			</Button>
		</div>
	);
};
export default AboutPage;

const getData = async () => {
	const data = {
		title: "About | Waku Jereko",
		headline: "About Waku Jereko",
	};

	return data;
};

export const getConfig = async () => {
	return {
		render: "static",
	};
};
