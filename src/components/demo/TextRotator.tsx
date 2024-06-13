"use client";

import React, { useEffect, useRef } from "react";

import { cn } from "@/utils/cn";

import { rotationHandler } from "./_helper_rotator";

interface TextObject {
  text: string;
  className?: string;
  icon?: string;
}

interface TextRotatorProps extends React.HTMLAttributes<HTMLDivElement> {
  text: TextObject[];
  speed: number;
}

const defaultSpeed = 500;

const TextRotator = ({
  text,
  speed = defaultSpeed,
  className,
  ...rest
}: TextRotatorProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const elem = ref.current;

    const int = rotationHandler(elem, speed);

    return () => clearInterval(int);
  }, []);

  if (!text) return null;

  return (
    <div
      ref={ref}
      id="text-rotator"
      data-rotator-speed={speed}
      className={cn("flex flex-col", className)}
      {...rest}
    >
      {[...text].map((item, idx) => (
        <TextRenderer key={item.text + idx} item={item} />
      ))}
    </div>
  );
};

export default TextRotator;

const TextRenderer = ({ item }: { item: TextObject }) => {
  return (
    <span
      className={cn(
        "text-rotator-item font-bold tracking-tight",
        item.className,
      )}
    >
      {item.text}
    </span>
  );
};
