"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import Loading from "./ui/Loading";
import { DatePickerDemo } from "./ui/DatePickerDemo";
import { useUploadImage } from "@/hooks/useUpload";
import ImageUploader from "./ImageUploader";
import { useCreateEvant } from "@/hooks/useFetchEvents";

function AddEvent() {
  const { createEvent } = useCreateEvant();
  const { uploadImage } = useUploadImage();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
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
    if (!title.trim()) {
      toast.error("Event title is required");
      return false;
    }
    if (!description.trim()) {
      toast.error("Event description is required");
      return false;
    }
    if (!date) {
      toast.error("Event date is required");
      return false;
    }
    if (selectedFiles.length === 0) {
      toast.error("At least one image is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) return;

    setIsSubmitting(true);
    try {
      const uploadedImages = await uploadImages();
      const response = await createEvent({
        title,
        description,
        date,
        photo: uploadedImages[0],
      });
      if (response) {
        toast.success("Event created successfully!");
        setTitle("");
        setDescription("");
        setDate(new Date());
        setSelectedFiles([]);
      }
    } catch (error) {
      toast.error("Error creating event: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto space-y-4">
      <div className="space-y-2">
        <Label className="font-semibold text-lg">Event Images</Label>
        <ImageUploader 
         onFilesSelected={setSelectedFiles}
         selectedFiles={selectedFiles}
         maxImages={1}
         />
      </div>
      <div className=" grid grid-cols-2 sm:grid-cols-1  gap-4 "> 
    
      <div className="space-y-2">
        <Label htmlFor="title">Event Title</Label>
        <Input
          className="rounded-3xl"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Event Description</Label>
        <Input
          className="rounded-3xl"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="date">Event Date</Label>
        <DatePickerDemo date={date} setDate={setDate} width = "w-full" />
      </div>
      </div>
      <button
      
        onClick={handleSubmit}
        className="w-full bg-primary1 hover:bg-primary1 hover:opacity-70 py-2 rounded-3xl text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? <Loading /> : "Create Event"}
      </button>
    </div>
  );
}

export default AddEvent;