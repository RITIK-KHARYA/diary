import Trendsidebar from "@/components/Trendsidebar";
import { Metadata } from "next";
import Bookmark from "./Bookmark";

export const metadata: Metadata = {
  title: "Bookmarks",
};
export default function Page() {
  return (
    <main className="flex gap-4 min-w-0 w-full h-cal h-screen mb-10 gap-y-2">
      <div className="flex flex-col items-center">
        <span className="mb-4 p-3 rounded-xl shadow-sm text-neutral-300 font-mono font-bold bg-neutral-900 w-[94%] flex items-center justify-center">Bookmark</span>
        <Bookmark />
      </div>
    </main>
  );
}
