"use server";

import { createCommentschema } from "@/lib/Validation";
import prisma from "@/lib/prisma";
import {
  PostData,
  getCommentDataInclude,
  getUserDataSelect,
} from "@/lib/types";
import { currentUser } from "@clerk/nextjs/server";
import { error } from "console";

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
  console.log(comment);
  const { content: contentValidated } = createCommentschema.parse({
    content: comment,
  });

  const newComment = await prisma.comment.create({
    data: {
      content: contentValidated,
      userId: user.id,
      postId: post.id,
    },

    include: getCommentDataInclude(user.id),
  });
  return newComment;
}

export default async function deleteComment(id: string) {
  const user = await currentUser();
  if (!user) {
    throw error("User not found");
  }
  const comment = await prisma.comment.findUnique({
    where: {
      id,
    },
  });
  if (!comment) {
    throw error("comment not found");
  }
  if (comment.userId !== user.id) {
    throw error("unauthorized");
  }

  const deletedComment = await prisma.comment.delete({
    where: { id },
    include: getCommentDataInclude(user.id),
  });
  return deletedComment;
}

