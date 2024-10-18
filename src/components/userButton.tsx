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

export default function CustomButton({ user }: any) {
  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <Avatar>
            <AvatarImage
              src={user.avatarurl || "https://github.com/shadcn.png"}
            />
            <AvatarFallback>R</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent>
          <SignOutButton>
            <div className="w-full flex flex-row gap-x-1 items-center hover:bg-neutral-900/60 py-2 px-3 rounded-md group cursor-pointer">
              <LogOutIcon
                size={20}
                className="text-neutral-400 group-hover:text-neutral-200"
              />
              <span className="text-neutral-400 group-hover:text-neutral-200">
                Logout
              </span>
            </div>
          </SignOutButton>
        </PopoverContent>
      </Popover>
    </div>
  );
}
