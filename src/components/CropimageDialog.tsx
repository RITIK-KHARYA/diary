import React, { useRef } from "react";

import { ReactCropperElement } from "react-cropper";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "./ui/dialog";
import { Cropper } from "react-cropper";
import { Button } from "./ui/button";
import "cropperjs/dist/cropper.css";
interface CropimageDialogProps {
  image: string;
  aspectratioimage: number;
  onCropped: (blob: Blob | null) => void;
  onClose: () => void;
}

export default function CropimageDialog({
  image,
  aspectratioimage,
  onCropped,
  onClose,
}: CropimageDialogProps) {
  console.log("rendered");
  const croppedref = useRef<ReactCropperElement>(null);
  function crop() {
    const cropper = croppedref.current?.cropper;
      console.log(croppedref);
    
    if (!cropper) {
      return;
    }
    cropper.getCroppedCanvas().toBlob((blob) => {
      onCropped(blob), "image/webp";
    });
    onClose();
  }

  return (
    <>
      <Dialog open onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>Crop Image</DialogHeader>
          <Cropper
            className="mx-auto size-fit"
            zoomable={false}
            src={image}
            ref={croppedref}
            aspectRatio={aspectratioimage}
            guides={false}
          />
          <DialogFooter>
            <Button
              className="text-white "
              variant="secondary"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button onClick={crop}>Crop</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
