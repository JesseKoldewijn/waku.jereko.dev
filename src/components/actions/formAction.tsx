"use client";

import { useActionState } from "react";

import { Button } from "../ui/button";

interface FormActionDemoProps {
  remoteUrl: string | undefined;
}

interface FormActionData {
  message: string;
  body: Record<string, unknown>;
}

const FormActionDemo = ({ remoteUrl }: FormActionDemoProps) => {
  const [data, submitAction, isPending] = useActionState<
    FormActionData,
    FormData
  >(
    async (previousState, formData) => {
      const formDataEntries = Array.from(formData.entries());
      const formDataObject = Object.fromEntries(formDataEntries);

      const res =
        remoteUrl &&
        (await fetch(remoteUrl, {
          method: "POST",
          body: JSON.stringify(formDataObject),
        }));

      if (!res || !res.ok) {
        return {
          message: "An error occurred",
          body: {},
        };
      }

      const data = await res.json();

      if (data?.message && data?.body) {
        return {
          message: data.message,
          body: JSON.parse(data.body),
        };
      }
      return {
        message: "No message received",
        body: {},
      };
    },
    null as unknown as FormActionData,
  );

  return (
    <form action={submitAction} className="flex flex-col gap-2">
      <input type="text" name="name" />
      <Button type="submit" disabled={isPending} size="sm">
        Update
      </Button>
      {data?.message && (
        <div className="flex flex-col gap-2">
          <span>{data.message}</span>
          <pre>{JSON.stringify(data.body)}</pre>
        </div>
      )}
    </form>
  );
};

export default FormActionDemo;
