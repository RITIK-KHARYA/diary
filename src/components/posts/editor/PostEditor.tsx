"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Placeholder } from "@tiptap/extension-placeholder";
import { submitpost } from "./actions";
import LoadingButton from "../../ui/LoadingButton";
import { Button } from "@/components/ui/button";
import "./style.css";
import useSubmitpostMutation from "./Mutation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMutation } from "@tanstack/react-query";
import useMediaUpload from "./useMediaUpload";
import { useRef } from "react";
import { ImageIcon, icons } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";


// interface SubmitPostMutation {
//   mutate: (input: string, options: any) => void;
// }
export default function PostEditor(avatar: { avatar: string }) {
  const mutation = useSubmitpostMutation();
  const avatarurl = avatar.avatar;
  const {
    startUpload: handleStartUpload,
    attachment,
    isUploading,
    uploadProgress,
    removeAttachment,
    reset: resetMedia,
  } = useMediaUpload();
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        italic: false,
        bold: false,
      }),
      Placeholder.configure({
        placeholder: "What's on your mind...",
      }),
    ],
  });

  const input =
    editor?.getText({
      blockSeparator: "\n",
    }) || "";

  function onSubmit() {
    mutation.mutate(
      {
        content: input,
        mediaIds: attachment.map((a) => a.mediaIds).filter(Boolean) as string[],
      },
      {
        onSuccess: () => {
          console.log("success");
          editor?.commands.clearContent();
          resetMedia();
        },
      }
    );
    editor?.commands.clearContent();
  }
  return (
    // w-[calc(100%-20px)]
    <div className="flex w-full flex-col gap-5 rounded-md  p-2 shadow-lg bg-opacity-35 bg-neutral-900/90 justify-center ">
      <div className="w-full flex space-x-2 ">
        <Avatar className="mt-2  h-10 w-10 cursor-pointer ">
          <AvatarImage src={avatarurl} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <EditorContent
          editor={editor}
          className="w-full text-white overflow-y-auto bg-background rounded-2xl px-4 py-4 "
        />
      </div>
      <div className="justify-end flex">
        <LoadingButton
          className="bg-green-600/90 rounded-md w-1/5 h-8 text-white disabled:bg-green-600/50 disabled:cursor-not-allowed disabled:text-muted-foreground"
          onClick={onSubmit}
          loading={mutation.isPending}
          // loading={mutation.isLoading}
          disabled={!input.trim()}
        >
          Post
        </LoadingButton>{" "}
        {/* problem with the button loading system */}
      </div>
    </div>
  );
}

// interface addAttachmentButtonProps {
//   onFileselected: (file: File[]) => void,
//   disabled: boolean;
// }

// function addAttachmentButton({ onFileselected, disabled }: addAttachmentButtonProps) {
//   const fileInputref = useRef<HTMLInputElement>(null)

//   return (
//     <>
//       <Button onClick={() => fileInputref.current?.click()} className="text-primary hover:text-primary" variant="ghost" size="icon">
//         <ImageIcon size="icon"/>
//       </Button>
//       <input className="sr-only " type="file" accept="image/*,video/*" multiple ref={fileInputref} onChange={(e) => {
//         const files = Array.from(e.target.files || []);
//         if (files.length) {
//           onFileselected(files);
//           e.target.value=""                     //not understandable need to revise again 
//         }
//       }} >
//       </input >
//     </>
//   );
 
  
// }
// interface AttachmentPreviewProps{
//   Attachment: Attachment;          // check on this motherfucker 
//   onRemoveclick: boolean;
// }
// function AttachmentPreview({

//   Attachment:{file , mediaid , isUploading},
//   onRemoveclick
// }: AttachmentPreviewProps) {
//     const src = URL.createObjectURL(file);
//   return (
//     <>
//       <div className={cn("relative mx-auto size-fit ", isUploading && "opacity-50")}>
//         {file.type.startWith("image") ? (
//         <Image className=" size-fit max-h-{30rem} rounded-2xl " src={src} width={500} height={500} alt="attachment preview"/>
//         ) : (
//             <video controls className="size-fit max-h-{30rem} rounded-2xl ">
//               <source src={src} type={file.type} />
//             </video>
//         )}
        
//     </div>
//     </>
//   )

  
// }