import { currentUser } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";
import { getUserDataSelect } from "@/lib/types";

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  const loggedinuser = await currentUser();

  try {
    if (!loggedinuser) {
      return Response.json({ error: "User not found" }, { status: 401 });
    }
    const user = await prisma.user.findFirst({
      where: {
        username: {
          mode: "insensitive",
          equals: params.username,
        },
      },
      select: getUserDataSelect(loggedinuser.id),
    });
    return Response.json(user);
  } catch (error) {
    return Response.json({ error: "internal server error" }, { status: 500 });

  }
}
