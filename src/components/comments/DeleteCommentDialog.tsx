import { CommentPage } from "@/lib/types";
import { Dialog } from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

interface DeleteCommentDialogprops {
  comment: CommentPage;
  open: boolean;
  close: () => void;
}
export default function DeleteCommentDialog({
  comment,
  open,
  close,
}: DeleteCommentDialogprops) {
  return (
    <div>
      <Dialog>
        <DialogTitle></DialogTitle>
      </Dialog>
    </div>
  );
}
