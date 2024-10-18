import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});
export default function Page() {
  return (
    <div className="w-full flex items-center justify-center  ">
      <div className={`text-6xl font-bold ${poppins.className}`}>
        Coming Soon...
      </div>
    </div>
  );
}
