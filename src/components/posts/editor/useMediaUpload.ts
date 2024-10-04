//creaating this particular hook for the media upload and its status

import { currentUser } from "@clerk/nextjs/server";
import { useState } from "react";

interface UseMediaUploadProps {}

export default function useMediaUpload({}: UseMediaUploadProps) {
  const user = currentUser();
  const [] = useState();
}
