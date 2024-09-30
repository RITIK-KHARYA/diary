import { DialogHeader } from "@/components/ui/dialog";
import { UserData } from "@/lib/types";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";

import { Dialog } from "@/components/ui/dialog";

interface EditprofileDialogProps {
  open: boolean;
  onopenchange: (open: boolean) => void;
  user: UserData;
}
export default function ({ open, onopenchange, user }: EditprofileDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onopenchange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
