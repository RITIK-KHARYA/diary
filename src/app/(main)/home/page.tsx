import { createUserToDb } from "@/actions/createUserToDb";
import Menubar from "@/components/Menubar";
import PostEditor from "@/components/posts/editor/PostEditor";
import Trendsidebar from "@/components/Trendsidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import prisma from "@/lib/prisma";
import ForYoufeed from "../ForYoufeed";
import { QueryClient } from "@tanstack/react-query";
import { error } from "console";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";
import Followingfeed from "../Followingfeed";
// import ForYoufeed from "../(main)/ForYoufeed";
export default async function Home() {
  const user = await createUserToDb();
  if (!user) {
    throw error("User not found");
  }

  return (
    <main className="w-full mt-6   ">
      <div className="flex flex-row space-x-6 justify-center">
        <ScrollArea className=" h-[calc(100vh-100px)] w-fit px-4  border-x-2 ">
          <div className=" flex flex-col w-fit shadow-sm space-y-2 ">
            <PostEditor
              avatar={user?.avatarurl || "https://github.com/shadcn.png"}
            />

            <div className="">
              <Tabs defaultValue="for-you">
                <TabsList>
                  <TabsTrigger value="for-you">for-you</TabsTrigger>
                  <TabsTrigger value="following">following</TabsTrigger>
                </TabsList>
                <TabsContent value="for-you">
                  <ForYoufeed />
                </TabsContent>
                <TabsContent value="following">
                  <Followingfeed />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </ScrollArea>
        <Trendsidebar />
      </div>
    </main>
  );
}
