import { createUserToDb } from "@/actions/createUserToDb";
import PostEditor from "@/components/posts/editor/PostEditor";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ForYoufeed from "../ForYoufeed";
import Followingfeed from "../Followingfeed";

export default async function Home() {
  try {
    const user = await createUserToDb();
    return (
      <div className="w-full rounded-xl border border-white/10 bg-black/95 backdrop-blur-xl overflow-hidden shadow-lg">
        <ScrollArea className="h-[calc(100vh-6rem)]">
          <div className="px-4 py-4">
            <div className="mb-6">
              <PostEditor
                avatar={user.avatarurl || "https://github.com/shadcn.png"}
              />
            </div>
            <Tabs defaultValue="for-you" className="w-full">
              <TabsList className="w-full mb-6">
                <TabsTrigger
                  value="for-you"
                  className="flex-1 py-3 font-medium"
                >
                  For You
                </TabsTrigger>
                <TabsTrigger
                  value="following"
                  className="flex-1 py-3 font-medium"
                >
                  Following
                </TabsTrigger>
              </TabsList>

              <div className="space-y-4">
                <TabsContent value="for-you">
                  <ForYoufeed />
                </TabsContent>
                <TabsContent value="following">
                  <Followingfeed />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </ScrollArea>
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertDescription>
            Unable to load user data. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }
}
