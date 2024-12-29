"use client";
import { Followinfo, UserData } from "@/lib/types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { TooltipProvider } from "./ui/tooltip";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useAuth } from "@clerk/nextjs";
import Followercounter from "./followercounter";
import FollowerButton from "./FollowerButton";

interface UserTooltipProps {
  user: UserData;
  children: React.ReactNode;
}

export default function ({ children, user }: UserTooltipProps) {
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
        <TooltipTrigger className="flex items-start">
          {" "}
          {children}
        </TooltipTrigger>
        <TooltipContent>
          <div className="break-words flex-col max-w-80 flex gap-3 md:min-w-52 px-1 py-2.5 bg-card rounded-xl">
            <div className="flex items-center justify-center">
              <Link href={`/user/${user.username}`}>
                <Avatar>
                  <AvatarImage
                    src={user.avatarurl || ""}
                    sizes="2xl"
                  ></AvatarImage>
                </Avatar>
              </Link>
            </div>
            <div>
              <Link href={`/user/${user.username}`}>
                <div className="font-semibold text-md hover:underline ">
                  {user.displayname}
                </div>
                <span className="text-muted-foreground text-sm">
                  @{user.username}
                </span>
              </Link>
              <div className="line-clamp-3 whitespace-pre=line">{user.bio}</div>
              <Followercounter initialState={followrstate} userid={user.id} />
            </div>
            {loggedinuser !== user.id && (
              <div className="w-full">
                <FollowerButton userid={user.id} intialstate={followrstate}  className="w-full"/>
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
