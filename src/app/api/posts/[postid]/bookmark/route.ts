import prisma from "@/lib/prisma";
import { Bookmarkinfo, Likeinfo } from "@/lib/types";
import { useAuth } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest, //the request should come before the params keep in mind for the author
  { params }: { params: { postid: string } }
) {
  try {
    const user = await currentUser();

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }));
    }

    const bookmark = await prisma.bookmark.findUnique({
      where: {
        userId_postId: {
          userId: user.id,
          postId: params.postid,
        },
      },
    });
    const data: Bookmarkinfo = {
      isbookmarkedbyUser: !!bookmark,
    };
    if (!bookmark) {
      return new Response(JSON.stringify({ error: "Post not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(data));
  } catch (error) {
    return new Response(JSON.stringify({ error: "internal server error" }), {
      status: 500,
    });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { postid: string } }
) {
  try {
    const user = await currentUser();

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 401,
      });
    }
    console.log("hello bachooooooo");
    console.log(params);

    const liked = await prisma.bookmark.upsert({
      where: {
        userId_postId: {
          userId: user.id,
          postId: params.postid,
        },
      },
      create: {
        userId: user.id,
        postId: params.postid,
      },
      update: {},
    });
    console.log("hehe");
    console.log(liked);
    return new Response();
  } catch (error) {
    return new Response(JSON.stringify({ error: "internal server error" }), {
      status: 500,
    });
  }
}
export async function DELETE(req: Request, params: { postid: string }) {
  try {
    const user = await currentUser();

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 401,
      });
    }
    await prisma.bookmark.deleteMany({
      where: {
        userId: user.id,
        postId: params.postid,
      },
    });
    return new Response();
  } catch (error) {
    return new Response(JSON.stringify({ error: "internal server error" }), {
      status: 500,
    });
  }
}
