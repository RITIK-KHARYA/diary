import Trendsidebar from "@/components/Trendsidebar";
import { Metadata } from "next";
import Bookmark from "./Bookmark";

export const metadata: Metadata = {
  title: "Bookmarks",
};
export default function Page() {
  return (
    <main className="flex gap-5 min-w-0 w-full ">
      <div className=" w-full flex justify-center flex-col items-center  ">
        <div className=" rounded-xl bg-card p-5  shadow-sm">
          <h1 className="font-bold text-2xl text-center ">Bookmarks</h1>
        </div>
        <Bookmark />
      </div>
      <Trendsidebar />
    </main>
  );
}
