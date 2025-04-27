"use client";

import { Media, Post as Postdata } from "@prisma/client";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import PostMorebutton from "./PostMorebutton";
import { PostData } from "@/lib/types";
import { useAuth } from "@clerk/nextjs";
import Linkfy from "../Linkfy";
import UserTooltip from "../UserTooltip";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";
import LikeButton from "./LikeButton";
import BookmarkButton from "./BookmarkButton";
import { MessageSquare } from "lucide-react";
import Comments from "../comments/Commnets";

interface PostProps {
  post: PostData;
}

export default function Post({ post }: PostProps) {
  const { userId } = useAuth();
  const [showcomments, setshowcomments] = useState(false);

  return (
    <article className="group/post space-y-3 sm:space-y-5 rounded-lg bg-card py-3 px-3 sm:pb-6 sm:pt-3 sm:px-6 shadow-sm border border-neutral-700/.[0.2] bg-neutral-900 h-fit w-full">
      <div className="flex justify-between gap-2 sm:gap-3 item-start w-full">
        <div className="flex gap-2 sm:gap-5 w-full">
          <UserTooltip user={post.user}>
            <Link href={"/"}>
              <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                <AvatarImage
                  src={post.user.avatarurl || "https://github.com/shadcn.png"}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>
          </UserTooltip>

          <div className="flex flex-col w-full min-w-0">
            <div className="flex flex-row space-x-2 justify-between">
              <div className="flex flex-row justify-start items-start gap-1 flex-wrap">
                <span className="text-muted-foreground text-xs hover:underline cursor-pointer">
                  @{post.user.displayname}
                </span>

                <span className="text-muted-foreground text-xs">•</span>
                <span className="text-muted-foreground text-xs">
                  {formatDistanceToNow(new Date(post.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>

              {post.user.id === userId && (
                <div className="h-4 w-4">
                  <PostMorebutton
                    post={post}
                    classname="opacity-0 group-hover/post:opacity-100 transition-opacity w-4 h-4 rounded-md"
                  />
                </div>
              )}
            </div>

            <Linkfy>
              <div className="whitespace-pre-line break-words flex w-full py-2 sm:py-3 text-sm sm:text-base">
                <Link
                  href={`/posts/${post.id}`}
                  suppressHydrationWarning={true}
                  className="w-full"
                >
                  {post.content}
                </Link>
              </div>

              {post.attachments.length > 0 && (
                <MediaPreviews attachments={post.attachments} />
              )}

              <div className="flex justify-between items-center mt-3 sm:mt-4 text-xs sm:text-sm">
                <LikeButton
                  postid={post.id}
                  intialState={{
                    likes: post._count.likes,
                    islikedbyUser: post.likes.some((l) => l.userId === userId),
                  }}
                />
                <BookmarkButton
                  postid={post.id}
                  intialState={{
                    isbookmarkedbyUser: post.bookmark.some(
                      (bookmark) => bookmark.userId === userId
                    ),
                  }}
                />
                <CommentButton
                  onClick={() => setshowcomments(!showcomments)}
                  post={post}
                />
              </div>
            </Linkfy>
          </div>
        </div>
      </div>
      {showcomments && <Comments post={post} />}
    </article>
  );
}

interface MediaPreviewsProps {
  attachments: Media[];
}

function MediaPreviews({ attachments }: MediaPreviewsProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 sm:gap-3 mt-2",
        attachments.length > 1 && "sm:grid sm:grid-cols-2"
      )}
    >
      {attachments.map((m) => (
        <MediaPreview key={m.id} media={m} />
      ))}
    </div>
  );
}

interface MediaPreviewProps {
  media: Media;
}

function MediaPreview({ media }: MediaPreviewProps) {
  if (media.type === "IMAGE") {
    return (
      <div className="relative w-full">
        <Image
          src={media.url}
          alt="Attachment"
          width={500}
          height={500}
          className="w-full h-auto max-h-48 sm:max-h-96 object-contain rounded-lg sm:rounded-2xl"
          suppressHydrationWarning
        />
      </div>
    );
  }

  if (media.type === "VIDEO") {
    return (
      <div className="w-full">
        <video
          src={media.url}
          controls
          className="w-full max-h-48 sm:max-h-96 rounded-lg sm:rounded-2xl"
        />
      </div>
    );
  }

  return <p className="text-destructive">Unsupported media type</p>;
}

interface commentsbuttonprops {
  onClick: () => void;
  post: PostData;
}

function CommentButton({ onClick, post }: commentsbuttonprops) {
  return (
    <button className="flex items-center gap-1 sm:gap-2" onClick={onClick}>
      <MessageSquare className="size-4 sm:size-5" />
      <span className="text-xs sm:text-sm tabular-nums text-foreground">
        {post._count.comment} <span className="hidden sm:inline">Comments</span>
      </span>
    </button>
  );
}
