import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { UserData } from "@/lib/types";
import * as zod from "@hookform/resolvers/zod";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "@/components/ui/dialog";
import updateuserprofile from "./actions";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import avatarplaceholder from "@/assets/avatar-placeholder.png";
import {
  updateuserprofileValue,
  updateuserprofileschema,
} from "@/lib/Validation";

import Resizer from "react-image-file-resizer";
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
import { useEffect, useRef, useState } from "react";
import { Camera } from "lucide-react";
import CropimageDialog from "@/components/CropimageDialog";
import { Button } from "@/components/ui/button";
import { submitpost } from "@/components/posts/editor/actions";
import LoadingButton from "@/components/ui/LoadingButton";

interface EditprofileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserData;
}
export default function ({ open, onOpenChange, user }: EditprofileDialogProps) {
  const form = useForm<updateuserprofileValue>({
    resolver: zodResolver(updateuserprofileschema),
    defaultValues: {
      displayname: user.displayname,
      bio: user.bio || "",
    },
  });
  const [croppedavatar, setcroppedavatar] = useState<Blob | null>(null);
  const mutation = useUpdateProfileMutation();
  async function onsubmit(values: updateuserprofileValue) {
    const newAvatarfile = croppedavatar
      ? new File([croppedavatar], `avatar_.${user.id}.webp`)
      : undefined;
    console.log(newAvatarfile);

    mutation.mutate(
      {
        values,
        avatar: newAvatarfile,
      },
      {
        onSuccess: () => {
          setcroppedavatar(null);
          onOpenChange(false);
        },
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center">
          <Avatarinput
            src={
              croppedavatar
                ? URL.createObjectURL(croppedavatar)
                : user.avatarurl || avatarplaceholder
            }
            onimagacropped={setcroppedavatar}
          />
        </div>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onsubmit)}>
            <FormField
              control={form.control}
              name={"displayname"}
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
            />
            <DialogFooter>
              <LoadingButton type="submit" loading={mutation.isPending}>
                Save
              </LoadingButton>
            </DialogFooter>
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
    if (!image) return;
    setimagetocropped(image);

    Resizer.imageFileResizer(
      image,
      1024,
      1024,
      "WEBP",
      100,
      0,
      (uri) => setimagetocropped(uri as File),

      "file"
    );
  }
  function onImageCropped(e: React.ChangeEvent<HTMLInputElement>) {
    onImageSelected(e.target.files?.[0]);
  }
  useEffect(() => {
    console.log(imagetocrop);
    console.log(fileInputRef.current?.files);
    console.log(fileInputRef.current?.value);
  }, [imagetocrop]);
  return (
    <>
      <input
        className="hidden sr-only"
        type="file"
        ref={fileInputRef}
        onChange={onImageCropped}
        accept="image/*"
      />
      <button
        className="group relative block"
        type="button"
        onClick={() => fileInputRef.current?.click()}
      >
        <Image
          src={src}
          alt="avatar"
          width={150}
          height={150}
          className=" flex-none size-32 object-cover rounded-full"
        />
        <span className="flex inset-0 absolute size-12 items-center justify-center rounded-full m-auto opacity-90 bg-black/35 text-white  group-hover:opacity-25 ">
          <Camera size={24} />
        </span>
      </button>

      {imagetocrop && (
        <CropimageDialog
          image={URL.createObjectURL(imagetocrop)}
          aspectratioimage={1}
          onCropped={(blob) => onimagacropped(blob)}
          onClose={() => {
            setimagetocropped(undefined);
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
          }}
        />
      )}
    </>
  );
}
