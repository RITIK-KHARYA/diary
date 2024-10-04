"use server";
import { useUser } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createpostschema } from "@/lib/Validation";
import { currentUser } from "@clerk/nextjs/server";
import { getPostDataInclude } from "@/lib/types";
import { connect } from "http2";

export async function submitpost(input: {
  content: string;
  mediaIds: string[];
}) {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }
  const { content, mediaIds } = createpostschema.parse({ input });

  const newpost = await prisma.post.create({
    data: {
      //title: "",
      content,
      userId: user.id,

      attachments: {
        connect: mediaIds.map((id) => ({ id })),
      },
    },
    include: getPostDataInclude(user.id),
  });

  return newpost;
}
