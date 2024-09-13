"use client";
import { PostData, PostPage } from "@/lib/types";
import { QueryClient, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Loader, Loader2 } from "lucide-react";
import Post from "@/components/posts/Post";
import kyinstance from "@/lib/ky";
import { currentUser } from "@clerk/nextjs/server";
import kyInstance from "@/lib/ky";
import { Button } from "@/components/ui/button";

export default function ForYoufeed() {
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage, status } =
    useInfiniteQuery({
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

  if (status === "pending") {
    return <Loader2 className="mx-auto animate-spin" />;
  }
  if (status === "error") {
    return (
      <p className="text-center text-destructive">
        something went wrong while loading the posts
      </p>
    );
  }
  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      <Button onClick={() => fetchNextPage()}>load more</Button>
    </>
  );
}
