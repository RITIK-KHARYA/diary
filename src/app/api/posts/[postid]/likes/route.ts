import prisma from "@/lib/prisma";
import { Likeinfo } from "@/lib/types";
import { useAuth } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { postid: string } }
) {
  try {
    const user = await currentUser();

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }));
    }

    const post = await prisma.post.findUnique({
      where: { id: params.postid },
      select: {
        likes: {
          where: {
            userId: user.id, //changed here check it out later by the author for the author
          },
          select: {
            userId: true,
          },
        },
        _count: {
          select: { likes: true },
        },
      },
    });
    if (!post) {
      return new Response(JSON.stringify({ error: "Post not found" }), {
        status: 404,
      });
    }

    const data: Likeinfo = {
      likes: post._count.likes,
      islikedbyUser: !!post?.likes.length,
    };
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

    const liked = await prisma.like.upsert({
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
    return Response.json({ success: true });
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
    await prisma.like.deleteMany({
      where: {
        userId: user.id,
        postId: params.postid,
      },
    });
    return Response.json({success: true});
  } catch (error) {
    return new Response(JSON.stringify({ error: "internal server error" }), {
      status: 500,
    });
  }
}
