import { PostData } from "@/lib/types";

interface commentsProps {
  post: PostData;
}
export default function Comments({ post }: commentsProps) {
  return <div>comments</div>;
}
