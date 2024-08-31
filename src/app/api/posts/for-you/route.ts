import { currentUser } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";

export default async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const posts = await prisma.post.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(posts);
  } catch (error) {
    console.error("there is interal error", error), { status: 500 };
  }
}
