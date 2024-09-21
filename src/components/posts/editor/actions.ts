"use server";
import { useUser } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createpostschema } from "@/lib/Validation";
import { currentUser } from "@clerk/nextjs/server";
import { getPostDataInclude } from "@/lib/types";

export async function submitpost(input: string) {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }
  const { content } = createpostschema.parse({ content: input });

  const newpost = await prisma.post.create({
    data: {
      title: " ",
      content,
      userId: user.id,
    },
    include: getPostDataInclude(user.id),
  });

  return newpost;
}
