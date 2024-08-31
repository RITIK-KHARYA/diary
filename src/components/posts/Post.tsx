import { Post as Postdata } from "@prisma/client";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

interface PostProps {
  post: Postdata & {
    user: {
      displayname: string;
      avatarurl: string | null;
    };
  };
}

export default function Post({ post }: PostProps) {
  return (
    <article className=" space-y-3 rounded-2xl bg-card p-6 shadow-sm border border-neutral-700/.[0.2] bg-neutral-900 h-fit">
      <div className="flex   gap-5">
        <Link href={`/user/${post.user.displayname}`}>
          <Avatar>
            <AvatarImage
              src={post.user.avatarurl || "https://github.com/shadcn.png"}
            ></AvatarImage>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex flex-col">
          <div className="flex flex-row space-x-2">
            <span className=" text-muted-foreground text-sm ">
              {post.user.displayname}
            </span>

            <span className="text-muted-foreground text-sm">
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>
          <div className=" whitespace-pre-line break-words  flex w-[400px] break-all">
            {post.content}
          </div>
        </div>
      </div>
    </article>
  );
}
