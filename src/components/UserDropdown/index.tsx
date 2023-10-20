"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { UserIcon, SettingsIcon, LogOutIcon } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  name: string;
  email: string;
  image: string;
}

export default function UserDropdown({ name, email, image }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer">
          <AvatarImage src={image} />
          <AvatarFallback>{name[0] ?? "U"}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My account</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Link
            href="/profile"
            className="flex items-center w-full justify-start"
          >
            <UserIcon className="mr-2 w-4 h-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href="/profile/manage"
            className="flex items-center w-full justify-start"
          >
            <SettingsIcon className="mr-2 w-4 h-4" />
            <span>Manage Your Account</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Button
            size="sm"
            variant="ghost"
            className="flex items-center w-full justify-start"
            onClick={() => signOut()}
          >
            <LogOutIcon color="red" className="mr-2 w-4 h-4" />
            <span>Log Out</span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
