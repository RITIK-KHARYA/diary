import prisma from "@/lib/prisma";

import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";

export default async function Trendsidebar() {
  return (
    <div className="sticky top-[5.56rem] hidden h-fit flex-none md:block space-y-5 lg:w-80 rounded-lg border-2 border-neutral-500 bg-card p-5 mx-10 bg-neutral-900">
      <div className="text-start font-bold text-white ">Who To Follow</div>
      <Whotofollow />
    </div>
  );
  async function trendingtopic() {
    const trendingpost = await prisma.post.findMany({});
  }

  async function Whotofollow() {
    const user = await currentUser();

    if (!user) {
      return (
        <div className="text-center flex items-center justify-center">
          There are no available users
        </div>
      );
    }

    const usersToFollow = await prisma.user.findMany({
      where: {
        id: {
          not: user.id,
        },
      },
      select: {
        id: true,
        username: true,
        displayname: true,
        avatarurl: true,
      },
      take: 5, // Limit to 5 users
    });
    return (
      <div className="">
        {usersToFollow.map((user) => (
          <div
            key={user.id}
            className="text-white text-sm flex gap-x-3 items-center"
          >
            <Link href={`/user/${user.username}`} className="cursor-pointer">
              <div className=" flex justify-start items-start rounded-full">
                <Avatar>
                  <AvatarImage
                    src={user.avatarurl || "https://github.com/shadcn.png"}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </Link>
            <Link
              href={`/user/${user.username}`}
              className="cursor-pointer hover:underline"
            >
              {user.displayname}
            </Link>
            <div className="flex w-[150px] justify-end items-center">
              <Button className=" flex justify-between items-center text-white bg-blue-600 ">
                Follow
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
