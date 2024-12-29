import { getUser } from "@/actions/getUser";
import { Menubar } from "@/components/Menubar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const username = (await getUser())?.username || "defaultUser";
  return (
    <div className="flex flex-row justify-between gap-6 p-6 bg-black">
      <Menubar username={username} />
      {children}
    </div>
  );
}
//  classname =
//    "sticky top-[5.5rem] w-56 h-fit sm:block px-4 py-6 bg-card rounded-xl shadow-xl border border-zinc-800 space-y-4 flex-none bg-neutral-black";
