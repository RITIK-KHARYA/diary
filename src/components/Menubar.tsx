"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageSquare, Bell, Bookmark, User } from "lucide-react";
import { LucideIcon, ChevronRight } from "lucide-react";

interface MenuItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  isActive: boolean;
}

interface MenubarProps {
  username: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  icon: Icon,
  label,
  href,
  isActive,
}) => {
  return (
    <Link
      href={href}
      prefetch={true}
      className={`group flex items-center justify-between px-6 py-4 transition-all duration-300 relative text-sm ${
        isActive
          ? "text-white bg-white/10"
          : "text-gray-400 hover:text-white hover:bg-white/5"
      }`}
    >
      <div className="flex items-center gap-4">
        <Icon
          className={`w-6 h-6 transition-transform duration-300 ${
            isActive ? "scale-110" : "group-hover:scale-110"
          }`}
        />
        <span className="text-sm">{label}</span>
      </div>
      <ChevronRight
        className={`w-4 h-4 transition-all duration-300 ${
          isActive ? "opacity-100" : "opacity-0 -translate-x-2"
        }`}
      />
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-r-full" />
      )}
    </Link>
  );
};


export const Menubar: React.FC<MenubarProps> = ({ username }) => {
  const [activeItem, setActiveItem] = useState("Home");
  const pathname = usePathname();

  return (
    <div className="w-60 bg-black/95 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden shadow-2xl shadow-black/20 h-fit">
     
      <div className="flex flex-col gap-2">
        <MenuItem
          icon={Home}
          label="Home"
          href="/home"
          isActive={pathname === "/home"}
        />
        <MenuItem
          icon={MessageSquare}
          label="Message"
          href="/message"
          isActive={pathname === "/message"}
        />
        <MenuItem
          icon={Bell}
          label="Notification"
          href="/notification"
          isActive={pathname === "/notification"}
        />
        <MenuItem
          icon={Bookmark}
          label="Bookmark"
          href="/bookmarks"
          isActive={pathname === "/bookmarks"}
        />
        <MenuItem
          icon={User}
          label="Profile"
          href={`/user/${username}`}
          isActive={pathname === `/user/${username}`}
        />
      </div>
    </div>
  );
};
