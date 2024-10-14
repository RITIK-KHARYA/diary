"use server";

import { createCommentschema } from "@/lib/Validation";
import prisma from "@/lib/prisma";
import { PostData, getCommentDataInclude } from "@/lib/types";
import { currentUser } from "@clerk/nextjs/server";

export async function submitComment({
  post,
  comment,
}: {
  post: PostData;
  comment: string;
}) {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }
  const { content: contentValidated } = createCommentschema.parse(comment);
  const newComment = await prisma.comment.create({
    data: {
      //data kaha se aaya ?
      content: contentValidated,
      userId: user.id,
      postId: post.id,
    },
    include: getCommentDataInclude(user.id),
  });
  return newComment;
}
