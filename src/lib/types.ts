import { Prisma } from "@prisma/client";
import prisma from "./prisma";

export const Userdataselect = {
  id: true,
  username: true,
  displayname: true,
  avatarurl: true,
  email: true,
} satisfies Prisma.UserSelect;

export const Postdataselect = {
  user: {
    select: Userdataselect,
  },
} satisfies Prisma.PostSelect;

export type PostData = Prisma.PostGetPayload<{
  include: typeof Postdataselect;
}>;

export interface PostPage {
  posts: PostData[];
  nextcursor: string | null;
}
