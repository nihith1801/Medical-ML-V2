import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { type ClassValue as ClassValueType, clsx as clsxType } from "clsx"
import imageCompression from 'browser-image-compression';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Keep any existing functions in this file

export async function compressImage(file: File, maxSizeMB = 1): Promise<File> {
  console.log('Starting image compression...');
  console.log('Original file size:', file.size / 1024 / 1024, 'MB');

  const options = {
    maxSizeMB: maxSizeMB,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    console.log('Compressed file size:', compressedFile.size / 1024 / 1024, 'MB');
    return new File([compressedFile], file.name, { type: compressedFile.type });
  } catch (error) {
    console.error('Error compressing image:', error);
    throw error;
  }
}

