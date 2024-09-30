"use client";

import { Button } from "@/components/ui/button";
import { UserData } from "@/lib/types";
import { useState } from "react";
import EditprofileDialog from "./EditprofileDialog";

interface EditProfileButtonProps {
  user: UserData;
}

export default function EditProfileButton({ user }: EditProfileButtonProps) {
  const [showdialog, setshowdialog] = useState(false);
  return (
    <>
      <Button
        className="bg-green-500/45"
        variant="outline"
        onClick={() => setshowdialog(true)}
      >
        Edit Profile
      </Button>
      <EditprofileDialog
        open={showdialog}
        onopenchange={setshowdialog}
        user={user}
      />
    </>
  );
}
