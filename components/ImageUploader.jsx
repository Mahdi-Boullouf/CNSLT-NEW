"use client";
import React, { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FcAddImage } from "react-icons/fc";
import { getUrlImage } from "@/lib/assistant";

function ImageUploader({ onFilesSelected, selectedFiles, existingImages = [], setExistingImages, maxImages = 10 }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  const totalImages = existingImages.length + selectedFiles.length;
  const canAddMore = totalImages < maxImages;

  const handleFiles = useCallback((newFiles) => {
    const validFiles = Array.from(newFiles).filter(file => file.type.startsWith('image/'));
    const remainingSlots = maxImages - totalImages;
    const filesToAdd = validFiles.slice(0, remainingSlots);
    onFilesSelected([...selectedFiles, ...filesToAdd]);
  }, [selectedFiles, onFilesSelected, totalImages, maxImages]);

  const handleFileChange = (event) => {
    handleFiles(event.target.files);
  };

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const { files } = e.dataTransfer;
    handleFiles(files);
  }, [handleFiles]);

  const handleRemoveImage = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    onFilesSelected(updatedFiles);
  };

  const handleRemoveExistingImage = (index) => {
    const updatedExistingImages = existingImages.filter((_, i) => i !== index);
    setExistingImages(updatedExistingImages);
  };

  const handleAddMore = () => {
    if (canAddMore) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-4">
      <Input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        multiple
        className="hidden"
      />
      
      <div 
        ref={dropZoneRef}
        className={`flex flex-wrap gap-4 p-4 border-2 border-dashed rounded-lg transition-colors ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {canAddMore && (
          <Button 
            className="w-32 h-32 rounded-lg flex items-center justify-center"
            variant="outline" 
            onClick={handleAddMore}
          >
            {isDragging ? 'Drop here' : (
              <div className="flex flex-col items-center justify-center">
                <FcAddImage className="h-8 w-8" />
                <div className="font-raleway font-semibold">
                  Add Image
                </div>
              </div>
            )}
          </Button>
        )}
        {existingImages.map((imageUrl, index) => (
          <div key={`existing-${index}`} className="relative">
            <img 
              src={getUrlImage(imageUrl)}
              alt={`Existing ${index}`}
              className="w-32 h-32 object-cover rounded"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-0 right-0 w-6 h-6"
              onClick={() => handleRemoveExistingImage(index)}
            >
              ×
            </Button>
          </div>
        ))}
        {selectedFiles.map((file, index) => (
          <div key={index} className="relative">
            <img
              src={URL.createObjectURL(file)}
              alt={`Preview ${index}`}
              className="w-32 h-32 object-cover rounded"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-0 right-0 w-6 h-6"
              onClick={() => handleRemoveImage(index)}
            >
              ×
            </Button>
          </div>
        ))}
      </div>
      {!canAddMore && (
        <p className="text-red-500 text-sm">
          Maximum number of images ({maxImages}) reached.
        </p>
      )}
    </div>
  );
}

export default ImageUploader;