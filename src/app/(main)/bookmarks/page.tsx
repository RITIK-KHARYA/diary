import Trendsidebar from "@/components/Trendsidebar";
import { Metadata } from "next";
import Bookmark from "./Bookmark";

export const metadata: Metadata = {
  title: "Bookmarks",
};

export default function Page() {
  return (
    <main className="flex flex-col w-full h-[calc(100vh-90px)] px-2 sm:px-4 md:px-6 mb-10">
      <div className="flex flex-col items-center w-full max-w-6xl mx-auto">
        <h1 className="mb-4 p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-sm text-neutral-300 font-mono font-bold bg-neutral-900 w-[92%] text-center">
          Bookmark
        </h1>
        <Bookmark />
      </div>

      {/* Uncomment if you want to add the Trendsidebar component
      <div className="hidden lg:block lg:w-80 xl:w-96">
        <Trendsidebar />
      </div>
      */}
    </main>
  );
}
