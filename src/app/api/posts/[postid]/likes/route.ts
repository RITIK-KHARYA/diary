import prisma from "@/lib/prisma";
import { Likeinfo } from "@/lib/types";
import { useAuth } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(
  { params }: { params: { postid: string } },
  req: Request
) {
  try {
    const { userId } = useAuth();

    if (!userId) {
      return new Response(JSON.stringify({ error: "User not found" }));
    }
    const post = await prisma.post.findUnique({
      where: { id: params.postid },
      select: {
        likes: {
          where: {
            userId: userId, //changed here check it out later by the author for the author
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
  } catch (error) {
    return new Response(JSON.stringify({ error: "internal server error" }), {
      status: 500,
    });
  }
}

export async function POST(params: { postid: string }, req: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 401,
      });
    }

    await prisma.like.upsert({
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
    return new Response();
  } catch (error) {
    return new Response(JSON.stringify({ error: "internal server error" }), {
      status: 500,
    });
  }
}
export async function DELETE(params: { postid: string }, req: Request) {
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
    return new Response();
  } catch (error) {
    return new Response(JSON.stringify({ error: "internal server error" }), {
      status: 500,
    });
  }
}
