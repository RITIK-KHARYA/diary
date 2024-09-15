import {
  InfiniteData,
  QueryClient,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import deletePost from "./actions";
import { useToast } from "../ui/use-toast";
import { PostData, PostPage } from "@/lib/types";
import { usePathname, useRouter } from "next/navigation";

export default function useDeletePostMdutation() {
  const { toast } = useToast();
  const router = useRouter();
  const queryclient = useQueryClient();
  const pathname = usePathname();
  const mutation = useMutation({
    mutationFn: deletePost,
    onError: (error) => {
      toast({
        variant: "destructive",
        description: "something went wrong while deleting the post ",
      });
    },
    onSuccess: async (deletedPost) => {
      console.log("deleted the post");
      const queryFilter: QueryFilters = {
        queryKey: ["post-feed"],
      };
      await queryclient.cancelQueries(queryFilter);
      queryclient.setQueriesData<InfiniteData<PostPage, string | null>>(
        queryFilter,
        (olddata) => {
          if (!olddata) {
            return;
          }

          return {
            pageParams: olddata.pageParams,
            pages: olddata.pages.map((page) => ({
              nextcursor: page.nextcursor, //yeha todha kaam smjh aaya//
              posts: page.posts.filter((post) => post.id !== deletedPost.id),
            })),
          };
        }
      );
      toast({
        description: "post deleted",
      });
      if (pathname === `/post/${deletedPost.id}`) {
        router.push(`/user/${deletedPost.user.username}`); //deletedpost id pencho phle kaise agai//
      }
    },
  });
  return mutation;
}
