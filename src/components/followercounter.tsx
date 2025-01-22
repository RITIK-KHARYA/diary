"use client";
import useFollowerinfo from "@/hooks/useFollowerinfo";
import { Followinfo } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

interface FollowercounterProps {
  initialState: Followinfo; // Corrected spelling
  userid: string;
}

export default function Followercounter({
  initialState, // Corrected spelling
  userid,
}: FollowercounterProps) {
  const { data } = useFollowerinfo(userid, initialState);

  return (
    <span className="text-sm text-muted-foreground">
      Followers:{" "}
      <span className="">
        {formatNumber(data?.followers || 0)}
      </span>
    </span>
  );
}
