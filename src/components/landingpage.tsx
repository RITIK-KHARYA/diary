"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Particles from "@/components/ui/particles";
import { BorderBeam } from "@/components/ui/border-beam";
import HeroVideoDialog from "@/components/ui/hero-video-dialog";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { useTheme } from "next-themes";
import { Footer } from "./footer"; // Import the Footer component

export default function LandingPage({
  isUserLoggedIn,
}: {
  isUserLoggedIn: boolean;
}) {
  const { themes } = useTheme();
  const [particlesColor, setParticlesColor] = useState("dark");
  const animatedWords = "Welcome To Diary".split(" ");

  useEffect(() => {
    setParticlesColor(themes.includes("dark") ? "#fafaf9" : "#171717");
  }, [themes]);

  if (isUserLoggedIn) return null;

  return (
    <div className="w-screen relative">
      <div className="h-screen max-w-full mt-10">
        <div className="p-2 flex flex-col items-center justify-center">
          <Link href="">
            <span className="relative z-10 text-sm">
              <HoverBorderGradient>🌟 Join Our Community</HoverBorderGradient>
            </span>
          </Link>
          <div className="leading-loose font-normal z-10 mt-10">
            <span className="text-4xl flex items-center justify-center font-bold text-white md:text-5xl mx-auto flex-wrap w-[650px]">
              {animatedWords.map((word, index) => (
                <motion.span
                  className="px-1"
                  key={index}
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </div>
          <span className="text-center mt-10 w-[650px] text-muted-foreground z-10 text-md">
            A microblogging platform that allows you to write and share your
            thoughts and ideas with the world.
          </span>
        </div>
        <div className="relative w-[950px] mx-auto pointer-events-auto z-40 mt-24">
          <div className="shadow-[0px_0px_300px_0px_#155e75] top-full left-0 bg-black absolute -z-10 flex max-w-screen-lg w-full aspect-video flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
            <HeroVideoDialog
              videoSrc="https://www.youtube.com/embed/U14GpQ5K03g"
              thumbnailSrc="/thumbnail.jpg"
              thumbnailAlt="Video Thumbnail"
            />
            <BorderBeam size={250} duration={12} delay={5} />
          </div>
        </div>
      </div>
      <Particles
        className="absolute inset-0"
        quantity={170}
        ease={90}
        color={particlesColor}
        refresh
      />
      <Footer />
    </div>
  );
}
