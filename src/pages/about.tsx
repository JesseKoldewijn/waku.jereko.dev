import { Link } from "@/components/core/Link";
import { Button } from "@/components/ui/button";

const AboutPage = async () => {
	const data = await getData();

	return (
		<div className="flex justify-center gap-3 flex-col">
			<title>{data.title}</title>
			<meta property="description" content={data.description} />
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
		description: "Learn more about Waku Jereko",
		headline: "About Waku Jereko",
	};

	return data;
};

export const getConfig = async () => {
	return {
		render: "static",
	};
};
