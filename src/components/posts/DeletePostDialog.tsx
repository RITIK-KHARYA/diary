import { PostData } from "@/lib/types";

interface DeletePostDialogProps {
  post: PostData;
  onClose: () => void;
  open: boolean;
}
export default function DeletePostDialog({
  post,
  onClose,
  open,
}: DeletePostDialogProps) {
  return <></>;
}
