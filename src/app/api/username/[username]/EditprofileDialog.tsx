import { DialogHeader } from "@/components/ui/dialog";
import { UserData } from "@/lib/types";
import * as zod from "@hookform/resolvers/zod";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "@/components/ui/dialog";
import updateuserprofile from "./actions";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import {
  updateuserprofileValue,
  updateuserprofileschema,
} from "@/lib/Validation";
import Image from "next/image";
import { useUpdateProfileMutation } from "./mutation";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { StaticImageData } from "next/image";
import { useRef, useState } from "react";

interface EditprofileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserData;
}
export default function ({ open, onOpenChange, user }: EditprofileDialogProps) {
  const form = useForm<updateuserprofileValue>({
    resolver: zodResolver(updateuserprofileschema),
    defaultValues: {
      displayName: user.displayname,
      bio: user.bio || "",
    },
  });
  const mutation = useUpdateProfileMutation();
  async function onsubmit(value: updateuserprofileValue) {
    //implement latte
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onsubmit)}>
            <FormField
              control={form.control}
              name={"displayName"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display name</FormLabel>
                  <FormControl>
                    <Input placeholder="write your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"bio"}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <textarea
                      placeholder="write about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

interface Avatarinputprops {
  src: string | StaticImageData;
  onimagacropped: (Blob: Blob | null) => void;
}

export function Avatarinput({ src, onimagacropped }: Avatarinputprops) {
  const [imagetocrop, setimagetocropped] = useState<File>();

  const fileInputRef = useRef<HTMLInputElement>(null);

  function onImageSelected(image: File | undefined) {
    if (!image) {
      return;

      // pending site for the image validation
    }
  }
  return (
    <>
      <input
        className="hidden sr-only"
        type="button "
        onChange={(e) => onImageSelected(e.target.files?.[0])}
        accept="image/*"
      />
      <button
        className="group relative block"
        type="button"
        onClick={() => fileInputRef.current?.click()}
      />
      <Image
        src={src}
        alt="avatar"
        width={150}
        height={150}
        className=" flex-none size-32 object-cover rounded-full "
      />
    </>
  );
}