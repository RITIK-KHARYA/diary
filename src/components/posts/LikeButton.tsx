"use client";
import { Likeinfo } from "@/lib/types";

import { useToast } from "../ui/use-toast";
import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import kyInstance from "@/lib/ky";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface LikeButtonProps {
  intialState: Likeinfo;
  postid: string;
}

export default function LikeButton({ intialState, postid }: LikeButtonProps) {
  console.log(postid);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const queryKey: QueryKey = ["like-info", postid];
  const { data } = useQuery({
    queryKey,
    queryFn: () =>
      kyInstance.get(`/api/posts/${postid}/likes`).json<Likeinfo>(),
    staleTime: Infinity,
    initialData: intialState,
  });
  const mutate = useMutation({
    mutationFn: () =>
      data.islikedbyUser
        ? kyInstance.delete(`/api/posts/${postid}/likes`)
        : kyInstance.post(`/api/posts/${postid}/likes`),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      const previousState = queryClient.getQueryData<Likeinfo>(queryKey);
      queryClient.setQueryData<Likeinfo>(queryKey, () => ({
        likes:
          (previousState?.likes || 0) + (previousState?.islikedbyUser ? -1 : 1),
        islikedbyUser: !previousState?.islikedbyUser, //yeha query update hogyi h
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
      <Heart
        className={cn(
          "size-5",
          data.islikedbyUser && "fill-red-500 text-red-500"
        )}
      />
      <span className="text-sm font-medium tabular-nums">
        {data.likes} <span className="hidden sm:inline">likes</span>
      </span>
    </button>
  );
}
