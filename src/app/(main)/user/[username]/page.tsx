import { notFound, useParams } from "next/navigation";
import prisma from "@/lib/prisma";
import { cache } from "react";
import { Followinfo, UserData, getUserDataSelect } from "@/lib/types";
import { currentUser } from "@clerk/nextjs/server";
import { Metadata } from "next";
import Trendsidebar from "@/components/Trendsidebar";
import { Loader2Icon } from "lucide-react";
import { formatDate } from "date-fns";
import Userpost from "./postuser";
import Followercounter from "@/components/followercounter";
import FollowerButton from "@/components/FollowerButton";
import { ScrollArea } from "@/components/ui/scroll-area";
import EditProfileButton from "./EditProfileButton";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface pageprops {
  params: { username: string };
}

const getUser = cache(async (username: string, loggedInUserId: string) => {
  const user = await prisma.user.findFirst({
    where: {
      username: {
        equals: username,
        mode: "insensitive",
      },
    },
    select: getUserDataSelect(loggedInUserId),
  });
  if (!user) notFound();
  return user;
});

export async function generateMetadata({
  params: { username },
}: pageprops): Promise<Metadata> {
  const loggedInUser = await currentUser();

  if (!loggedInUser) return {};

  const user = await getUser(username, loggedInUser.id);

  return {
    title: `${user.displayname} (@${user.username})`,
  };
}

export default async function Page({ params: { username } }: pageprops) {
  const loggedInUser = await currentUser();

  if (!loggedInUser) {
    return <p>You are not logged in</p>;
  }
  const user = await getUser(username, loggedInUser.id);
  return (
    <main className="flex  w-full  flex-col  ">
      <div className="w-full h-full flex flex-row space-x-2 ">
        <div className="w-full h-full flex flex-col justify-between  space-x-5 border  ">
          <ScrollArea className=" h-[calc(100vh-10px)] w-full px-6  flex flex-col  border">
            <Userprofile user={user} logginUserId={loggedInUser.id} />
            <Separator />
            <div className=" shadow-sm flex flex-col justify-center items-center w-full h-full">
              <h2 className="text-center text-2xl font-bold m-5">
                {user.displayname} ' posts
              </h2>

              <Userpost userid={user.id} />
            </div>
          </ScrollArea>
        </div>
        <div className=" flex justify-center  h-full w-[500px]">
          <Trendsidebar />
        </div>
      </div>
    </main>
  );
}

interface Userprofileprops {
  user: UserData;
  logginUserId: string;
}

async function Userprofile({ user, logginUserId }: Userprofileprops) {
  const followinfo: Followinfo = {
    followers: user._count.follower,
    isfollowedbyUser: user.follower.some(
      ({ followerid }) => followerid === logginUserId
    ),
  };
  return (
    <div className="h-fit w-full p-5 bg-card space-y-5 shadow-sm mt-8 ">
      <Avatar className="mx-auto rounded-full max-h-60 size-full max-w-60">
        <AvatarFallback className="rounded-full flex items-center justify-center m-2 w-56 h-56">
          <Loader2Icon className="w-10 h-10 animate-spin" />
        </AvatarFallback>
        <AvatarImage
          src={user.avatarurl || "https://github.com/shadcn.png"}
          sizes="2xl"
        />
      </Avatar>
      <div className="flex gap-3 sm:flex-nowrap bg-card shadow-sm ">
        <div className="me-auto space-y-3">
          <div>
            <h1 className="text-align font-semibold text-foreground text-2xl">
              {user.displayname}
            </h1>
            <p className="text-muted-foreground text-sm ">@{user.username}</p>
          </div>
          <div className="flex gap-y-2 flex-col">
            <p className="text-muted-foreground text-sm">
              {" "}
              Member since {formatDate(user.createdAt, "MMM d, yyyy")}
            </p>
            <div className="flex gap-2 flex-row space-x-2 text-sm ">
              <div className="text-foreground text-sm ">
                {" "}
                <Followercounter userid={user.id} initialState={followinfo} />
              </div>
              <span>
                posts:{""}{" "}
                <span className="semi-bold">{user._count.posts}</span>
              </span>
            </div>
          </div>
        </div>
        {user.id === logginUserId ? (
          <EditProfileButton user={user} />
        ) : (
          <FollowerButton
            intialstate={followinfo}
            userid={user.id}
          ></FollowerButton>
        )}
      </div>
      {user.bio && (
        <p className="overflow-hidden whitespace-pre-line break-words text-align text-sm">
          {user.bio}
        </p>
      )}
    </div>
  );
}
