import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import FollowerButton from "./FollowerButton";
import { getUserDataSelect } from "@/lib/types";
import UserTooltip from "./UserTooltip";
import { Loader, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

export default async function Trendsidebar() {
  return (
    <Card className="sticky top-[5.56rem] h-fit w-[350px] bg-neutral-900 border border-neutral-800 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <Users className="h-4 w-4" />
          Who to follow
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 p-3">
        <ScrollArea className="h-[300px] pr-4">
          <Whotofollow />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

async function Whotofollow() {
  const user = await currentUser();

  if (!user) return null;

  const usersToFollow = await prisma.user.findMany({
    where: {
      NOT: {
        id: user.id,
      },
      follower: {
        none: {
          followerid: user.id,
        },
      },
    },
    select: getUserDataSelect(user.id),
    take: 5,
  });

  if (!usersToFollow?.length) {
    return (
      <div className="flex h-[100px] items-center justify-center text-sm text-muted-foreground">
        No suggestions available
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {usersToFollow.map((user) => (
        <div
          key={user.id}
          className="group flex items-center justify-between gap-2 rounded-md p-1.5 transition-colors hover:bg-muted/50"
        >
          <div className="flex flex-1 items-center gap-2 overflow-hidden">
            <UserTooltip user={user}>
              <Link href={`/user/${user.username}`} className="shrink-0">
                <Avatar className="h-8 w-8 border shadow">
                  <AvatarImage
                    src={user.avatarurl || "https://github.com/shadcn.png"}
                  />
                  <AvatarFallback className="flex items-center justify-center">
                    <Loader className="h-3 w-3 animate-spin" />
                  </AvatarFallback>
                </Avatar>
              </Link>
            </UserTooltip>
            <div className="grid gap-0.5 overflow-hidden">
              <Link
                href={`/user/${user.username}`}
                className="truncate text-sm font-medium hover:underline"
              >
                {user.displayname}
              </Link>
              <span className="truncate text-xs text-muted-foreground">
                @{user.username}
              </span>
            </div>
          </div>
          <FollowerButton
            className="h-7 w-20 text-xs"
            userid={user.id}
            intialstate={{
              followers: user._count.follower,
              isfollowedbyUser: !!user.follower.length,
            }}
          />
        </div>
      ))}
    </div>
  );
}
