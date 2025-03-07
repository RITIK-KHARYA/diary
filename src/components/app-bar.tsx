"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { BiLogoDiscordAlt } from "react-icons/bi";
import { useRouter } from "next/navigation";

export default function AppBar() {
  const logo = "/logomaiin.svg";
  const router = useRouter();
  return (
    <div className="flex w-[60%] justify-normal items-center  rounded-2xl bg-neutral-900/30 text-sm border-neutral-300 border-[0.2px] mt-8 ">
      <div className="flex justify-between items-center w-full h-16 p-2">
        <div className="flex gap-x-3 ">
          <Image
            src={logo}
            height={40}
            width={40}
            layout="fixed"
            className="drop-shadow-md object-cover z-10 relative bg-white"
            alt="logo.png"
          />
          <span className="text-base flex justify-center items-center font-white font-bold">
            Diary
          </span>
        </div>
        <div className="flex gap-4">
          <Button
            className=" text-white rounded-lg h-9 w-28 text-sm gap-x-1
           bg-neutral-900/20 hover:bg-neutral-900/80 border-neutral-400 border-[1px]  
           "
            onClick={() => router.push("https://discord.gg/dwCrs6h9xx")}
          >
            <BiLogoDiscordAlt className="text-violet-400  " size={20} />
            Discord
          </Button>
          <Button
            className="rounded-lg h-9 border-black border-[1px] w-28 bg-white text-black"
            onClick={() => {
              router.push("/sign-in");
            }}
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}
