import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { cache } from "react";

export const getUser = cache(async () => {
  const user = await currentUser();
  if (!user) {
    return;
  }
  const me = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });
  return me;
});
