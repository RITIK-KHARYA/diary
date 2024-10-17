import { Prisma } from "@prisma/client";
import prisma from "./prisma";
import { create } from "domain";
import { userAgent } from "next/server";
import { Bookmark } from "lucide-react";

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

export function getPostDataInclude(loggedInUserId: string) {
  return {
    user: {
      select: getUserDataSelect(loggedInUserId), //yeha loggedinuserid h keep in mind
    },
    attachments: true,
    likes: {
      where: {
        userId: loggedInUserId, //changed here check it out later by the author for the author
      },
      select: {
        userId: true,
      },
    },
    bookmark: {
      where: {
        userId: loggedInUserId,
      },
      select: {
        userId: true,
      },
    },
    _count: {
      select: {
        likes: true,
        comment: true,
      },
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

export function getCommentDataInclude(loggedInUserId: string) {
  return {
    user: {
      select: getUserDataSelect(loggedInUserId),
    },
  } satisfies Prisma.CommentInclude;
}

export type CommentData = Prisma.CommentGetPayload<{
  include: ReturnType<typeof getCommentDataInclude>;
}>;

export interface CommentPage {
  comments: CommentData[];
  previousCursor: string | null;
}

export interface Followinfo {
  followers: number;
  isfollowedbyUser: boolean;
}
export interface Likeinfo {
  likes: number;
  islikedbyUser: boolean;
}
export interface Bookmarkinfo {
  isbookmarkedbyUser: boolean;
}