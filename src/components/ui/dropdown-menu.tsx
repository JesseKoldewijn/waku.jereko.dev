"use client";

import { Check, ChevronRight, Circle } from "lucide-react";
import * as React from "react";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

import { cn } from "@/utils/cn";

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = ({
  className,
  inset,
  children,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean;
}) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "focus:bg-accent data-[state=open]:bg-accent flex cursor-default items-center rounded-sm py-1.5 px-2 text-sm outline-none select-none",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </DropdownMenuPrimitive.SubTrigger>
);
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.SubContent>) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-lg",
      className,
    )}
    {...props}
  />
);
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = ({
  className,
  sideOffset = 4,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.Content>) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md",
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
);
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = ({
  className,
  inset,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
}) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center rounded-sm py-1.5 px-2 text-sm outline-none transition-colors select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
);
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = ({
  className,
  children,
  checked,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.CheckboxItem>) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none transition-colors select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    checked={checked as boolean}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
);
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = ({
  className,
  children,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.RadioItem>) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none transition-colors select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
);
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = ({
  className,
  inset,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean;
}) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "py-1.5 px-2 text-sm font-semibold",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
);
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.Separator>) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("bg-muted -mx-1 my-1 h-px", className)}
    {...props}
  />
);
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};