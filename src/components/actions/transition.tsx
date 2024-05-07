"use client";

import { useState, useTransition } from "react";

import { cn } from "@/utils/cn";

import { Button } from "../ui/button";

interface ActionTransitionDemoProps {
  remoteUrl: string | undefined;
}

const ActionTransitionDemo = ({ remoteUrl }: ActionTransitionDemoProps) => {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [timeoutEnabled, setTimeoutEnabled] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  if (!remoteUrl) return <p>Remote URL is not provided</p>;

  const handleSubmit = () => {
    startTransition(async () => {
      try {
        setTimeoutEnabled(true);

        const response = await fetch(remoteUrl, {
          method: "GET",
        });

        if (!response.ok) {
          setError(response.statusText);
          return;
        }

        const data = await response.json();
        if (data.message) {
          setMessage(data.message);
        } else if (data.timestamp) {
          setMessage("TS: " + new Date(data.timestamp).toString());
        } else {
          setMessage(
            "No message received, received data: " + JSON.stringify(data),
          );
        }

        setTimeout(() => {
          setTimeoutEnabled(false);
        }, 5000);
      } catch (error) {
        const err = error as Error;
        setError(err.message);
        setTimeout(() => {
          setTimeoutEnabled(false);
        }, 2000);
      }
    });
  };

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <Button
        onClick={handleSubmit}
        disabled={isPending || timeoutEnabled}
        className={cn(
          "max-w-max",
          timeoutEnabled && "!animate-pulse ease-linear",
        )}
        size="sm"
      >
        Update
      </Button>
      <p className="text-balance text-center">
        {message ?? "waiting for request..."}
      </p>
      {isPending && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default ActionTransitionDemo;
