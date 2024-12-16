"use client";
import React, { useState, useEffect, useCallback } from "react";
import ImageUploader from "./ImageUploader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CardContent } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import Loading from "@/components/ui/Loading";
import { useUpdateArea } from "@/hooks/useFetchArea";
import { useUploadImage } from "@/hooks/useUpload";
import ActivitiesCheckboxList from "./ActivitiesChechboxList";
import { useReservation } from "@/contexts/ReservationContext";

export default function EditArea({ area }) {
  const { updateArea } = useUpdateArea();
  const { uploadImage } = useUploadImage();

  const [formData, setFormData] = useState({
    id: area?._id,
    name: area?.name || '',
    description: area?.description || '',
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [existingImages, setExistingImages] = useState(area?.gallery || []);
  const [cover, setCover] = useState([]);
  const [coverSummer, setCoverSummer] = useState([]);
  const [coverWinter, setCoverWinter] = useState([]);
  const [existingCover, setExistingCover] = useState(area?.photo ? [area.photo] : []);
  const [existingCoverSummer, setExistingCoverSummer] = useState(area?.photoSummer ? [area.photoSummer] : []);
  const [existingCoverWinter, setExistingCoverWinter] = useState(area?.photoWinter ? [area.photoWinter] : []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    if (area) {
      setFormData({
        id: area._id,
        name: area.name || '',
        description: area.description || '',
      });
      setExistingImages(area.gallery || []);
      setExistingCover(area.photo ? [area.photo] : []);
      setExistingCoverSummer(area.photoSummer ? [area.photoSummer] : []);
      setExistingCoverWinter(area.photoWinter ? [area.photoWinter] : []);
      setActivities(area.activities);
    }
  }, [area]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleFilesSelected = useCallback((files) => {
    setSelectedFiles(files);
  }, []);

  const handleCoverSelected = useCallback((files) => {
    setCover(files);
  }, []);

  const handleCoverSummerSelected = useCallback((files) => {
    setCoverSummer(files);
  }, []);

  const handleCoverWinterSelected = useCallback((files) => {
    setCoverWinter(files);
  }, []);

  const uploadImages = useCallback(async (files) => {
    const uploadPromises = files.map(file => uploadImage(file).catch(() => null));
    const uploadedImages = await Promise.all(uploadPromises);
    return uploadedImages.filter(Boolean);
  }, [uploadImage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.description.trim()) {
      toast.error("Name and description are required");
      return;
    }

    setIsSubmitting(true);
    try {
      const [uploadedImages, uploadedCover, uploadedCoverSummer, uploadedCoverWinter] = await Promise.all([
        uploadImages(selectedFiles),
        uploadImages(cover),
        uploadImages(coverSummer),
        uploadImages(coverWinter)
      ]);

      const response = await updateArea({
        ...formData,
        gallery: [...existingImages, ...uploadedImages],
        photo: uploadedCover[0] || existingCover[0],
        coverSummer: uploadedCoverSummer[0] || existingCoverSummer[0],
        coverWinter: uploadedCoverWinter[0] || existingCoverWinter[0],
        activities: activities
      });

      if (response) {
        toast.success("Area updated successfully!");
      }
    } catch (error) {
      toast.error("Error updating area: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CardContent className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          <div>
            <Label className="text-xl font-bold text-gray-800 mb-3 block">Area Cover</Label>
            <ImageUploader
              onFilesSelected={handleCoverSelected}
              selectedFiles={cover}
              existingImages={existingCover}
              setExistingImages={setExistingCover}
              maxImages={1}
            />
          </div>
          <div>
            <Label className="text-xl font-bold text-gray-800 mb-3 block">Summer Cover</Label>
            <ImageUploader
              onFilesSelected={handleCoverSummerSelected}
              selectedFiles={coverSummer}
              existingImages={existingCoverSummer}
              setExistingImages={setExistingCoverSummer}
              maxImages={1}
            />
          </div>
          <div>
            <Label className="text-xl font-bold text-gray-800 mb-3 block">Winter Cover</Label>
            <ImageUploader
              onFilesSelected={handleCoverWinterSelected}
              selectedFiles={coverWinter}
              existingImages={existingCoverWinter}
              setExistingImages={setExistingCoverWinter}
              maxImages={1}
            />
          </div>
          <div>
            <Label className="text-xl font-bold text-gray-800 mb-3 block">Area Gallery</Label>
            <ImageUploader
              onFilesSelected={handleFilesSelected}
              selectedFiles={selectedFiles}
              existingImages={existingImages}
              setExistingImages={setExistingImages}
            />
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-lg font-semibold text-gray-700 mb-2 block">Area Name</Label>
            <Input
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Enter area name"
            />
          </div>
          <div>
            <Label htmlFor="description" className="text-lg font-semibold text-gray-700 mb-2 block">Area Description</Label>
            <Textarea
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={6}
              placeholder="Describe the area..."
            />
          </div>
        </div>
        <ActivitiesCheckboxList
          activities={activities}
          setActivities={setActivities}
          className="w-full p-2 my-4"
        /> 
        
        <Button 
          type="submit" 
          className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? <Loading className="mx-auto" /> : "Update Area"}
        </Button>
      </form>
    </CardContent>
  );
}