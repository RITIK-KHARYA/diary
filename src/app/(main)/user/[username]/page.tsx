// page.tsx
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { cache } from "react";
import { Followinfo, UserData, getUserDataSelect } from "@/lib/types";
import { currentUser } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { Loader, MapPin, Calendar, Link as LinkIcon } from "lucide-react";
import { formatDate } from "date-fns";
import Userpost from "./postuser";
import Followercounter from "@/components/followercounter";
import FollowerButton from "@/components/FollowerButton";
import { ScrollArea } from "@/components/ui/scroll-area";
import EditProfileButton from "./EditProfileButton";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PageProps {
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
}: PageProps): Promise<Metadata> {
  const loggedInUser = await currentUser();

  if (!loggedInUser) return {};

  const user = await getUser(username, loggedInUser.id);

  return {
    title: `${user.displayname} (@${user.username})`,
    description: user.bio || `Profile of ${user.displayname}`,
  };
}

interface UserProfileProps {
  user: UserData;
  loggedInUserId: string;
}

function UserProfile({ user, loggedInUserId }: UserProfileProps) {
  const followInfo: Followinfo = {
    followers: user._count.follower,
    isfollowedbyUser: user.follower.some(
      ({ followerid }) => followerid === loggedInUserId
    ),
  };

  return (
    <div className="w-full">
      <div className="relative">
        <div className="h-48 bg-black rounded-b-lg" />
        <div className="absolute -bottom-16 left-6">
          <Avatar className="border-4 border-background size-32 shadow-lg">
            <AvatarFallback className="bg-muted">
              <Loader className="w-8 h-8 animate-spin" />
            </AvatarFallback>
            <AvatarImage
              src={user.avatarurl || "https://github.com/shadcn.png"}
              className="object-cover"
            />
          </Avatar>
        </div>

        {/* Action Button */}
        <div className="absolute bottom-4 right-6">
          {user.id === loggedInUserId ? (
            <EditProfileButton user={user} />
          ) : (
            <FollowerButton
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full transition"
              intialstate={followInfo}
              userid={user.id}
            />
          )}
        </div>
      </div>

      {/* Profile Info */}
      <div className="mt-20 px-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-foreground">
              {user.displayname}
            </h1>
            {/* {user.verified && (
              <Badge variant="secondary" className="text-blue-500">
                Verified
              </Badge>
            )} */}
          </div>
          <p className="text-muted-foreground">@{user.username}</p>
        </div>

        {/* Bio */}
        {user.bio && (
          <p className="mt-4 text-sm text-foreground whitespace-pre-line break-words">
            {user.bio}
          </p>
        )}

        {/* User Stats */}
        <div className="mt-6 flex items-center space-x-6">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            Joined {formatDate(user.createdAt, "MMMM yyyy")}
          </div>
          <Separator orientation="vertical" className="h-4" />
          <div className="text-sm">
            <Followercounter userid={user.id} initialState={followInfo} />
          </div>
          <Separator orientation="vertical" className="h-4" />
          <div className="text-sm">
            <span className="font-semibold text-foreground">
              {user._count.posts}
            </span>
            <span className="text-muted-foreground ml-1">posts</span>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="posts" className="mt-6">
          <TabsList className="w-full justify-start border-b">
            <TabsTrigger
              value="posts"
              className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              Posts
            </TabsTrigger>
            <TabsTrigger
              value="media"
              className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              Media
            </TabsTrigger>
            <TabsTrigger
              value="likes"
              className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              Likes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-6">
            <Card>
              <CardContent className="p-0">
                <Userpost userid={user.id} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="media" className="mt-6">
            <Card>
              <CardContent className="py-8">
                <div className="text-center text-muted-foreground">
                  <div className="mb-2">No media available</div>
                  <p className="text-sm">
                    When {user.displayname} shares media, they'll appear here.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="likes" className="mt-6">
            <Card>
              <CardContent className="py-8">
                <div className="text-center text-muted-foreground">
                  <div className="mb-2">No liked posts yet</div>
                  <p className="text-sm">
                    Posts that {user.displayname} likes will appear here.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default async function Page({ params: { username } }: PageProps) {
  const loggedInUser = await currentUser();

  if (!loggedInUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="p-6">
          <p className="text-lg text-muted-foreground">
            Please log in to view this profile
          </p>
          {/* Add your login button/link here */}
        </Card>
      </div>
    );
  }

  const user = await getUser(username, loggedInUser.id);

  return (
    <main className="flex w-full h-screen flex-col bg-background">
      <div className="w-full flex flex-row border-x border-neutral-500/20">
        <ScrollArea className="h-[calc(100vh-100px)] w-full">
          <UserProfile user={user} loggedInUserId={loggedInUser.id} />
        </ScrollArea>
      </div>
    </main>
  );
}
