import kyInstance from "@/lib/ky";
import { Followinfo } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function useFollowerinfo(
  userid: string,
  intialState: Followinfo //intialstate toh interface h uska intialstate se kya kaam i mean woh usko type btyega n rather than the value of the number of the followers
) {
  const query = useQuery({
    queryKey: ["follower-info", userid], //yeha bhi todha kaam smjh aaya
    queryFn: async () => {
      console.log("inside hererere");
      const res = await fetch(`/api/posts/user/${userid}/follower`, {
        method: "GET",
      });
      const data = await res.json();
      return data;
    },
    initialData: intialState,
    staleTime: Infinity,
  });
  console.log("hehe", query.data);
  return query;
}
