"use client";
import { Followinfo, UserData } from "@/lib/types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { TooltipProvider } from "./ui/tooltip";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAuth } from "@clerk/nextjs";
import Followercounter from "./followercounter";
import FollowerButton from "./FollowerButton";
import { useToast } from "./ui/use-toast";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { MapPin, Link as LinkIcon, Calendar } from "lucide-react";

interface UserTooltipProps {
  user: UserData;
  children: React.ReactNode;
}

const UserTooltip = ({ children, user }: UserTooltipProps) => {
  const { toast } = useToast();
  const { userId: loggedinuser } = useAuth();
  const followrstate: Followinfo = {
    followers: user._count.follower,
    isfollowedbyUser: !!user.follower.some(
      ({ followerid }) => followerid === loggedinuser
    ),
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side="right"
          align="start"
          className="w-96 shadow-lg animate-in fade-in-0 zoom-in-95"
        >
          <div className="bg-background/45 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-xl p-6 space-y-6 border">
            {/* Header Section */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <Avatar className="w-20 h-20 border-4 border-background shadow-xl transition-transform hover:scale-105">
                  <AvatarImage
                    src={user.avatarurl}
                    alt={user.displayname}
                    className="object-cover"
                  />
                  <AvatarFallback>
                    <Skeleton className="h-full w-full rounded-full" />
                  </AvatarFallback>
                </Avatar>
                <div className="mt-4">
                  <h3 className="font-bold text-xl tracking-tight">
                    {user.displayname}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    @{user.username}
                  </p>
                </div>
              </div>
              {loggedinuser !== user.id && (
                <div className="">
                  <FollowerButton
                    userid={user.id}
                    intialstate={followrstate}
                    className="mt-1"
                  />
                </div>
              )}
            </div>

            {user.bio && <p className="text-sm leading-relaxed">{user.bio}</p>}

            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              {user && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Joined {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>

            <div className="flex gap-6 text-sm border-t pt-4">
              <div className="flex flex-col">
                <span className="font-normal text-sm">
                  <Followercounter
                    initialState={followrstate}
                    userid={user.id}
                  />
                </span>
              </div>
              <div className="flex flex-row gap-x-1" >
                <span className="text-muted-foreground">Following</span>
                <span className="text-muted-foreground text-sm">
                  {followrstate.followers}
                </span>
              </div>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default UserTooltip;
