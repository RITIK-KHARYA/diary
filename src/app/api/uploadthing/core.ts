import { Avatar } from "stream-chat-react";
import { createUploadthing } from "uploadthing/next";
import { UTApi, UploadThingError } from "uploadthing/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
import { useAuth } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import { FileRouter } from "uploadthing/next";
import newavatarfile from "@/assets/newavatar.png";
import { MediaType } from "@prisma/client";
import { getUser } from "@/actions/getUser";

const f = createUploadthing();

export const filerouter = {
  Avatar: f({
    image: { maxFileSize: "4MB" },
  })
    .middleware(async () => {
      const user = await getUser();
      if (!user) {
        throw new UploadThingError("unathorized");
      }
      return { user };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const oldavatarurl = metadata?.user.avatarurl;
      const isFirst = oldavatarurl?.includes("clerk");

      if (oldavatarurl && !isFirst) {
        console.log(
          "the old avatar is successfully removed and replaced with a new one"
        );
        const key = oldavatarurl.split(
          `/a/${process.env.UPLOADTHING_APP_ID}/`
        )[1];

        await new UTApi().deleteFiles(key); //utapi is uploadthing api to manage files direclty
      }

      const newAvatarUrl = file.url.replace(
        "/f/",
        `/a/${process.env.UPLOADTHING_APP_ID}/`
      );
      console.log("avatar url", newAvatarUrl);
      await prisma.user.update({
        where: { id: metadata?.user.id },
        data: { avatarurl: newAvatarUrl },
      });
      console.log("done");
      return { avatarUrl: newAvatarUrl };
    }),

  attachment: f({
    image: { maxFileSize: "4MB", maxFileCount: 5 },
    video: { maxFileSize: "64MB", maxFileCount: 5 },
  })
    .middleware(async () => {
      const user = await getUser();
      if (!user) {
        throw new UploadThingError("unathorized");
      }
      return {};
    })
    .onUploadComplete(async ({ file }) => {
      const media = await prisma.media.create({
        data: {
          url: file.url.replace("/f/", `/a/${process.env.UPLOADTHING_APP_ID}/`),
          type: file.type.startsWith("image")
            ? MediaType.IMAGE
            : MediaType.VIDEO, //mediatype instead of IMAGE AND VIDEO
        },
      });
      return { MediaId: media.id };
    }),
} satisfies FileRouter;
  
  


export type AppFileRouter = typeof filerouter;
