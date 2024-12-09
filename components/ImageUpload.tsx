import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Image from 'next/image';

export function ImageUpload() {
  const { user, updateUserProfile } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(user?.avatar || null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file || !user) return;

    setIsUploading(true);
    setError(null);
    const storage = getStorage();
    const storageRef = ref(storage, `profile_images/${user.uid}`);

    try {
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      await updateUserProfile(user, { avatar: downloadURL });
      setPreviewUrl(downloadURL);
      alert('Profile image updated successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        {previewUrl && (
          <Image
            src={previewUrl}
            alt="Profile preview"
            width={100}
            height={100}
            className="rounded-full object-cover"
          />
        )}
        <div className="flex-1">
          <Label htmlFor="profile-image">Profile Image</Label>
          <Input id="profile-image" type="file" onChange={handleFileChange} accept="image/*" disabled={isUploading} />
        </div>
      </div>
      <Button onClick={handleUpload} disabled={!file || isUploading} className="w-full">
        {isUploading ? 'Uploading...' : 'Upload Profile Image'}
      </Button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

