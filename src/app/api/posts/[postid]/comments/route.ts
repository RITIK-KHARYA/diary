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
    console.log("mycursor", cursor);

    const pageSize = 5;
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
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
    });
    const previousCursor =
      comments.length > pageSize ? comments[pageSize].id : null;
    const data: CommentPage = {
      comments: comments.slice(0, pageSize),
      previousCursor,
    };
    return Response.json(data);
  } catch (error) {
    return new Response(JSON.stringify({ error: "internal server error" }), {
      status: 500,
    });
  }
}
