import prisma from "@/lib/prisma";

import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import FollowerButton from "./FollowerButton";
import { getUserDataSelect } from "@/lib/types";
import UserTooltip from "./UserTooltip";
import { Loader2 } from "lucide-react";
const fecthUsers = async () => {};
export default async function Trendsidebar() {
  return (
    <div className="sticky top-[5.56rem] h-fit flex-none md:block space-y-5 lg:w-80 rounded-lg border-2 border-neutral-500 bg-card p-3 right-5 bg-neutral-900">
      <div className="text-start font-bold text-white ">Who To Follow</div>
      <Whotofollow />
    </div>
  );
  async function trendingtopic() {
    const trendingpost = await prisma.post.findMany({});
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

    if (!usersToFollow) {
      return (
        <div className="text-center flex items-center justify-center">
          There are no available users
        </div>
      );
    }

    return (
      <div className="">
        {usersToFollow.map((user) => (
          <div
            key={user.id}
            className="text-white text-sm flex gap-x-3 items-center   "
          >
            <UserTooltip user={user}>
              <Link href={`/user/${user.username}`} className="cursor-pointer">
                <div className=" flex justify-start items-start rounded-full ">
                  <Avatar>
                    <AvatarImage
                      src={user.avatarurl || "https://github.com/shadcn.png"}
                    />
                    <AvatarFallback>
                      <Loader2 className="animate-spin h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </div>
              </Link>
            </UserTooltip>
            <Link
              href={`/user/${user.username}`}
              className="cursor-pointer hover:underline w-full "
            >
              {user.displayname}
            </Link>
            <div className="flex w-[150px] justify-end items-center mt-3">
              <FollowerButton
                userid={user.id}
                intialstate={{
                  followers: user._count.follower,
                  isfollowedbyUser: !!user.follower.length,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }
}
