'use client'

import React, { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { cn } from "@/lib/utils"

interface FileUploadProps extends React.HTMLAttributes<HTMLDivElement> {
  onFilesChange: (files: File[]) => void
}

export function FileUpload({ onFilesChange, className, ...props }: FileUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFilesChange(acceptedFiles)
  }, [onFilesChange])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600",
        isDragActive && "border-primary",
        className
      )}
      {...props}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-lg text-gray-600 dark:text-gray-300">Drop the files here ...</p>
      ) : (
        <p className="text-lg text-gray-600 dark:text-gray-300">Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  )
}
