import { Prisma } from "@prisma/client";
import prisma from "./prisma";

export function getUserDataSelect(loggedInUserId: string) {
  return {
    id: true,
    username: true,
    displayname: true,
    avatarurl: true,
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

export type PostData = Prisma.PostGetPayload<{
  include: ReturnType<typeof getPostDataInclude>;
}>;

export interface PostPage {
  posts: PostData[];
  nextcursor: string | null;
}
export interface Followinfo {
  followers: number;
  isfollowedbyUser: boolean;
}
