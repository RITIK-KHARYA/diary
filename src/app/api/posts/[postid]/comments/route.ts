import prisma from "@/lib/prisma";
import { CommentPage, getCommentDataInclude } from "@/lib/types";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { postid: string } }
) {
  try {
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
    console.log(cursor);

    const pageSize = 10;
    const user = await currentUser();

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 401,
      });
    }
    const comments = await prisma.comment.findMany({
      where: { postId: params.postid },
      include: getCommentDataInclude(user.id),
      orderBy: { createdAt: "desc" },
      take: pageSize - 1, // -1 because we want to include the last comment and - before pagesize
      cursor: cursor ? { id: cursor } : undefined,
    });
    const previousCursor = comments.length > pageSize ? comments[0].id : null;
    const data: CommentPage = {
      comments: comments.length > pageSize ? comments.slice(1) : comments, //why slice 1 ? we should slice 0 instead ?
      previousCursor,
    };
    return Response.json(data);
  } catch (error) {
    return new Response(JSON.stringify({ error: "internal server error" }), {
      status: 500,
    });
  }
}
