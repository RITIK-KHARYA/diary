// "use client";
import { CommentData, PostData } from "@/lib/types";
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
} from "../ui/dialog";
import { useDeleteCommentMutation } from "./Mutation";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@radix-ui/react-dialog";
import LoadingButton from "../ui/LoadingButton";
import { Button } from "../ui/button";

interface DeletePostDialogProps {
  comment: CommentData;
  onClose: () => void;
  open: boolean;
}
export default function DeletePostDialog({
  comment,
  onClose,
  open,
}: DeletePostDialogProps) {
  const mutation = useDeleteCommentMutation();
  function handleopenchange(open: boolean) {
    if (!open || !mutation.isPending) {
      onClose();
    }
  }
  return (
    <Dialog open={open} onOpenChange={handleopenchange}>
      <DialogOverlay>
        <DialogContent className="bg-neutral-950 border border-neutral-700/[0.2] p-4 rounded-md flex flex-col space-y-2 cursor-pointer">
          <DialogHeader>
            <DialogTitle>
              <DialogDescription>
                Are you sure you want to delete the particular comment?
              </DialogDescription>
            </DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <LoadingButton
              variant={"destructive"}
              onClick={() =>
                mutation.mutate(comment.id, { onSuccess: onClose })
              }
              loading={mutation.isPending}
            >
              Delete
            </LoadingButton>
            <Button
              disabled={mutation.isPending}
              onClick={onClose}
              variant={"outline"}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
