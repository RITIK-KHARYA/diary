"use client";
import { Bookmarkinfo, Likeinfo } from "@/lib/types";

import { useToast } from "../ui/use-toast";
import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import kyInstance from "@/lib/ky";
import { Bookmark, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface BookmarkButtonProps {
  intialState: Bookmarkinfo;
  postid: string;
}

export default function BookmarkButton({
  intialState,
  postid,
}: BookmarkButtonProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const queryKey: QueryKey = ["bookmark-info", postid];
  const { data } = useQuery({
    queryKey,
    queryFn: () =>
      kyInstance.get(`/api/posts/${postid}/bookmark`).json<Bookmarkinfo>(),
    staleTime: Infinity,
    initialData: intialState,
  });
  const mutate = useMutation({
    mutationFn: () =>
      data.isbookmarkedbyUser
        ? kyInstance.delete(`/api/posts/${postid}/bookmark`)
        : kyInstance.post(`/api/posts/${postid}/bookmark`),
    onMutate: async () => {
      toast({
        description: `Post has been ${
          data.isbookmarkedbyUser ? "un" : ""
        }bookmarked`,
      });
      await queryClient.cancelQueries({ queryKey });
      const previousState = queryClient.getQueryData<Bookmarkinfo>(queryKey);
      queryClient.setQueryData<Bookmarkinfo>(queryKey, () => ({
        isbookmarkedbyUser: !previousState?.isbookmarkedbyUser, //yeha query update hogyi h
      }));
      return { previousState };
    },
    onError(error, variables, context) {
      queryClient.setQueryData(queryKey, context?.previousState);
      console.error(error);
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again.",
      });
    },
  });
  return (
    <button onClick={() => mutate.mutate()} className="flex items-center gap-2">
      <Bookmark
        className={cn(
          "size-5",
          data.isbookmarkedbyUser && "fill-blue-500 text-blue-500"
        )}
      />
    </button>
  );
}
