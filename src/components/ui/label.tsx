"use client";

import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/utils/cn";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);

const Label = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof LabelPrimitive.Root> &
  VariantProps<typeof labelVariants>) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
);
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
