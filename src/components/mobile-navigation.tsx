import { MenuIcon } from "lucide-react";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const MobileNavigation = () => {
  return (
    <DropdownMenu>
      <Button size="sm" asChild>
        <DropdownMenuTrigger suppressHydrationWarning>
          <MenuIcon size={20} />
        </DropdownMenuTrigger>
      </Button>
      <DropdownMenuContent className="text-foreground flex h-screen w-screen flex-col items-center gap-2 border-none bg-none px-4">
        <DropdownMenuLabel className="text-lg font-semibold">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="my-2 h-12 w-full rounded-md border">
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="my-2 h-12 w-full rounded-md border">
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem className="my-2 h-12 w-full rounded-md border">
          Team
        </DropdownMenuItem>
        <DropdownMenuItem className="my-2 h-12 w-full rounded-md border">
          Subscription
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileNavigation;
