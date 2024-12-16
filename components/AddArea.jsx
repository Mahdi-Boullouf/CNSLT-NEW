"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import Loading from "./ui/Loading";
import { useUploadImage } from "@/hooks/useUpload";
import ImageUploader from "./ImageUploader";
import { useCreateArea } from "@/hooks/useFetchArea";

// Predefined activities (you might want to fetch these dynamically)
const ACTIVITIES = [
  { id: "hiking", name: "Hiking" },
  { id: "swimming", name: "Swimming" },
  { id: "camping", name: "Camping" },
  { id: "skiing", name: "Skiing" },
  { id: "climbing", name: "Rock Climbing" },
  { id: "birdwatching", name: "Bird Watching" },
  { id: "fishing", name: "Fishing" },
];

function AddArea() {
  const { createArea } = useCreateArea();
  const { uploadImage } = useUploadImage();

  // State for form fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activities, setActivities] = useState([]);
  
  // State for images
  const [mainPhoto, setMainPhoto] = useState([]);
  const [summerCover, setSummerCover] = useState([]);
  const [winterCover, setWinterCover] = useState([]);
  const [gallery, setGallery] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Upload images
  const uploadImages = async () => {
    const imageUploaders = [
      { files: mainPhoto, type: 'mainPhoto', required: true },
      { files: summerCover, type: 'summerCover', required: false },
      { files: winterCover, type: 'winterCover', required: false },
      { files: gallery, type: 'gallery', required: false }
    ];

    const uploadedImages = {};

    for (const imageUploader of imageUploaders) {
      if (imageUploader.files.length > 0) {
        try {
          const uploadPromises = imageUploader.files.map(file => 
            uploadImage(file).catch(error => {
              toast.error(`Error uploading ${imageUploader.type} image: ${file.name}`);
              return null;
            })
          );
          
          const uploadedImagesForType = await Promise.all(uploadPromises);
          uploadedImages[imageUploader.type] = uploadedImagesForType.filter(Boolean);
        } catch (error) {
          if (imageUploader.required) {
            toast.error(`Error uploading required ${imageUploader.type} images`);
            return null;
          }
        }
      }
    }

    return uploadedImages;
  };

  // Validate inputs
  const validateInputs = () => {
    const validations = [
      { condition: !name.trim(), message: "Area name is required" },
      { condition: !description.trim(), message: "Area description is required" },
      { condition: !email.trim(), message: "Email is required" },
      { condition: !password.trim(), message: "Password is required" },
      { condition: activities.length === 0, message: "At least one activity must be selected" },
      { condition: mainPhoto.length === 0, message: "Main photo is required" }
    ];

    for (const validation of validations) {
      if (validation.condition) {
        toast.error(validation.message);
        return false;
      }
    }

    return true;
  };

  // Handle activity toggle
  const toggleActivity = (activityId) => {
    setActivities(prev => 
      prev.includes(activityId)
        ? prev.filter(id => id !== activityId)
        : [...prev, activityId]
    );
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Validate inputs first
    if (!validateInputs()) return;
  
    setIsSubmitting(true);
    try {
      // Upload images first
      const uploadedImages = await uploadImages();
      
      // Check if image upload was successful (especially for required main photo)
      if (!uploadedImages || !uploadedImages.mainPhoto) {
        toast.error("Main photo upload failed");
        setIsSubmitting(false);
        return;
      }
  
      // Prepare area data with optional fields
      const areaData = {
        name,
        description,
        // Only include optional images if they exist
        ...(uploadedImages.mainPhoto?.[0] && { photo: uploadedImages.mainPhoto[0] }),
        ...(uploadedImages.winterCover?.[0] && { coverWinter: uploadedImages.winterCover[0] }),
        ...(uploadedImages.summerCover?.[0] && { coverSummer: uploadedImages.summerCover[0] }),
        email,
        password,
        activities,
        // Only include gallery if there are images
        ...(uploadedImages.gallery?.length > 0 && { gallery: uploadedImages.gallery })
      };
  
      // Create area
      // console.log("Sending area data:", areaData);
      
      const response = await createArea(areaData);
  
      if (response) {
        toast.success("Area created successfully!");
        
        // Reset form
        setName("");
        setDescription("");
        setEmail("");
        setPassword("");
        setActivities([]);
        setMainPhoto([]);
        setSummerCover([]);
        setWinterCover([]);
        setGallery([]);
      }
    } catch (error) {
      setIsSubmitting(false);
    
      // Log the error for debugging
      console.error("Error in Area Creation:", error);
    
      if (error.response) {
        // HTTP response errors
        const { data, status } = error.response;
        console.error("Server Response Error:", status, data);
    
        if (data && data.errors && Array.isArray(data.errors)) {
          // Multiple validation errors
          data.errors.forEach((errMsg) => {
            toast.error(errMsg);
          });
        } else {
          // Generic server error
          toast.error(data?.message || "An error occurred while creating the area.");
        }
      } else if (error.request) {
        // No response from server
        console.error("No Response from Server:", error.request);
        toast.error("No response received from the server. Please try again later.");
      } else {
        // Other errors (e.g., request setup issues)
        console.error("Request Setup Error:", error.message);
        toast.error(error.message || "An unknown error occurred. Please try again.");
      }
    }}
    

  return (
    <div className="mx-auto space-y-4">
      {/* Main Photo */}
      <div className="space-y-2">
        <Label className="font-semibold text-lg">Area Main Photo</Label>
        <ImageUploader 
          onFilesSelected={setMainPhoto}
          selectedFiles={mainPhoto}
          maxImages={1}
        />
      </div>

      {/* Area Details */}
      <div className="grid grid-cols-2 sm:grid-cols-1 gap-4">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Area Name</Label>
          <Input
            className="rounded-3xl"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Area Description</Label>
          <Input
            className="rounded-3xl"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            className="rounded-3xl"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            className="rounded-3xl"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Activities Selection */}
      <div className="space-y-2">
        <Label>Select Activities</Label>
        <div className="grid grid-cols-3 gap-4">
          {ACTIVITIES.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={activity.id}
                checked={activities.includes(activity.id)}
                onChange={() => toggleActivity(activity.id)}
                className="rounded"
              />
              <Label htmlFor={activity.id}>{activity.name}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Optional Covers */}
      <div className="grid grid-cols-2 gap-4">
        {/* Summer Cover */}
        <div className="space-y-2">
          <Label className="font-semibold text-lg">Summer Cover Photo (Optional)</Label>
          <ImageUploader 
            onFilesSelected={setSummerCover}
            selectedFiles={summerCover}
            maxImages={1}
          />
        </div>

        {/* Winter Cover */}
        <div className="space-y-2">
          <Label className="font-semibold text-lg">Winter Cover Photo (Optional)</Label>
          <ImageUploader 
            onFilesSelected={setWinterCover}
            selectedFiles={winterCover}
            maxImages={1}
          />
        </div>
      </div>

      {/* Gallery */}
      <div className="space-y-2">
        <Label className="font-semibold text-lg">Gallery Images (Optional)</Label>
        <ImageUploader 
          onFilesSelected={setGallery}
          selectedFiles={gallery}
          maxImages={5}
        />
      </div>

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        className="w-full bg-primary1 hover:bg-primary1 hover:opacity-70"
        disabled={isSubmitting}
      >
        {isSubmitting ? <Loading /> : "Create Area"}
      </Button>
    </div>
  );
}

export default AddArea;