import { Link } from "waku";

const AboutPage = async () => {
	const data = await getData();

	return (
		<div>
			<title>{data.title}</title>
			<h1 className="text-4xl font-bold tracking-tight">
				{data.headline}
			</h1>
			<Link to="/" className="mt-4 inline-block underline">
				Return home
			</Link>
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
