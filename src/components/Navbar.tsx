import { EB_Garamond, Montserrat } from "next/font/google";
import { getUser } from "@/actions/getUser";
import CustomButton from "./userButton";
import Link from "next/link";
import { Bookmark } from "lucide-react";

const ebGaramond = EB_Garamond({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "600"] });

export default async function Navbar() {
  const user = await getUser();
  if (!user) return null;

  return (
    <header className="sticky top-0 z-20 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-4 sm:px-6 md:container flex h-14 sm:h-16 items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Link href="/" className="flex items-center space-x-1 sm:space-x-2">
            <Bookmark className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className={`text-xl sm:text-2xl font-semibold ${montserrat.className}`}>
              Diary
            </span>
          </Link>
        </div>
        <nav className="flex items-center">
          <CustomButton user={user} />
        </nav>
      </div>
    </header>
  );
}