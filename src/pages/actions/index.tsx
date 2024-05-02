import { getEnv } from "waku";

import ActionTransitionDemo from "@/components/actions/transition";
import { Link } from "@/components/core/Link";
import { Button } from "@/components/ui/button";

const Page = () => {
  const localUrl = getEnv("API_URL");
  const vercelUrl = getEnv("VERCEL_URL");
  const actualUrl = localUrl
    ? `http://${localUrl}`
    : vercelUrl
      ? vercelUrl?.includes("localhost")
        ? `http://${vercelUrl}`
        : `https://${vercelUrl}`
      : undefined;

  const remoteUrl = actualUrl ? `${actualUrl}/api/v1/` : undefined;
  return (
    <div className="demo-box flex flex-col gap-4 lg:items-center">
      <h2 className="text-xl font-semibold lg:mx-auto">View Transitions</h2>
      <section className="flex max-w-md flex-col gap-4 text-balance pb-1 lg:text-center">
        <ActionTransitionDemo remoteUrl={remoteUrl} />
      </section>
      <Button asChild className="mx-auto w-max">
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
