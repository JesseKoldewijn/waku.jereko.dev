import { Link } from "waku";

const HomePage = async () => {
	const data = await getData();

	return (
		<div>
			<title>{data.title}</title>
			<h1 className="text-4xl font-bold tracking-tight">
				{data.headline}
			</h1>
			<Link to="/about" className="mt-4 inline-block underline">
				About page
			</Link>
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
