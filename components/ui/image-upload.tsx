"use client";

import { useEffect, useState } from "react";
import { Button } from "./button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

interface ImageUploaderProps {
  disable: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  values: string[];
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  disable,
  onChange,
  onRemove,
  values,
}) => {
  const [Ismounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!Ismounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {values.map((url) => (
          <div
            className="relative w-[200px] h-[200px] overflow-hidden rounded-md"
            key={url}
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
              >
                <Trash className="h-4 w-4 " />
              </Button>
            </div>
            <Image fill className="object-cover" alt="image" src={url} />
          </div>
        ))}
      </div>
      <CldUploadWidget uploadPreset="nisx7rdu" onUpload={onUpload}>
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <Button
              onClick={onClick}
              disabled={disable}
              variant="secondary"
              type="button"
            >
              <ImagePlus className="w-4 h-4 mr-2" />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUploader;
