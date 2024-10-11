// src/UploadCourseImage.tsx
import React, { useState } from 'react';

interface UploadCourseImageProps {
  onImageUpload: (imageUrl: string) => void;
}

const UploadCourseImage: React.FC<UploadCourseImageProps> = ({ onImageUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('/images/default.jpg');
  const [uploading, setUploading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);

    // Implement your image upload logic here
    // For example, upload to your backend or a cloud storage service like AWS S3, Cloudinary, etc.
    // After uploading, get the image URL and pass it to the parent component

    try {
      // Example using a mock upload function
      const imageUrl = await mockUpload(selectedFile);
      onImageUpload(imageUrl);
      setUploading(false);
      setSelectedFile(null);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert('Failed to upload image.');
      setUploading(false);
    }
  };

  // Mock upload function (replace with actual upload logic)
  const mockUpload = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(URL.createObjectURL(file)); // Replace with actual URL after upload
      }, 1000);
    });
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Course Image</label>
      <div className="flex items-center mt-1">
        <img src={preview} alt="Course Preview" className="w-16 h-16 object-cover rounded-lg mr-4" />
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {selectedFile && (
          <button
            onClick={handleUpload}
            className="ml-4 bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        )}
      </div>
    </div>
  );
};

export default UploadCourseImage;
