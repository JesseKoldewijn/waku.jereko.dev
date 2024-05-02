"use client";

import { useState, useTransition } from "react";

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
			const url = window.location.href.includes("localhost")
				? remoteUrl
				: remoteUrl
				? new URL(remoteUrl).pathname
				: "/api/v1";
			try {
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
						"No message received, received data: " +
							JSON.stringify(data)
					);
				}
			} catch (error) {
				const err = error as Error;
				setError(err.message);
			}
		});
	};

	return (
		<div>
			<button onClick={handleSubmit} disabled={isPending}>
				Update
			</button>
			{message && <p>{message}</p>}
			{isPending && <p>Loading...</p>}
			{error && <p>{error}</p>}
		</div>
	);
};

export default ActionTransitionDemo;
