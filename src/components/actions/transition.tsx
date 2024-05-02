"use client";

import { useState, useTransition } from "react";

import { Button } from "../ui/button";

interface ActionTransitionDemoProps {
  remoteUrl: string | undefined;
}

const ActionTransitionDemo = ({ remoteUrl }: ActionTransitionDemoProps) => {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  if (!remoteUrl) return <p>Remote URL is not provided</p>;

  const handleSubmit = () => {
    startTransition(async () => {
      try {
        const url = new URL(remoteUrl);

        const response = await fetch(url, {
          method: "GET",
        });

        if (!response.ok) {
          setError(response.statusText);
          return;
        }

        const data = await response.json();
        if (data.message) {
          setMessage(data.message);
        } else {
          setMessage(
            "No message received, received data: " + JSON.stringify(data),
          );
        }
      } catch (error) {
        const err = error as Error;
        setError(err.message);
      }
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={handleSubmit} disabled={isPending}>
        Update
      </Button>
      {message && <p>{message}</p>}
      {isPending && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default ActionTransitionDemo;
