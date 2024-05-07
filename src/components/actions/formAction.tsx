"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface FormActionDemoProps {
  remoteUrl: string | undefined;
}

interface FormActionData {
  message: string;
  body: Record<string, unknown>;
}

const FormActionDemo = ({ remoteUrl }: FormActionDemoProps) => {
  const { pending } = useFormStatus();
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

      await new Promise((resolve) => setTimeout(resolve, 1000));

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
    <form action={submitAction} className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Label htmlFor="name" className="ml-0 w-full w-max cursor-pointer px-2">
          Name
        </Label>
        <Input
          type="text"
          id="name"
          name="name"
          placeholder="Type a message here..."
        />
      </div>
      <Button type="submit" disabled={isPending || pending} size="sm">
        Update
      </Button>
      {(isPending || pending) && <span>Submitting...</span>}
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
