import { useToast } from "@/components/ui/use-toast";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { submitpost } from "./actions";
import { PostPage } from "@/lib/types";
import { QueryFilters } from "@tanstack/react-query";
export default function useSubmitpostMutation() {
  const queryclient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: submitpost,
    onSuccess: async (newpost) => {
      const queryFilter: QueryFilters = {
        queryKey: ["post-feed", "for-you"],
      };

      await queryclient.cancelQueries(queryFilter);


      queryclient.setQueriesData<InfiniteData<PostPage, string | null>>(
        queryFilter,
        (olddata) => {
          const firstpage = olddata?.pages[0];
          if (!firstpage) {
            return olddata;
          }
          if (firstpage) {
            return {
              pageParams: olddata?.pageParams,
              pages: [
                {
                  posts: [newpost, ...firstpage.posts],
                  nextCursor: firstpage.nextCursor,
                },
                ...olddata?.pages.slice(1),
              ],
            };
          }
        }
      );
      toast({
        description: "post created",
      });
    },

    onError: () => {
      console.log("error");
      toast({
        variant: "destructive",
        description: "maa chud gyi backend ki",
      });
    },
  });
  return mutation;
}
