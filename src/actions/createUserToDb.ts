import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function createUserToDb() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (existingUser) {
    return existingUser;
  }


  const newUser = await prisma.user.create({
    data: {
      id: user.id,
      username: user.username ?? "",
      displayname: user.firstName + " " + user.lastName,
      email: user.emailAddresses[0].emailAddress,
      avatarurl: user.imageUrl,
    },
  });
  return newUser;
}
