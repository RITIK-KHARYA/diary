import { EB_Garamond, Montserrat } from "next/font/google";
import { getUser } from "@/actions/getUser";
import CustomButton from "./userButton";
import Link from "next/link";

const ebGaramond = EB_Garamond({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });

export default async function Navbar() {
  const user = await getUser();
  if (!user) return null;

  return (
    <div className=" top-0 w-full z-20 border-b-2 my-2 border-slate-800 sticky ">
      <div className="flex justify-between">
        <div className="mt-1 px-2"></div>
        <div
          className={`flex justify-center items-center  text-3xl h-12 text-white font-semibold tracking-wider , ${montserrat.className}`}
        >
          <Link href="/">Diary</Link>
        </div>
        <div className="flex justify-end">
          <div className="flex flex-row items-center justify-end gap-2 divide mr-4">
            <CustomButton user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}
