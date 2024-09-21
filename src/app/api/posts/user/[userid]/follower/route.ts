import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { Followinfo } from "@/lib/types";
import { log } from "console";
import { revalidatePath } from "next/cache";
export async function GET(
  req: Request,
  { params }: { params: { userid: string } }
) {
  try {
    const loggedinUser = await currentUser();
    if (!loggedinUser) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 401,
      });
    }
    const user = await prisma.user.findUnique({
      where: { id: params.userid }, //changed here
      select: {
        follower: {
          where: {
            followerid: loggedinUser?.id,
          },
          select: {
            followerid: true,
          },
        },
        _count: {
          select: {
            follower: true,
          },
        },
      },
    });
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const data: Followinfo = {
      followers: user?._count.follower,
      isfollowedbyUser: !!user?.follower.length,
    };
    return Response.json(data);
  } catch (error) {
    console.log("backend error probably", error);
    return Response.json({ error: "internal server error" }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { userid: string } }
) {
  try {
    const userId = params.userid;
    const loggedinUser = await currentUser();
    if (!loggedinUser) {
      console.log("User not found");
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 401,
      });
    }
    await prisma.follow.upsert({
      where: {
        followerid_followingid: {
          followerid: loggedinUser?.id,
          followingid: userId,
        },
      },
      create: {
        followerid: loggedinUser?.id,
        followingid: userId,
      },
      update: {},
    });

    return new Response("HEHE");
  } catch (error) {
    console.log("backend error probably post one", error);
    return Response.json({ error: "internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { userid: string } }
) {
  try {
    const loggedinUser = await currentUser();
    const userId = params.userid;
    if (!loggedinUser) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 401,
      });
    }
    await prisma.follow.deleteMany({
      where: {
        followerid: loggedinUser?.id,
        followingid: userId,
      },
    });

    return new Response();
  } catch (error) {
    console.log("backend error probably post one", error);
    return Response.json({ error: "internal server error" }, { status: 500 });
  }
}
