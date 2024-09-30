import { Avatar } from "stream-chat-react";
import { createUploadthing } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
import { useAuth } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import { FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const filerouter = {
  Avatar: f({
    image: { maxFileSize: "512KB" },
  })
    .middleware(async () => {
      const user = await currentUser();
      if (!user) {
        throw new UploadThingError("unathorized");
      }
      return { user };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const newAvatarUrl = file.url.replace(
        "/f/",
        `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}`
      );
      await prisma.user.update({
        where: { id: metadata?.user.id },
        data: { avatarurl: newAvatarUrl },
      });
      return { avatarUrl: newAvatarUrl };
    }),
} satisfies FileRouter;

export type AppFileRouter = typeof filerouter;
