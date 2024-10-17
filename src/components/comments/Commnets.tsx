import { CommentPage, PostData } from "@/lib/types";
import CommentInput from "./CommentInput";
import { useInfiniteQuery } from "@tanstack/react-query";
import kyInstance from "@/lib/ky";
import { comment } from "postcss";
import Comment from "./Comment";
import { use, useEffect } from "react";

interface commentsProps {
  post: PostData;
}
export default function Comments({ post }: commentsProps) {
  const { data, isFetching, fetchNextPage, status } = useInfiniteQuery({
    queryKey: ["comments", post.id],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          `/api/posts/${post.id}/comments`,
          pageParam ? { searchParams: { cursor: pageParam } } : {}
        )
        .json<CommentPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (firstPage) => {
      return firstPage.previousCursor;
    },
    select: (data) => ({
      pages: [...data.pages],
      pageParams: [...data.pageParams],
    }),
  });

  const comments = data?.pages.flatMap((page) => page.comments) || [];
  // useEffect(() => {
  //   console.log(comments);
  // }, [comments]);
  return (
    <div className="space-y-3">
      <CommentInput post={post} />

      <div className="divide-y-4">
        {comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
    </div>
  );
}
