import Menubar from "@/components/Menubar";
import Trendsidebar from "@/components/Trendsidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row justify-evenly">
      <Menubar classname="sticky top-[5.5rem] gap-2 m-8 w-56 h-fit  sm:block px-3 py-8 space-y-4 border-2 border-zinc-800 bg-card rounded-xl flex-none shadow-xl divide-y-2 divide-zinc-800 " />
      {children}

    </div>
  );
}
