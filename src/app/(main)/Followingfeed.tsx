"use client";
import { PostPage } from "@/lib/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Post from "@/components/posts/Post";
import kyInstance from "@/lib/ky";
import InfiniteScrollContainer from "@/components/infiniteScrollcontainer";
import PostsLoadingskeleton from "@/components/posts/PostLoadingskeleton";
import DeletePostDialog from "@/components/posts/DeletePostDialog";
export default function Followingfeed() {
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage, status } =
    useInfiniteQuery({
      queryKey: ["post-feed", "followingfeed"],
      queryFn: ({ pageParam }) =>
        kyInstance
          .get(
            "/api/posts/following",
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
        start following people to see their posts
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
