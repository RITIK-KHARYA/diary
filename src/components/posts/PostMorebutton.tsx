import { PostData } from "@/lib/types";
import DeletePostDialog from "./DeletePostDialog";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal, Trash2 } from "lucide-react";

interface PostMorebuttonProps {
  post: PostData;
  classname: string;
}
export default function PostMorebutton({
  post,
  classname,
}: PostMorebuttonProps) {
  const [showdeletedialog, setshowdeletedialog] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className={classname} size="icon">
            <MoreHorizontal className="size-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setshowdeletedialog(true)}>
            <span className="flex text-destructive items-center justify-center gap-3 shadow-xl rounded-md bg-card w-[100px] h-[40px] border-gray-700 border-2">
              <Trash2 className="size-4" />
              Delete
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeletePostDialog
        post={post}
        open={showdeletedialog}
        onClose={() => {
          setshowdeletedialog(false);
        }}
      />
    </>
  );
}
