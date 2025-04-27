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
  isCompact?: boolean;
}

interface MenubarProps {
  username: string;
  isCompact?: boolean;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  icon: Icon,
  label,
  href,
  isActive,
  isCompact = false,
}) => {
  if (isCompact) {
    return (
      <Link
        href={href}
        prefetch={true}
        className={`flex flex-col items-center justify-center p-2 transition-all duration-300 relative ${
          isActive ? "text-white" : "text-gray-400 hover:text-white"
        }`}
      >
        <Icon
          className={`w-6 h-6 transition-transform duration-300 ${
            isActive ? "scale-110" : "hover:scale-110"
          }`}
        />
        <span className="text-xs mt-1">{label}</span>
        {isActive && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-t-full" />
        )}
      </Link>
    );
  }

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

export const Menubar: React.FC<MenubarProps> = ({ username, isCompact }) => {
  const pathname = usePathname();

  // Determine if we're using the compact version based on screen size or prop
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
  const useCompactView = isCompact !== undefined ? isCompact : isMobile;

  // For mobile view, use a different container style
  if (useCompactView) {
    return (
      <div className="w-full flex justify-around items-center bg-black/95 backdrop-blur-xl border-t border-white/10 py-2">
        <MenuItem
          icon={Home}
          label="Home"
          href="/home"
          isActive={pathname === "/home"}
          isCompact={true}
        />
        <MenuItem
          icon={MessageSquare}
          label="Message"
          href="/message"
          isActive={pathname === "/message"}
          isCompact={true}
        />
        <MenuItem
          icon={Bell}
          label="Notification"
          href="/notification"
          isActive={pathname === "/notification"}
          isCompact={true}
        />
        <MenuItem
          icon={Bookmark}
          label="Bookmark"
          href="/bookmarks"
          isActive={pathname === "/bookmarks"}
          isCompact={true}
        />
        <MenuItem
          icon={User}
          label="Profile"
          href={`/user/${username}`}
          isActive={pathname === `/user/${username}`}
          isCompact={true}
        />
      </div>
    );
  }

  // Desktop view
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
