import Menubar from "@/components/Menubar";
import Trendsidebar from "@/components/Trendsidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row justify-between gap-6 p-6">
      <Menubar classname="sticky top-[5.5rem] w-56 h-fit sm:block px-4 py-6 bg-card rounded-xl shadow-xl border border-zinc-800 space-y-4 flex-none bg-neutral-black" />
      {children}
    </div>
  );
}
