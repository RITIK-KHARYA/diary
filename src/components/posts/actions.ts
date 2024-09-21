"use server";
import { useUser } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { getPostDataInclude } from "@/lib/types";
export default async function deletePost(id: string) {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found");
  }
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  if (!post) {
    throw new Error("Post not found");
  }
  if (post.userId !== user.id) {
    throw new Error("Unauthorized");
  }
  const deletedPost = await prisma.post.delete({
    where: {
      id,
    },
    include: getPostDataInclude(user.id),
  });
  return deletedPost;
}
