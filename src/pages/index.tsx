import { getEnv } from "waku/server";

import { Link } from "@/components/core/Link";
import DataCard from "@/components/data-display/DataCard";
import TextRotator from "@/components/demo/TextRotator";
import { Button } from "@/components/ui/button";

const HomePage = async () => {
  const data = await getData();

  const endpointHref = getEnv("API_URL");

  const txt = [
    { text: "Text One" },
    { text: "Text Two" },
    { text: "Text Three" },
    { text: "Text Four" },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <title>{data.title}</title>
      <meta name="description" content={data.description} />
      <h1 className="text-4xl font-bold tracking-tight">{data.headline}</h1>
      {endpointHref && (
        <div className="flex items-center justify-center">
          <DataCard endpoint={endpointHref} path="/api/utils/ip" />
        </div>
      )}
      <TextRotator text={txt} speed={2000} />
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
    description: "Waku Jereko | A very experimental project",
    headline: "Waku Jereko",
  };

  return data;
};

export const getConfig = async () => {
  return {
    render: "static",
  };
};
