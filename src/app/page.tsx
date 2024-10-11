import { BackgroundLines } from "@/components/ui/background-lines";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import LInk from "next/link";
import { redirect } from "next/navigation";

export default function Landingpage() {
  const user = currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="flex relative items-center justify-center h-[100vh] w-full ">
      <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
        <h1 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-800 to-neutral-900 dark:from-neutral-600 dark:to-white text-xl  md:text-2xl lg:text-5xl font-sans py-2 md:py-10  font-bold tracking-tight fixed ">
          Welcome to the Diary
        </h1>

        <p className="max-w-xl   text-neutral-300/90 dark:text-neutral-400 text-md gap-y-10 p-2 mt-64 text-center ">
          Every moment, every thought — your story starts here. Share life in
          real-time, one post at a time.
        </p>

        <div className="flex flex-row justify-around gap-4 mt-10 ">
          {" "}
          <Link href="/sign-in" className="z-20">
            <Button
              className=" text-white box-shadow  border-neutral-800 shadow-lg  hover:opacity-90 hover:scale-105 flex-none bg-card  border-2  border-slate-400/50 cursor-default"
              variant="outline"
            >
              Sign in
            </Button>
          </Link>
          <Link href="/sign-up" className="z-20">
            <Button
              className=" text-white box-shadow  border-neutral-800 shadow-lg  hover:opacity-90 hover:scale-105 flex-none bg-card  border-2  border-slate-400/50 cursor-default"
              variant="outline"
            >
              Sign up
            </Button>
          </Link>
        </div>
      </BackgroundLines>
    </div>
  );
}
