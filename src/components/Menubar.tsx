import { Bell, Ghost, HomeIcon, Mail, User } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
interface MenubarProps {
  classname?: string;
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
        <Link href="/profile">
          <User />
          Profile
        </Link>
      </Button>
    </div>
  );
}
