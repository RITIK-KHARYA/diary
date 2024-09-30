import { Prisma } from "@prisma/client";
import prisma from "./prisma";
import { create } from "domain";

export function getUserDataSelect(loggedInUserId: string) {
  return {
    id: true,
    username: true,
    bio: true,
    displayname: true,
    avatarurl: true,
    createdAt: true,
    email: true,
    follower: {
      where: {
        followerid: loggedInUserId,
      },
      select: {
        followerid: true,
      },
    },
    _count: {
      select: {
        follower: true,
        posts: true,
      },
    },
  };
}

export function getPostDataInclude(loggedinUser: string) {
  return {
    user: {
      select: getUserDataSelect(loggedinUser),
    },
  } satisfies Prisma.PostInclude;
}
export type UserData = Prisma.UserGetPayload<{
  select: ReturnType<typeof getUserDataSelect>;
}>;


export type PostData = Prisma.PostGetPayload<{
  include: ReturnType<typeof getPostDataInclude>;
}>;

export interface PostPage {
  posts: PostData[];
  nextCursor: string | null;
}
export interface Followinfo {
  followers: number;
  isfollowedbyUser: boolean;
}
