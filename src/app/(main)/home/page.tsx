import { createUserToDb } from "@/actions/createUserToDb";
import PostEditor from "@/components/posts/editor/PostEditor";
import Trendsidebar from "@/components/Trendsidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";
import ForYoufeed from "../ForYoufeed";
import Followingfeed from "../Followingfeed";

export default async function Home() {
  try {
    const user = await createUserToDb();

    if (!user) {
      throw new Error("User not found");
    }

    return (
      <main className="w-screen grid grid-cols-1">
        <div className="flex flex-row justify-center space-x-6">
          {/* Left Section: Posts & Feeds */}
          <ScrollArea className="h-[calc(100vh-100px)] w-full max-w-2xl px-4 border-x border-gray-300">
            <div className="flex flex-col shadow-sm space-y-4">
              {/* Post Editor */}
              <PostEditor
                avatar={user?.avatarurl || "https://github.com/shadcn.png"}
              />

              {/* Tabs: For You and Following */}
              <Tabs defaultValue="for-you">
                <TabsList className="mb-4">
                  <TabsTrigger value="for-you">For You</TabsTrigger>
                  <TabsTrigger value="following">Following</TabsTrigger>
                </TabsList>
                <TabsContent value="for-you">
                  <ForYoufeed />
                </TabsContent>
                <TabsContent value="following">
                  <Followingfeed />
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>
          <div className="w-[25%]">
            <Trendsidebar />
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error(error);
    return (
      <main className="flex items-center justify-center h-screen">
        <p className="text-red-500">Failed to load user data.</p>
      </main>
    );
  }
}
