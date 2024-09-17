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

// interface SubmitPostMutation {
//   mutate: (input: string, options: any) => void;
// }
export default function PostEditor(avatar: { avatar: string }) {
  const mutation = useSubmitpostMutation();
  const avatarurl = avatar.avatar;
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
    mutation.mutate(input, {
      onSuccess: () => {
        console.log("success");
        editor?.commands.clearContent();
      },
    });
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
