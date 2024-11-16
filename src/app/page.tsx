// ParentComponent.tsx (Server Component)
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import LandingPage from "@/components/comments/landingpage";
import Navbar from "@/components/Navbar";
import AppBar from "@/components/app-bar";

export default async function ParentComponent() {
  const user = await currentUser();

  if (user) {
    redirect("/home");
  }

  return (
    <div className="flex flex-col h-full items-center justify-center">
      <AppBar />
      <LandingPage isUserLoggedIn={!!user} />
    </div>
  );
}
