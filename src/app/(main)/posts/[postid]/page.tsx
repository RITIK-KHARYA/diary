// import prisma from "@/lib/prisma";
// import { getPostDataInclude, getUserDataSelect } from "@/lib/types";
// import { useAuth } from "@clerk/nextjs";
// import { currentUser } from "@clerk/nextjs/server";
// import { getDisplayName } from "next/dist/shared/lib/utils";
// import { notFound } from "next/navigation";
// import { title } from "process";
// import { cache } from "react";

// interface pageprops {
//   params: { postid: string };
// }
// const getPost = cache(async (postid: string, loggedinuser: string) => {
//   const post = await prisma.post.findUnique({
//     where: {
//       id: postid,
//     },
//     include: getPostDataInclude(loggedinuser),
//   });
//   if (!post) notFound();
//   return post;
// });
// export async function generateMetadara({ params: { postid } }: pageprops) {
//   const user = await currentUser();
//   if (!user) return {};
//   const post = await getPost(postid, user.id);
//   if (!post) notFound();
//   return {
//     title: `${post.user.displayname}: ${post.content.slice(0, 50)}...`,
//   };
// }

// export default async function Page({ params: { postid } }: pageprops) {
//     const user = await currentUser();
//     return (

//     )
// }
