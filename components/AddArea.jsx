"use client"
import React, { useState, useCallback } from "react";
import ImageUploader from "./ImageUploader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CardContent } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import Loading from "@/components/ui/Loading";
import { useCreateArea } from "@/hooks/useFetchArea";
import { useUploadImage } from "@/hooks/useUpload";
import ActivitiesCheckboxList from "./ActivitiesChechboxList";

export default function CreateArea() {
  const { createArea } = useCreateArea();
  const { uploadImage } = useUploadImage();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    email: '',
    password: '',
  });
  
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [cover, setCover] = useState([]);
  const [coverSummer, setCoverSummer] = useState([]);
  const [coverWinter, setCoverWinter] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activities, setActivities] = useState([]);

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
    if (!files || files.length === 0) return null;
    try {
      const uploadedImages = await Promise.all(
        files.map(async (file) => {
          try {
            const result = await uploadImage(file);
            return result;
          } catch (error) {
            console.error('Error uploading file:', error);
            return null;
          }
        })
      );
      return uploadedImages.filter(Boolean);
    } catch (error) {
      console.error('Error in uploadImages:', error);
      return null;
    }
  }, [uploadImage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name.trim() || !formData.description.trim() || !formData.email.trim() || !formData.password.trim()) {
      toast.error("All fields are required");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setIsSubmitting(true);
    try {
      // Upload images
      const mainPhoto = await uploadImages(cover);
      const summerPhoto = await uploadImages(coverSummer);
      const winterPhoto = await uploadImages(coverWinter);
      const galleryPhotos = await uploadImages(selectedFiles);

      const areaData = {
        name: formData.name,
        description: formData.description,
        email: formData.email,
        password: formData.password,
        photo: mainPhoto?.[0] || '',
        photoSummer: summerPhoto?.[0] || '',
        photoWinter: winterPhoto?.[0] || '',
        gallery: galleryPhotos || [],
        activities: activities
      };

      console.log('Submitting area data:', areaData);

      const response = await createArea(areaData);

      if (response) {
        toast.success("Area created successfully!");
        // Reset form
        setFormData({ name: '', description: '', email: '', password: '' });
        setCover([]);
        setCoverSummer([]);
        setCoverWinter([]);
        setSelectedFiles([]);
        setActivities([]);
      }
    } catch (error) {
      console.error('Error creating area:', error);
      toast.error(error.response?.data?.message || "Error creating area. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CardContent className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          <div>
            <Label className="text-xl font-bold text-gray-800 mb-3 block">Area Cover (Required)</Label>
            <ImageUploader
              onFilesSelected={handleCoverSelected}
              selectedFiles={cover}
              maxImages={1}
            />
          </div>
          <div>
            <Label className="text-xl font-bold text-gray-800 mb-3 block">Summer Cover (Optional)</Label>
            <ImageUploader
              onFilesSelected={handleCoverSummerSelected}
              selectedFiles={coverSummer}
              maxImages={1}
            />
          </div>
          <div>
            <Label className="text-xl font-bold text-gray-800 mb-3 block">Winter Cover (Optional)</Label>
            <ImageUploader
              onFilesSelected={handleCoverWinterSelected}
              selectedFiles={coverWinter}
              maxImages={1}
            />
          </div>
          <div>
            <Label className="text-xl font-bold text-gray-800 mb-3 block">Area Gallery (Optional)</Label>
            <ImageUploader
              onFilesSelected={handleFilesSelected}
              selectedFiles={selectedFiles}
            />
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-lg font-semibold text-gray-700 mb-2 block">Area Name *</Label>
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
            <Label htmlFor="description" className="text-lg font-semibold text-gray-700 mb-2 block">Area Description *</Label>
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
          <div>
            <Label htmlFor="email" className="text-lg font-semibold text-gray-700 mb-2 block">Admin Email *</Label>
            <Input
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Enter admin email"
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-lg font-semibold text-gray-700 mb-2 block">Admin Password * (min 6 characters)</Label>
            <Input
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              minLength={6}
              placeholder="Enter admin password"
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
          {isSubmitting ? <Loading className="mx-auto" /> : "Create Area"}
        </Button>
      </form>
    </CardContent>
  );
}