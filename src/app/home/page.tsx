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

  return (
    <main className="w-full  mt-16 ">
      <div className="flex flex-row space-x-6 ">
        <div className="sticky space-y-2 w-[350px] flex justify-center ml-2">
          <Menubar classname="sticky top-[5.5rem] gap-2 m-0 w-56 h-fit hidden sm:block px-3 py-8 space-y-4 border-2 border-zinc-900 bg-card rounded-xl flex-none shadow-xl divide-y-2 divide-zinc-800" />
        </div>
        <ScrollArea className=" h-[calc(100vh-100px)] w-fit px-4 ">
          <div className=" flex flex-col w-fit shadow-sm space-y-2 ">
            <PostEditor
              avatar={user?.avatarurl || "https://github.com/shadcn.png"}
            />

            <div className="">
              <ForYoufeed />
            </div>
          </div>
        </ScrollArea>
        <div className="">
          <Trendsidebar />
        </div>
      </div>
    </main>
  );
}
