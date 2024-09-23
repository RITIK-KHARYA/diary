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
    <span>
      followers:{" "}
      <span className="text-semibold">
        {formatNumber(data?.followers || 0)}
      </span>
    </span>
  );
}
