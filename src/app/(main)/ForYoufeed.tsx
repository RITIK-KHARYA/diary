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
export default function ForYoufeed() {
  const {
    data,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
    fetchNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["post-feed", "for-you"],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          "/api/posts/for-you",
          pageParam ? { searchParams: { cursor: pageParam } } : {}
        )
        .json<PostPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextcursor,
  });

  const posts = data?.pages.flatMap((page) => page.posts) ?? []; //bc ahhi toh kahi post bana tha firse kaha se agyaa
  // ek toh saala ye type smjh nhi aarha postpage banaya kyu and post ka type woh kyu h
  useEffect(() => {
    console.log(data);
  }, [data]);

  if (status === "pending") {
    return <PostsLoadingskeleton />;
  }
  if (status === "success" && !posts.length && !hasNextPage) {
    return (
      <div className="text-muted-foreground text-center">
        No one has post anything yet
      </div>
    );
  }

  if (status === "error") {
    return (
      <p className="text-center text-destructive">
        something went wrong while loading the posts
      </p>
    );
  }
  return (
    <InfiniteScrollContainer
      classname="space-y-4 "
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}

      {isFetchingNextPage && <Loader2 className="mx-auto animate-spin" />}
    </InfiniteScrollContainer>
  );
}
