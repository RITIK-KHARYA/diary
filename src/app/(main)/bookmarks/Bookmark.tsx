"use client";
import { PostData, PostPage } from "@/lib/types";
import { QueryClient, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Loader, Loader2 } from "lucide-react";
import Post from "@/components/posts/Post";
import kyinstance from "@/lib/ky";
import { currentUser } from "@clerk/nextjs/server";
import kyInstance from "@/lib/ky";
import { Button } from "@/components/ui/button";
import InfiniteScrollContainer from "@/components/infiniteScrollcontainer";
import { useEffect } from "react";
import PostsLoadingskeleton from "@/components/posts/PostLoadingskeleton";
import DeletePostDialog from "@/components/posts/DeletePostDialog";
import { ScrollArea } from "@/components/ui/scroll-area";
export default function Bookmark() {
  const {
    data,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
    fetchNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["post-feed", "bookmarks"],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          "/api/posts/bookmarked",
          pageParam ? { searchParams: { cursor: pageParam } } : {}
        )
        .json<PostPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor;
    },
  });

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  if (status === "pending") {
    return <PostsLoadingskeleton />;
  }
  if (status === "success" && !posts.length && !hasNextPage) {
    return (
      <div className="text-muted-foreground text-center">
        you have no bookmarks yet
      </div>
    );
  }

  if (status === "error") {
    return (
      <p className="text-center text-destructive">
        something went wrong while loading the bookmarks.
      </p>
    );
  }
  return (
    <>
      <InfiniteScrollContainer
        classname="space-y-3  "
        onBottomReached={() => hasNextPage && fetchNextPage()}
      >
        <ScrollArea className="h-[calc(100vh-100px)] w-fit px-6 flex flex-col gap-3 ">
          <div className="flex flex-col gap-3 bg-transparent">
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        </ScrollArea>
        <div className="h-4 w-full"></div>
        {isFetchingNextPage && <Loader2 className="mx-auto animate-spin" />}
      </InfiniteScrollContainer>
    </>
  );
}
