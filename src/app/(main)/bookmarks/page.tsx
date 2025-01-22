import Trendsidebar from "@/components/Trendsidebar";
import { Metadata } from "next";
import Bookmark from "./Bookmark";

export const metadata: Metadata = {
  title: "Bookmarks",
};
export default function Page() {
  return (
    <main className="flex gap-4 min-w-0 w-full h-cal h-screen mb-10 gap-y-2">
      <Bookmark />
    </main>
  );
}
