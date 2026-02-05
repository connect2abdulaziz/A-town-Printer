"use client";

import { useRef } from "react";
import { Button } from "./Button";

interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  onFilesSelected?: (files: FileList | null) => void;
}

export function FileUpload({
  accept = "image/*,.pdf",
  multiple = true,
  onFilesSelected,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilesSelected?.(e.target.files ?? null);
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        className="hidden"
      />
      <Button
        type="button"
        variant="outline"
        onClick={() => inputRef.current?.click()}
      >
        Choose files
      </Button>
    </div>
  );
}
