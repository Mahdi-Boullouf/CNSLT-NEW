"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import Loading from "./ui/Loading";
import { useUploadImage } from "@/hooks/useUpload";
import ImageUploader from "./ImageUploader";
import { useCreateActivity } from "@/hooks/useFetchRoom";
function AddActivity() {
  const { createActivity } = useCreateActivity();
  const { uploadImage } = useUploadImage();
  const [name, setName] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
 
  const uploadImages = async () => {
    const uploadedImages = await Promise.all(
      selectedFiles.map(file => uploadImage(file).catch(error => {
        toast.error(`Error uploading image: ${file.name}`);
        return null;
      }))
    );
    return uploadedImages.filter(Boolean);
  };


  const validateInputs = () => {
    if (!name.trim()) {
      toast.error("Activity name is required");
      return false;
    }
    if (!selectedFiles) {
      toast.error("Activity image is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) return;

    setIsSubmitting(true);
    try {
      const uploadedImages = await uploadImages();
      if (!uploadedImages) {
        toast.error("Failed to upload image");
        return;
      }

      const response = await createActivity({
        name,
        picture: uploadedImages[0],
      });
        toast.success("Activity created successfully!");
     


      if (response) {
        setName("");
        setSelectedFiles([]);
      }
    } catch (error) {
      toast.error("Error creating activity: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto space-y-4">
      <div className="space-y-2">
        <Label className="font-semibold text-lg">Activity Image</Label>
        <ImageUploader
          onFilesSelected={setSelectedFiles}
          selectedFiles={selectedFiles}
          maxImages={1}
        />
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Activity Name</Label>
          <Input
            className="rounded-3xl"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

      </div>
      <Button
        onClick={handleSubmit}
        className="w-full bg-primary1 hover:bg-primary1 hover:opacity-70 py-2 rounded-3xl text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? <Loading /> : "Create Activity"}
      </Button>
    </div>
  );
}

export default AddActivity;