// understanding for the author revise this file again

import { useToast } from "@/components/ui/use-toast";
import { useUploadThing } from "@/lib/uploadthing";
import { currentUser } from "@clerk/nextjs/server";
import { Files } from "lucide-react";
import { useState } from "react";

interface attachment {
  mediaIds?: string;
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
        );
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
          const uploadResult = res.find((r) => r.name === a.file.name);

          if (!uploadResult) return a;

          return {
            ...a,
            mediaId: uploadResult.serverData.MediaId,
            isUploading: false,
          };
        })
      );
    },
  });
}
