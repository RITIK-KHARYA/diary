import { EB_Garamond, Montserrat } from "next/font/google";

import { ModeToggle } from "./toggle-mode";
import { UserButton } from "@clerk/nextjs";
import { getUser } from "@/actions/getUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ebGaramond = EB_Garamond({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });

export default async function Navbar() {
  const user = await getUser();
  return (
    <div className=" top-0 w-full z-20 border-b-2 my-2 border-slate-800 sticky ">
      <div className="flex justify-between">
        <div className="mt-1 px-2">
          <ModeToggle />
        </div>
        <div
          className={`flex justify-center items-center  text-3xl h-12 text-white font-semibold tracking-wider , ${montserrat.className}`}
        >
          Diary
        </div>
        <div className="flex justify-end mr-4 px-2 mt-1">
          <UserButton />
        </div>
      </div>
    </div>
  );
}
