import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();
  if (user) {
    redirect("/home");
  }

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="w-full flex items-center justify-end -ml-36   ">
        <div className=" flex justify-start items-start mr-40 mt-28 ">
          <Image
            className="object-cover rounded-xl mr-10"
            src="/notebook.png"
            alt="side image "
            width={300}
            height={300}
          />
        </div>
        <div className="flex flex-col items-center h-[500px] mt-32 border-0 border-lime-100 rounded-2xl">
          <div className="text-6xl m-10  ">Now Happening</div>
          <div className="flex flex-col mt-10 ">
            <Link href="/sign-in">
              <button className="bg-white text-blue-600/90 h-10 w-60 rounded-full m-2  ">
                Sign In
              </button>
              <div>
                <button className="bg-green-600/90 m-2 rounded-full text-white flex-nowrap w-60 flex flex-col h-10 items-center justify-center">
                  Create Account
                </button>
              </div>
            </Link>
            <div>
              <Link href={"/sign-up"}>
                <Button className="bg-blue-600/90 m-2  text-white w-60 rounded-full">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
