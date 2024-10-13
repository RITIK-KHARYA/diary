import { currentUser } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";
import { PostPage, getPostDataInclude } from "@/lib/types";

export async function GET(req: NextRequest) {
  try {
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
    console.log(cursor);

    const pageSize = 10;

    const user = await currentUser();

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const bookmarks = await prisma.bookmark.findMany({
      where: {
        userId: user.id,
      },
      include: {
        post: {
          include: getPostDataInclude(user.id),
        },
      },
      orderBy: { createdAt: "desc" },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const nextcursor =
      bookmarks.length > pageSize ? bookmarks[pageSize].id : null;

    const data: PostPage = {
      posts: bookmarks.slice(0, pageSize).map((bookmark) => bookmark.post),
      nextCursor: nextcursor,
    };

    return Response.json(data);
  } catch (error) {
    console.error("there is interal error", error), { status: 500 };
  }
}
