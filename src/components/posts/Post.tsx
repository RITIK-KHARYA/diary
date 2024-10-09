import { Media, Post as Postdata } from "@prisma/client";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { currentUser } from "@clerk/nextjs/server";
import PostMorebutton from "./PostMorebutton";
import { PostData, PostPage } from "@/lib/types";
import { useAuth } from "@clerk/nextjs";
import Linkfy from "../Linkfy";
import UserTooltip from "../UserTooltip";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface PostProps {
  post: PostData;
}

export default function Post({ post }: PostProps) {
  const { userId } = useAuth();
  useEffect(() => {
    console.log("attachment rendered successfully");
  }, []);

  return (
    <article className=" group/post space-y-5 rounded-lg bg-card pb-6 pt-3 px-6 shadow-sm border border-neutral-700/.[0.2] bg-neutral-900 h-fit w-[500px]">
      <div className="flex justify-between gap-3 item-start">
        <div className="flex   gap-5">
          <UserTooltip user={post.user}>
            <Link href={"/"}>
              <Avatar className="">
                <AvatarImage
                  src={post.user.avatarurl || "https://github.com/shadcn.png"}
                ></AvatarImage>
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>
          </UserTooltip>

          <div className="flex flex-col ">
            <div className="flex flex-row   space-x-2 justify-between ">
              <div className="flex flex-row justify-start items-start gap-1 ">
                <span className=" text-muted-foreground  text-xs hover:underline cursor-pointer">
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
                <div className="h-4 w-4  ">
                  <PostMorebutton
                    post={post}
                    classname="opacity-0 group-hover/post:opacity-100 transition-opacity w-4 h-4 rounded-md "
                  />
                </div>
              )}
            </div>
            <Linkfy>
              <div className=" whitespace-pre-line break-words  flex w-[350px] break-all py-3">
                {post.content}
              </div>
              {post.attachments.length > 0 && (
                <MediaPreviews attachments={post.attachments} />
              )}
            </Linkfy>
          </div>
        </div>
      </div>
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
        "flex flex-col gap-3",
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
      <Image
        src={media.url}
        alt="Attachment"
        width={500}
        height={500}
        className="mx-auto size-fit max-h-[30rem] rounded-2xl"
      />
    );
  }

  if (media.type === "VIDEO") {
    return (
      <div>
        <video
          src={media.url}
          controls
          className="mx-auto size-fit max-h-[30rem] rounded-2xl"
        />
      </div>
    );
  }

  return <p className="text-destructive">Unsupported media type</p>;
}
