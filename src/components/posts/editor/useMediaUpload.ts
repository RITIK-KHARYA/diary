import { Toast } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useUploadThing } from "@/lib/uploadthing";
import { currentUser } from "@clerk/nextjs/server";

import { Files } from "lucide-react";
import { useState } from "react";

export interface attachment {
  mediaId?: string;
  isUploading: boolean;
  file: File;
}

export default function useMediaUpload() {
  const { toast } = useToast();

  const [uploadProgress, setuploadProgress] = useState<number>();

  const [attachment, setAttachment] = useState<attachment[]>([]);
  const { startUpload, isUploading } = useUploadThing("attachment", {
    onBeforeUploadBegin: (files) => {
      const renamedfiles = files.map((file) => {
        const extension = file.name.split(".").pop();
        return new File(
          [file],
          `attachment_${crypto.randomUUID()}.${extension}`,
          {
            type: file.type,
          }
        ); //till here all we changed is the file name and extension before the uploading and changed the isUploading state to true
      });
      setAttachment((prev) => [
        ...prev,
        ...renamedfiles.map((file) => ({ file, isUploading: true })),
      ]);

      return renamedfiles;
    },
    onUploadProgress: setuploadProgress,
    onClientUploadComplete(res) {
      setAttachment((prev) =>
        prev.map((a) => {
          const uploadResult = res.find((r) => r.name === a.file.name); //quite not understandable

          if (!uploadResult) return a;

          return {
            ...a,
            mediaId: uploadResult.serverData.MediaId,
            isUploading: false,
          };
        })
      );
    },
    onUploadError(e) {
      setAttachment((prev) => prev.filter((a) => !a.isUploading)); //this is for the checking so that no file is getting uploaded
      console.log(e);
      toast({
        variant: "destructive",
        description: e.message,
      });
    },
  });
  function handleStartUpload(files: File[]) {
    if (isUploading) {
      toast({
        variant: "destructive",
        description: "plwase wait uploading is in process",
      });
      return;
    }
    if (attachment.length + files.length > 5) {
      // this is for the video + image limit
      toast({
        variant: "destructive",
        description: "You can only upload up to 5 attachments per post.",
      });
      return;
    }

    startUpload(files);
  }
  function removeAttachment(fileName: string) {
    setAttachment((prev) => prev.filter((a) => a.file.name !== fileName));
  }

  function reset() {
    setAttachment([]);
    setuploadProgress(undefined);
  }
  return {
    startUpload: handleStartUpload,
    attachment,
    isUploading,
    uploadProgress,
    removeAttachment,
    reset,
  };
}
