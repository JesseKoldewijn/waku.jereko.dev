"use client";

import { useQuery } from "react-query";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/utils/cn";

type ApiHref = `http://${string}` | `https://${string}`;
type ApiEndpointPath = `/api/utils/${string}` | `/api/v1/${string}`;
type ApiEndpoint = `${ApiHref}${ApiEndpointPath}`;

interface DataCardProps extends React.HTMLAttributes<HTMLDivElement> {
  endpoint: string;
  path: string;
}

const apiURL = (endpoint: string, base: string) => {
  if (!endpoint.startsWith("/")) {
    throw new Error("Endpoint must start with /");
  }

  if (!base.startsWith("http") && !base.startsWith("https")) {
    const proto = base.includes("localhost") ? "http://" : "https://";
    return `${proto}${base}${endpoint}` as ApiEndpoint;
  }

  return `${base}${endpoint}` as ApiEndpoint;
};

const DataCard = ({ endpoint, path, className, ...rest }: DataCardProps) => {
  const apiUri = apiURL(path, endpoint);

  const { isLoading, data } = useQuery(path, async () => {
    const response = await fetch(apiUri, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Cache-Control": "max-age=0, s-maxage=60, stale-while-revalidate",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });

  return (
    <div className={cn("w-xs", className)} {...rest}>
      <div className="h-max w-full max-w-xs">
        {isLoading ? (
          <Skeleton className="h-[208px] w-full rounded-lg" />
        ) : (
          <pre className="h-max w-full p-2">
            {JSON.stringify({ ...data }, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
};

export default DataCard;
