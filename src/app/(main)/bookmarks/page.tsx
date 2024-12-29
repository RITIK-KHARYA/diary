import Trendsidebar from "@/components/Trendsidebar";
import { Metadata } from "next";
import Bookmark from "./Bookmark";

export const metadata: Metadata = {
  title: "Bookmarks",
};
export default function Page() {
  return (
    <main className="flex gap-4 min-w-0 w-full h-cal h-screen mb-10 gap-y-2">
      <div className=" w-full flex justify-center flex-col h-screen gap-y-5">
        <div className="w-full shadow-sm bg-neutral-900/50 rounded-xl h-16 justify-center flex items-center">
          <h1 className="font-bold text-2xl text-center ">Bookmarks</h1>
        </div>
        <Bookmark />
      </div>
      <Trendsidebar />
    </main>
  );
}
