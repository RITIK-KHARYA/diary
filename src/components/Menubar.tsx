import { Bell, Bookmark, Ghost, HomeIcon, Mail, User } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { getUser } from "@/actions/getUser";
import prisma from "@/lib/prisma";
import { equal } from "assert";
interface MenubarProps {
  classname?: string;
  username?: string;
}

export default function Menubar({ classname }: MenubarProps) {
  return (
    <div className={classname}>
      <Button
        variant="ghost"
        className="flex items-start justify-start gap-3 m-2 "
        title="Home"
        asChild
      >
        <Link href="/home">
          <HomeIcon />
          Home
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="flex items-start justify-start gap-3 m-2 "
        title="Home"
        asChild
      >
        <Link href="/message">
          <Mail />
          Message
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="flex items-start justify-start gap-3 m-2 "
        title="Home"
        asChild
      >
        <Link href="/notification">
          <Bell />
          Notification
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="flex items-start justify-start gap-3 m-2 "
        title="Home"
        asChild
      >
        {/* <Link href={`/user/${}`}>
          <User />
          Profile
        </Link> */}
        <Link href="/bookmark">
          <Bookmark />
          Bookmark
        </Link>
      </Button>
    </div>
  );
}
