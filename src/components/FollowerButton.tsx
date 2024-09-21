"use client";

import { Followinfo } from "@/lib/types";
import { useToast } from "./ui/use-toast";
import { use, useEffect } from "react";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { Ghost } from "lucide-react";

import useFollowerinfo from "@/hooks/useFollowerinfo";
import kyInstance from "@/lib/ky";
import { useRouter } from "next/navigation";

interface FollowerButtonProps {
  userid: string;
  intialstate: Followinfo;
}

export default function FollowerButton({
  userid,
  intialstate,
}: FollowerButtonProps) {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const { data } = useFollowerinfo(userid, intialstate);

  const queryKey: QueryKey = ["follower-info", userid];
  const querykey: QueryKey = ["follower-info", userid];

  const { mutate } = useMutation({
    mutationFn: () =>
      data.isfollowedbyUser
        ? kyInstance.delete(`/api/posts/user/${userid}/follower`)
        : kyInstance.post(`/api/posts/user/${userid}/follower`),
    onMutate: async () => {
      queryClient.cancelQueries({ queryKey });
      const previousState = queryClient.getQueryData<Followinfo>(querykey);

      queryClient.setQueryData<Followinfo>(querykey, () => ({
        followers:
          (previousState?.followers || 0) + (data.isfollowedbyUser ? -1 : 1),
        isfollowedbyUser: !previousState?.isfollowedbyUser,
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
    <Button
      variant={data.isfollowedbyUser ? "secondary" : "default"}
      onClick={() => mutate()}
    >
      {data.isfollowedbyUser ? "Unfollow" : "Follow"}
    </Button>
  );
}
