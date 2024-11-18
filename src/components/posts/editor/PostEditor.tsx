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
import useMediaUpload, { attachment } from "./useMediaUpload";
import { ClipboardEvent, use, useEffect, useRef } from "react";
import { ImageIcon, Loader2, X, icons } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { AttachmentPreviewList } from "stream-chat-react";
import { UploadDropzone, useDropzone } from "@uploadthing/react";
import { file } from "bun";

// interface SubmitPostMutation {
//   mutate: (input: string, options: any) => void;
// }
export default function PostEditor(avatar: { avatar: string }) {
  const mutation = useSubmitpostMutation();
  const avatarurl = avatar.avatar;
  const {
    startUpload,
    attachment,
    isUploading,
    uploadProgress,
    removeAttachment,
    reset: resetMedia,
  } = useMediaUpload();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: startUpload,
  });

  const { onClick, ...rootProps } = getRootProps();

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
        mediaIds: attachment.map((a) => a.mediaId).filter(Boolean) as string[], //to filter out the null value of the array of mediaids
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
  useEffect(() => {
    console.log(attachment);
    console.log(attachment.map((a) => a.mediaId).filter(Boolean));
  }, [attachment]);

  function onPaste(e: ClipboardEvent<HTMLInputElement>) {
    const files = Array.from(e.clipboardData.items)
      .filter((item) => item.kind === "file")
      .map((item) => item.getAsFile()) as File[];
    startUpload(files);
  }

  return (
    // w-[calc(100%-20px)]
    <div className="flex w-auto flex-col gap-5 rounded-md  p-2 shadow-lg bg-opacity-35 bg-neutral-900/90 justify-center ">
      <div className="w-full flex space-x-2 ">
        <Avatar className="mt-2  h-10 w-10 cursor-pointer ">
          <AvatarImage src={avatarurl} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div {...rootProps} className="w-full">
          <EditorContent
            editor={editor}
            className={cn(
              "w-full text-white overflow-y-auto bg-background rounded-2xl px-4 py-4 ",
              isDragActive && "outline-dashed"
            )}
            onPaste={onPaste}
          />
          <input {...getInputProps()} />
        </div>
      </div>
      {!!attachment.length && (
        <AttachmentPreviews
          attachments={attachment}
          onremoveclick={removeAttachment}
        />
      )}
      <div className="justify-end flex gap-3 items-center ">
        {!!isUploading && (
          <>
            <span className="text-sm ">{uploadProgress ?? 0}% </span>
            <Loader2 className="animate-spin text-primary size-5" />
          </>
        )}
        <AddAttachmentButton
          onFileselected={startUpload}
          disabled={isUploading || attachment.length >= 5}
        />
        <LoadingButton
          className="bg-green-600/90 rounded-md w-1/5 h-8 text-white disabled:bg-green-600/50 disabled:cursor-not-allowed disabled:text-muted-foreground"
          onClick={onSubmit}
          loading={mutation.isPending}
          // loading={mutation.isLoading}
          disabled={!input.trim() || isUploading}
        >
          Post
        </LoadingButton>{" "}
        {/* problem with the button loading system */}
      </div>
    </div>
  );
}

interface AddAttachmentButtonProps {
  onFileselected: (file: File[]) => void;
  disabled: boolean;
}

function AddAttachmentButton({
  onFileselected,
  disabled,
}: AddAttachmentButtonProps) {
  const fileInputref = useRef<HTMLInputElement>(null);

  return (
    <>
      <Button
        onClick={() => fileInputref.current?.click()}
        className="text-primary hover:text-primary "
        variant="ghost"
        size="icon"
      >
        <ImageIcon size="icon" className="size-6 " />
      </Button>
      <input
        className="sr-only "
        type="file"
        accept="image/*,video/*"
        multiple
        ref={fileInputref}
        onChange={(e) => {
          const files = Array.from(e.target.files || []);
          if (files.length) {
            onFileselected(files);
            e.target.value = "";
          }
        }}
      ></input>
    </>
  );
}
interface Attachmentpreviewsprops {
  attachments: attachment[];
  onremoveclick: (filename: string) => void;
}
function AttachmentPreviews({
  attachments,
  onremoveclick,
}: Attachmentpreviewsprops) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        attachments.length > 1 && "sm:grid sm:grid-cols-2"
      )}
    >
      {attachments.map((attachment) => (
        <AttachmentPreview
          key={attachment.file.name}
          Attachment={attachment}
          onRemoveclick={() => onremoveclick(attachment.file.name)}
        />
      ))}
    </div>
  );
}

interface AttachmentPreviewProps {
  Attachment: attachment;
  onRemoveclick: () => void;
  key: string;
}
function AttachmentPreview({
  Attachment: { file, mediaId, isUploading },
  onRemoveclick,
  key,
}: AttachmentPreviewProps) {
  const src = URL.createObjectURL(file);
  return (
    <>
      <div
        key={key}
        className={cn(
          "relative mx-auto size-fit ",
          isUploading && "opacity-50"
        )}
      >
        {file.type.startsWith("image") ? (
          <Image
            className=" size-fit max-h-{30rem} rounded-2xl "
            src={src}
            width={500}
            height={500}
            alt="attachment preview"
          />
        ) : (
          <video controls className="size-fit max-h-{30rem} rounded-2xl ">
            <source src={src} type={file.type} />
          </video>
        )}
        {!isUploading && (
          <Button
            className=" absolute right-3 top-3 rounded-full bg-foreground p-1.5 transition-colors hover:bg-muted "
            onClick={onRemoveclick}
          >
            <X size={20} className="hover:text-foreground" />
          </Button>
        )}
      </div>
    </>
  );
}
//line 218 