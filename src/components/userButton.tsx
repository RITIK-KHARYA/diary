"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { SignOutButton, UserButton, UserProfile } from "@clerk/nextjs";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useState } from "react";
import { LogOutIcon } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

export default function CustomButton({ user }: any) {
  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <Avatar>
            <AvatarImage
              src={user.avatarurl || "https://github.com/shadcn.png"}
            />
            <AvatarFallback>
              <Skeleton className="rounded-full h-24 w-24 "></Skeleton>
            </AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] mr-10">
          <SignOutButton signOutOptions={{ redirectUrl: "/" }}>
            <div className="w-full flex flex-row gap-x-1 items-center hover:bg-neutral-900/60 py-2 px-3 rounded-lg">
              <LogOutIcon
                size={20}
                className="text-red-900 group-hover:text-red-600"
              />
              <span className="text-sm text-neutral-400 group-hover:text-red-600">
                Logout
              </span>
            </div>
          </SignOutButton>
        </PopoverContent>
      </Popover>
    </div>
  );
}
