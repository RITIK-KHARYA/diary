import FollowerButton from "@/components/FollowerButton";
import UserTooltip from "@/components/UserTooltip";
import Followercounter from "@/components/followercounter";
import Post from "@/components/posts/Post";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import prisma from "@/lib/prisma";
import { UserData, getPostDataInclude, getUserDataSelect } from "@/lib/types";
import { useAuth } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { getDisplayName } from "next/dist/shared/lib/utils";
import { notFound } from "next/navigation";
import { title } from "process";
import { Suspense, cache } from "react";

interface pageprops {
  params: { postid: string };
}
const getPost = cache(async (postid: string, loggedinuser: string) => {
  const post = await prisma.post.findUnique({
    where: {
      id: postid,
    },
    include: getPostDataInclude(loggedinuser),
  });
  if (!post) notFound();
  console.log(post);
  return post;
});
export async function generateMetadara({ params: { postid } }: pageprops) {
  const user = await currentUser();
  if (!user) return {};
  const post = await getPost(postid, user.id);
  if (!post) notFound();
  return {
    title: `${post.user.displayname}: ${post.content.slice(0, 50)}...`,
  };
}

export default async function Page({ params: { postid } }: pageprops) {
  const user = await currentUser();

  if (!user)
    return (
      <p className="text-center text-destructive text-lg ">
        You are not logged in
      </p>
    );
  const post = await getPost(postid, user.id);
  return (
    <main className="flex w-full min-w-0 gap-8 justify-center py-8 ">
      <div className="px-16">
        <Post post={post} />
      </div>
      <div className="hidden top-[5.5rem] sticky h-fit w-80 flex-none lg:block ">
        <Userinfosidebar user={post.user} />
      </div>
    </main>
  );
}

interface Userinfosidebarprops {
  user: UserData;
}
async function Userinfosidebar({ user }: Userinfosidebarprops) {
  const people = await currentUser();
  if (!people) return null;
  return (
    <div className=" p-3  shadow-sm rounded-xl  bg-neutral-900/90">
      <div className="text-lg flex flex-row items-center justify-center font-bold underline underline-offset-4 ">
        {" "}
        About this user{" "}
      </div>
      <UserTooltip user={user}>
        <Link href={`/user/${user.id}`} className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={user.avatarurl || ""} className="flex-none" />
          </Avatar>
          <div>
            <p className="text-sm line-clamp break-all font-semibold hover:underline mt-4 ">
              {user.displayname}
            </p>

            <p className=" hover:underline line-clamp-1 text-muted-foreground text-xs">
              @{user.username}
            </p>
          </div>
        </Link>
      </UserTooltip>
      <div className="flex mt-2">
        <p className="line-clamp-6 break-words text-muted-foreground whitespace-pre-line ">
          {user.bio}
        </p>
      </div>
      {user.id !== people.id && (
        <FollowerButton
          userid={user.id}
          intialstate={{
            followers: user._count.follower,
            isfollowedbyUser: user.follower.some(
              ({ followerid }) => followerid === people.id //followerid will be the id of the current logged in user
            ),
          }}
        />
      )}
    </div>
  );
}