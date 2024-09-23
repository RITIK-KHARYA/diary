"use client";
import kyInstance from "@/lib/ky";
import { Followinfo } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function useFollowerInfo(
  userId: string,
  initialState: Followinfo
) {
  const query = useQuery({
    queryKey: ["follower-info", userId],
    queryFn: () =>
      kyInstance.get(`/api/users/${userId}/followers`).json<Followinfo>(),
    initialData: initialState,
    staleTime: Infinity,
  });

  return query;
}
