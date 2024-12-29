import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import {
  ClerkProvider,
} from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import { ModeToggle } from "@/components/toggle-mode";
import ReactQueryProvider from "./ReactQueryProvider";
import { filerouter } from "./api/uploadthing/core";
import { extractRouterConfig } from "uploadthing/server";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Diary",
  description: "Diarycover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="overflow-hidden"> 
        <body className={inter.className + "overflow-hidden"}>
          <NextSSRPlugin routerConfig={extractRouterConfig(filerouter)} />
          <ReactQueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />

              {children}
              <Toaster />
            </ThemeProvider>
          </ReactQueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
