import { getEnv } from "waku";

import FormActionDemo from "@/components/actions/formAction";
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

  const remoteUrlTs = actualUrl ? `${actualUrl}/api/v1/timestamp` : undefined;
  const remoteUrlEcho = actualUrl ? `${actualUrl}/api/v1/echo` : undefined;

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="flex w-full flex-col items-center gap-4">
        <h2 className="mx-auto text-xl font-semibold">Action Transition</h2>
        <section className="flex max-w-md flex-col gap-4 text-balance pb-1 text-center">
          <ActionTransitionDemo remoteUrl={remoteUrlTs} />
        </section>
      </div>
      <div className="flex w-full flex-col items-center gap-4">
        <h2 className="mx-auto text-xl font-semibold">Action Transition</h2>
        <section className="flex max-w-md flex-col gap-4 text-balance pb-1 text-center">
          <FormActionDemo remoteUrl={remoteUrlEcho} />
        </section>
      </div>

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
