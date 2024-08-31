"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Placeholder } from "@tiptap/extension-placeholder";
import { submitpost } from "./actions";
import "./style.css";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function PostEditor(avatar: { avatar: string }) {
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

  async function onSubmit() {
    await submitpost(input);
    editor?.commands.clearContent();
  }
  return (
    <div className="flex w-[525px] flex-col gap-5 rounded-md  p-2 shadow-lg bg-opacity-35 bg-neutral-900/90 justify-center ">
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
        <button
          className="bg-green-600/90 rounded-md w-1/5 h-8 text-white disabled:bg-green-600/50 disabled:cursor-not-allowed disabled:text-muted-foreground"
          onClick={onSubmit}
          disabled={!input.trim()}
        >
          Post
        </button>
      </div>
    </div>
  );
}
