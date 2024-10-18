"use client";
import { CommentPage, PostData } from "@/lib/types";
import CommentInput from "./CommentInput";
import { useInfiniteQuery } from "@tanstack/react-query";
import kyInstance from "@/lib/ky";
import { comment } from "postcss";
import Comment from "./Comment";
import { use, useEffect } from "react";
import LoadingButton from "../ui/LoadingButton";
import { ScrollArea } from "../ui/scroll-area";
import { Loader2 } from "lucide-react";

interface commentsProps {
  post: PostData;
}
export default function Comments({ post }: commentsProps) {
  const { data, isFetching, fetchNextPage, status, hasNextPage } =
    useInfiniteQuery({
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
  useEffect(() => {
    console.log(hasNextPage);
  }, [hasNextPage]);
  return (
    <div className="space-y-3">
      <CommentInput post={post} />

      <div className="divide-y-4">
        {comments.length > 0 && (
          <p className="text-lg flex items-center justify-center mb-1 font-semibold">
            Comments
          </p>
        )}
        {comments.length > 0 && (
          <ScrollArea className="h-[300px]">
            {comments.map((comment) => (
              <Comment comment={comment} key={comment.id} />
            ))}
            {hasNextPage && (
              <LoadingButton
                loading={isFetching}
                onClick={() => fetchNextPage()}
                disabled={isFetching}
                className="mx-auto text-sm flex"
              >
                Load more comments
              </LoadingButton>
            )}

            {status === "pending" && (
              <Loader2 className="mx-auto text-sm animate-spin" />
            )}
            {status === "success" && !comments.length && (
              <p className="mx-auto text-sm"> there are no comments yet </p>
            )}
            {status === "error" && (
              <p className="mx-auto text-sm font-semibold text-muted-foreground">
                An error occurred while fetching comments
              </p>
            )}
          </ScrollArea>
        )}
      </div>
    </div>
  );
}
