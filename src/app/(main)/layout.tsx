import { getUser } from "@/actions/getUser";
import { Menubar } from "@/components/Menubar";
import Trendsidebar from "@/components/Trendsidebar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const username = (await getUser())?.username || "defaultUser";

  return (
    <div className="min-h-screen bg-black">
      {/* Desktop grid layout */}
      <div className="max-w-full mx-auto grid grid-cols-4 gap-6 p-6">
        {/* Menubar - 1/4 width */}
        <div className="hidden lg:block col-span-1 mx-auto items-center justify-center sticky top-6 h-fit sm:block">
          <Menubar username={username} isCompact={false} />
        </div>

        {/* Main content - 2/4 width (middle) */}
        <main className="col-span-4  sm:w-full lg:col-span-2 min-w-0 -ml-8">{children}</main>


        <div className="hidden lg:block col-span-1 sticky top-6 h-fit">
          <div className="bg-black/95  backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden shadow-2xl shadow-black/20">
            <Trendsidebar />
          </div>
        </div>
      </div>

      {/* Mobile menubar - only visible on small screens */}
      <div className="lg:hidden md:block fixed bottom-0 left-0 right-0">
        <Menubar username={username} isCompact={true} />
      </div>
    </div>
  );
}
