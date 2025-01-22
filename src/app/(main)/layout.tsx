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
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start gap-4 p-4">
          {/* Left Sidebar - Menubar */}
          <div className="hidden lg:block sticky top-4">
            <Menubar username={username} />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0 max-w-2xl mx-auto w-full">
            {children}
          </div>

          {/* Right Sidebar - Trends */}
          <div className="hidden xl:block sticky top-4 w-80">
            <Trendsidebar />
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Fixed at bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-black/95 border-t border-white/10">
        <div className="flex justify-around py-2">
          <Menubar username={username} />
        </div>
      </div>
    </div>
  );
}
