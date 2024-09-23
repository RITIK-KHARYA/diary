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

interface userpostprops {
  userid: string;
}

export default function Userpost({ userid }: userpostprops) {
  const {
    data,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
    fetchNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["post-feed", "user-post", userid],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          `/api/user/${userid}/posts`,
          pageParam ? { searchParams: { cursor: pageParam } } : {}
        )
        .json<PostPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => {
      return lastPage.nextcursor;
    },
  });

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  if (status === "pending") {
    return <PostsLoadingskeleton />;
  }
  if (status === "success" && !posts.length && !hasNextPage) {
    return (
      <div className="text-muted-foreground text-center">
        <p>No posts found</p>
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
    <>
      {/* <DeletePostDialog post={posts[0]} open onClose={() => {}} /> */}
      <InfiniteScrollContainer
        classname="space-y-3  "
        onBottomReached={() => hasNextPage && fetchNextPage()}
      >
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}

        {isFetchingNextPage && <Loader2 className="mx-auto animate-spin" />}
      </InfiniteScrollContainer>
    </>
  );
}
