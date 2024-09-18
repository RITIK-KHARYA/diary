import kyInstance from "@/lib/ky";
import { Followinfo } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function useFollowerinfo(
  userid: string,
  intialState: Followinfo //intialstate toh interface h uska intialstate se kya kaam i mean woh usko type btyega n rather than the value of the number of the followers
) {
  const query = useQuery({
    queryKey: ["followerinfo", userid], //yeha bhi todha kaam smjh aaya
    queryFn: () =>
      kyInstance.get(`/api/posts/user/${userid}/follower`).json<Followinfo>(),
    initialData: intialState,
    staleTime: Infinity,
  });
  return query;
}
