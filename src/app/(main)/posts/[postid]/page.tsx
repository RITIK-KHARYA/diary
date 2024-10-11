// import FollowerButton from "@/components/FollowerButton";
// import UserTooltip from "@/components/UserTooltip";
// import Followercounter from "@/components/followercounter";
// import Post from "@/components/posts/Post";
// import { Avatar, AvatarImage } from "@/components/ui/avatar";
// import prisma from "@/lib/prisma";
// import { UserData, getPostDataInclude, getUserDataSelect } from "@/lib/types";
// import { useAuth } from "@clerk/nextjs";
// import { currentUser } from "@clerk/nextjs/server";
// import { Link, Loader2 } from "lucide-react";
// import { getDisplayName } from "next/dist/shared/lib/utils";
// import { notFound } from "next/navigation";
// import { title } from "process";
// import { Suspense, cache } from "react";

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
//   console.log(post);
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
//   const user = await currentUser();

//   if (!user)
//     return (
//       <p className="text-center text-destructive text-lg ">
//         You are not logged in
//       </p>
//     );
//   const post = await getPost(postid, user.id);
//   return (
//     <main className="flex w-full min-w-0 gap-5 justify-center py-8 ">
//       <div className="">
//         <Post post={post} />
//       </div>
//       <div className="hidden top-[5.5rem] sticky h-fit w-80 flex-none lg:block">
//         <Suspense fallback={<Loader2 className="mx-auto"></Loader2>}>
//           <Userinfosidebar user={post.user} />
//         </Suspense>
//       </div>
//     </main>
//   );
// }

// interface Userinfosidebarprops {
//   user: UserData;
// }
// async function Userinfosidebar({ user }: Userinfosidebarprops) {
//   const people = await currentUser();
//   if (!people) return null;
//   return (
//     <div className="bg-card p-5 shadow-sm rounded-2xl space-x-5">
//       <div className="text-xl font-bold"> About this user </div>
//       <UserTooltip user={user}>
//         <Link href={`/user/${user.id}`} className="flex items-center gap-2">
//           <Avatar>
//             <AvatarImage src={user.avatarurl || ""} className="flex-none" />
//           </Avatar>
//           <div>
//             <p className="text-md line-clamp break-all font-semibold hover:underline">
//               {user.displayname}
//             </p>

//             <p className=" hover:underline line-clamp-1 text-muted-foreground">
//               @{user.username}
//             </p>
//           </div>
//         </Link>
//       </UserTooltip>
//       <div>
//         <p className="line-clamp-6 break-words text-muted-foreground whitespace-pre-line ">
//           {user.bio}
//         </p>
//           </div>
//           {user.id !== people.id && <FollowerButton userid={user.id} intialstate={
//               Followercounter: {
//                 followers: user._count.follower,
//               },
//               isfollowedbyUser:
//           } />}
//     </div>
//   );
// }
