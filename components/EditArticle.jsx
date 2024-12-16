"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import Loading from "./ui/Loading";
import { useUploadImage } from "@/hooks/useUpload";
import ImageUploader from "./ImageUploader";
import { useUpdateArticle } from "@/hooks/useFetchArticles";

function EditArticle({ article }) {
  const { updateArticle } = useUpdateArticle();
  const { uploadImage } = useUploadImage();
  const [formData, setFormData] = useState({
    id: article?._id,
    title: article?.title,
    description: article?.description,
    link: article?.link,
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingImage, setExistingImage] = useState([]);


  useEffect(() => {
      setFormData({
        id: article?._id,
        title: article?.title,
        description: article?.description,
        link: article?.link,
      });
      setExistingImage(article?.image ? [article?.image] : []);

  }, [article]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleFilesSelected = useCallback((files) => {
    setSelectedFiles(files);
  }, []);

  const uploadImages = useCallback(async () => {
    try {
      const imageUploadPromises = selectedFiles.map((file) => uploadImage(file));
      const uploadedImages = await Promise.all(imageUploadPromises);
      return uploadedImages.filter(Boolean);
    } catch (error) {
      selectedFiles.forEach((file) => {
        toast.error(`Error uploading image: ${file.name}`);
      });
      return [];
    }
  }, [selectedFiles, uploadImage]);

  const validateInputs = () => {
    const { title, description, link } = formData;
    if (!title.trim() || !description.trim() || !link.trim()) {
      toast.error("All fields are required.");
      return false;
    }
    if (selectedFiles.length  === 0 && existingImage.length===0 ) {
      toast.error("At least one image is required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) return;

    setIsSubmitting(true);
    try {
      const uploadedImage = await uploadImages();
     
        await updateArticle({
          id: formData.id,
          title: formData.title,
          description: formData.description,
          link: formData.link,
          image: uploadedImage[0] || existingImage[0] ,
        });
        toast.success("Article updated successfully!");
       
    } catch (error) {
      toast.error(`Error updating article: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto space-y-4">
      <div className="space-y-2">
        <Label className="font-semibold text-lg">Article Image</Label>
        <ImageUploader
          onFilesSelected={handleFilesSelected}
          selectedFiles={selectedFiles}
          existingImages={existingImage}
          setExistingImages={setExistingImage}

          maxImages={1}
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Article Title</Label>
          <Input
            className="rounded-3xl"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Article Description</Label>
          <Input
            className="rounded-3xl"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="link">Article Link</Label>
          <Input
            className="rounded-3xl"
            id="link"
            name="link"
            value={formData.link}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="w-full bg-primary1 hover:bg-primary1 hover:opacity-70 py-2 rounded-3xl text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? <Loading /> : "Update Article"}
      </button>
    </div>
  );
}

export default EditArticle;
