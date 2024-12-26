"use client";
import React, { useState, useEffect, useCallback } from "react";
import ImageUploader from "./ImageUploader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CardContent } from "@/components/ui/card";
import { useUploadImage } from "@/hooks/useUpload";
import { toast } from "react-hot-toast";
import Loading from "@/components/ui/Loading";
import { useUpdateRoom } from "@/hooks/useFetchRoom";
import { roomTypes } from "@/app/(routes)/dashboard/_data/lib";

export default function EditRoom({ room }) {
  const { updateRoom } = useUpdateRoom();
  const { uploadImage } = useUploadImage();

  const [priceWholeNumber, setPriceWholeNumber] = useState("");
  const [isPromotionEnabled, setIsPromotionEnabled] = useState(false);
  const [priceDecimal, setPriceDecimal] = useState("0");

  const [formData, setFormData] = useState({
    id: room?._id,
    name: room?.name,
    type: room?.type,
    transport: room?.transport,
    pricePerPerson: room?.pricePerPerson?.toString(),
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [existingImages, setExistingImages] = useState(room?.images || []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Define handlePriceChange first
  // Define handlePriceChange first
const handlePriceChange = useCallback((whole, decimal) => {
  const pricePerPerson = `${whole || "0"}.${decimal}`;
  setFormData(prev => ({
    ...prev,
    pricePerPerson: pricePerPerson
  }));
}, []);

// Update handlePromotionToggle with new logic
const handlePromotionToggle = useCallback((checked) => {
  setIsPromotionEnabled(checked);
  // If checked (enabled) use 1, otherwise use 0
  const newDecimal = checked ? "1" : "0";
  setPriceDecimal(newDecimal);
  
  // Only update price if we have a whole number
  if (priceWholeNumber) {
    handlePriceChange(priceWholeNumber, newDecimal);
  }
}, [priceWholeNumber, handlePriceChange]);

// Update the useEffect to handle initial state
useEffect(() => {
  if (room?.pricePerPerson) {
    const priceStr = room.pricePerPerson.toString();
    const [whole, decimal] = priceStr.split('.');
    setPriceWholeNumber(whole || "");
    // Check if decimal is 1 to set initial promotion state
    const hasPromotion = decimal === "1";
    setPriceDecimal(hasPromotion ? "1" : "0");
    setIsPromotionEnabled(hasPromotion);
  }

  setFormData({
    id: room?._id,
    name: room?.name,
    type: room?.type,
    transport: room?.transport,
    pricePerPerson: room?.pricePerPerson?.toString(),
  });
  setExistingImages(room?.images || []);
}, [room]);

  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);


  const handleFilesSelected = useCallback((files) => {
    setSelectedFiles(files);
  }, []);

  const uploadImages = useCallback(async () => {
    return await Promise.all(
      selectedFiles.map(async (file) => {
        try {
          return await uploadImage(file);
        } catch (error) {
          toast.error(`Error uploading image: ${file.name}`);
          return null;
        }
      })
    ).then((images) => images.filter(Boolean));
  }, [selectedFiles, uploadImage]);

  const validateForm = useCallback(() => {
    if (!formData.name.trim()) {
      toast.error("Room name is required");
      return false;
    }
    if (!formData.pricePerPerson || isNaN(formData.pricePerPerson)) {
      toast.error("Valid price per person is required");
      return false;
    }
    return true;
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("price data :",formData);
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const uploadedImages = await uploadImages();
      const response = await updateRoom({
        ...formData,
        images: [...existingImages, ...uploadedImages],
        pricePerPerson: Number(formData.pricePerPerson),
      });

      if (response) {
        toast.success("Room updated successfully!");
      }
    } catch (error) {
      toast.error("Error updating room: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="font-semibold text-lg">Room Images</Label>
            <ImageUploader
              onFilesSelected={handleFilesSelected}
              selectedFiles={selectedFiles}
              existingImages={existingImages}
              setExistingImages={setExistingImages}
            />
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-1 gap-4 grid-rows-subgrid">
            <div className="space-y-2">
              <Label htmlFor="name">Room Name</Label>
              <Input
                className="rounded-3xl"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Room Type</Label>
              <Select 
                className="rounded-3xl" 
                name="type" 
                value={formData.type} 
                onValueChange={(value) => handleInputChange({ target: { name: "type", value } })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select room type" />
                </SelectTrigger>
                <SelectContent>
                  {roomTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <div className="flex space-x-2 justify-around">
                {/* Whole Number Input */}
                <div>
                  <Label>prix</Label>
                  <Input
                    className="rounded-3xl mt-2 w-full"
                    placeholder="00DA"
                    name="priceWholeNumber"
                    type="number"
                    value={priceWholeNumber}
                    onChange={(e) => {
                      setPriceWholeNumber(e.target.value);
                      handlePriceChange(e.target.value, priceDecimal);
                    }}
                    required
                  />
                </div>
                <div>
                  {/* Replace Input with Switch for promotion */}
                  <div className="space-y-2">
                    <div className="flex justify-center items-center">
                      {/* <Label>Promotion</Label> */}
                      <Switch
                        checked={isPromotionEnabled}
                        onCheckedChange={handlePromotionToggle}
                        className=""
                      />
                    </div>
                    <div className="text-xl text-gray-700">
                      {isPromotionEnabled ? "Disponible" : "Indisponible"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="transport"
                name="transport"
                checked={formData.transport}
                onCheckedChange={(checked) => handleInputChange({ target: { name: "transport", type: "checkbox", checked } })}
              />
              <Label htmlFor="transport">Transport Available</Label>
            </div>
          </div>
          <Button 
            type="submit" 
            className="w-full bg-primary1 hover:bg-primary1 hover:opacity-70" 
            disabled={isSubmitting}
          >
            {isSubmitting ? <Loading /> : "Update Room"}
          </Button>
        </form>
      </CardContent>
    </div>
  );
}
