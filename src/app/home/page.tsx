import { createUserToDb } from "@/actions/createUserToDb";
import Menubar from "@/components/Menubar";
import PostEditor from "@/components/posts/editor/PostEditor";
import Trendsidebar from "@/components/Trendsidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import prisma from "@/lib/prisma";
import ForYoufeed from "../(main)/ForYoufeed";
import { QueryClient } from "@tanstack/react-query";
// import ForYoufeed from "../(main)/ForYoufeed";
export default async function Home() {
  const user = await createUserToDb();

  // const posts = await prisma.post.findMany({
  //   orderBy: {
  //     createdAt: "desc",
  //   },
  //   include: {
  //     user: {
  //       select: {
  //         displayname: true,
  //         avatarurl: true,
  //         updatedAt: true,
  //         createdAt: true,
  //       },
  //     },
  //   },
  // });

  return (
    <main className="w-full h-screen mt-16 ">
      <div className="flex flex-row gap-x-5 ">
        <div className="sticky space-y-2 w-[350px] flex justify-center ml-5">
          <Menubar classname="sticky top-[5.5rem] gap-2 m-0 w-56 h-fit hidden sm:block px-3 py-8 space-y-4 border-2 border-zinc-900 bg-card rounded-xl flex-none shadow-xl divide-y-2 divide-zinc-800" />
        </div>
        <ScrollArea className="flex-1 h-screen  ">
          <div className="h-full flex flex-col w-fit shadow-sm ml-10  ">
            <PostEditor
              avatar={user?.avatarurl || "https://github.com/shadcn.png"}
            />

            <div className="flex flex-col  justify-start gap-y-4 mt-4 ">
              {/* {posts.map((post) => (
                <Post key={post.id} post={post} />
              ))} */}
              <ForYoufeed />
            </div>
          </div>
        </ScrollArea>
        <div>
          <Trendsidebar />
        </div>
      </div>
    </main>
  );
}
