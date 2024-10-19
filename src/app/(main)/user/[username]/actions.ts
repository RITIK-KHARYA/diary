"use server";
import { getUserDataSelect } from "@/lib/types";
import { currentUser } from "@clerk/nextjs/server";
import { error } from "console";
import prisma from "@/lib/prisma";
import {
  updateuserprofileValue,
  updateuserprofileschema,
} from "@/lib/Validation";

export default async function updateuserprofile(value: updateuserprofileValue) {
  const validatedvalue = updateuserprofileschema.parse(value);
  const user = await currentUser();

  if (!user) {
    throw new Error("user not found ");
  }

  const updateduser = await prisma.user.update({
    where: {
      id: user.id,
    },
    select: getUserDataSelect(user.id),
    data: validatedvalue,
  });

  return updateduser;
}
