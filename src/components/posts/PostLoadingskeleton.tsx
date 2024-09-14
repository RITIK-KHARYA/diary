import { Skeleton } from "../ui/skeleton";

export default function PostsLoadingskeleton() {
  return (
    <div>
      <PostLoadingskeleton />
      <PostLoadingskeleton />
      <PostLoadingskeleton />
    </div>
  );
}

function PostLoadingskeleton() {
  return (
    <div className="space-y-3 animate-pulse w-full bg-card p-5 shadow-sm">
      <div className="flex flex-wrap gap-5">
        <Skeleton className="size-12 rounded-full" />
        <div className="space-y-1.5">
          <Skeleton className="w-24 h-4 rounded" />
          <Skeleton className="w-30 h-4 rounded" />
        </div>
      </div>
      <Skeleton className=" h-16 rounded" />
    </div>
  );
}
