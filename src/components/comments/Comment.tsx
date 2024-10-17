import { CommentData } from "@/lib/types";
import UserTooltip from "../UserTooltip";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatRelative } from "date-fns";
import Linkfy from "../Linkfy";

interface CommentProps {
  comment: CommentData;
}
export default function Comment({ comment }: CommentProps) {
  return (
    <div className="flex gap-3 py-3">
      <span className="hidden sm:inline">
        <UserTooltip user={comment.user}>
          <Link href={`/user/${comment.user.id}`} className="">
            <Avatar>
              <AvatarImage src={comment.user.avatarurl || ""} />
              <AvatarFallback>cn</AvatarFallback>
            </Avatar>
          </Link>
        </UserTooltip>
      </span>
      <div>
        <div className="flex gap-3 items-center text-sm">
          <UserTooltip user={comment.user}>
            <Link
              href={`/user/${comment.user.id}`}
              className="font-medium hover:underline"
            >
              {comment.user.displayname}
            </Link>
          </UserTooltip>
          <span className="text-muted-foreground">
            {formatRelative(new Date(comment.createdAt), new Date())}
          </span>
        </div>
        <div className="text-neutral-400">
          <Linkfy>{comment.content}</Linkfy>
        </div>
      </div>
    </div>
  );
}
