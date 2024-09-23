import { notFound, useParams } from "next/navigation";
import prisma from "@/lib/prisma";
import { cache } from "react";
import { Followinfo, UserData, getUserDataSelect } from "@/lib/types";
import { error } from "console";
import { toast } from "@/components/ui/use-toast";
import { currentUser } from "@clerk/nextjs/server";
import { promise } from "zod";
import { Metadata } from "next";
import useFollowerinfo from "@/hooks/useFollowerinfo";
import Trendsidebar from "@/components/Trendsidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";
import { formatDate, formatDistanceToNow } from "date-fns";
import Userpost from "./postuser";
import Followercounter from "@/components/followercounter";
import { Button } from "@/components/ui/button";
import FollowerButton from "@/components/FollowerButton";
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
    <main className="flex w-full min-w-0 gap-5 flex-col">
      <div className="w-full space-y-5 min-w-0 ">
        <Userprofile user={user} logginUserId={loggedInUser.id} />
      </div>
      <div className="rounded-2xl bg-card p-5  shadow-sm">
        <h2 className="text-center text-2xl font-bold">
          {user.displayname} posts
        </h2>
      </div>
      <Userpost userid={user.id} />
      <div>
        <Trendsidebar />
      </div>
    </main>
  );
}

interface Userprofileprops {
  user: UserData;
  logginUserId: string;
}

export async function Userprofile({ user, logginUserId }: Userprofileprops) {
  const followinfo: Followinfo = {
    followers: user._count.follower,
    isfollowedbyUser: user.follower.some(
      ({ followerid }) => followerid === logginUserId
    ),
  };
  return (
    <div className="h-fit w-full p-5 rounded-2xl bg-card space-y-5 shadow-sm mt-16 border ">
      <Avatar className="mx-auto rounded-full max-h-60 size-full max-w-60">
        <AvatarImage
          src={user.avatarurl || "https://github.com/shadcn.png"}
          sizes="2xl"
        />
        <AvatarFallback>cn</AvatarFallback>
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
          <Button>Edit Profile</Button>
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
