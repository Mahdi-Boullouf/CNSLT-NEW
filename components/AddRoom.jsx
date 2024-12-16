"use client";
import React, { useEffect, useState } from "react";
import ImageUploader from "./ImageUploader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CardContent } from "@/components/ui/card";
import { useUploadImage } from "@/hooks/useUpload";
import { toast } from "react-hot-toast";
import { useCreateRoom } from "@/hooks/useFetchRoom";
import Loading from "./ui/Loading";
import { useStateContext } from "@/contexts/ContextProvider";
import { useGetAllArea } from '@/hooks/useFetchArea';
// import ActivitiesCheckboxList from "./ActivitiesChechboxList";
import { useAuth } from '@/contexts/AuthContext';
import { roomTypes } from "@/app/(routes)/dashboard/_data/lib";
// import Danger from "./Danger";

function Danger({ value, onChange }) {
  const calculateDangerLevel = (inputValue) => {
    if (inputValue > 2) {
      onChange(3);
      return 3;
    }
    if (inputValue > 1.1) {
      onChange(2);
      return 2;
    }
    if (inputValue < 1.1) {
      onChange(1);
      return 1;
    }
    return 0;
  };

  const handleSliderChange = (e) => {
    const newValue = parseFloat(e.target.value);
    calculateDangerLevel(newValue);
  };

  return (
    <div className="w-full">
      <input 
        type="range" 
        min="0" 
        max="3" 
        step="0.1" 
        value={value} 
        onChange={handleSliderChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <div className="flex justify-between text-sm text-gray-500 mt-2">
        <span>Low</span>
        <span>Medium</span>
        <span>High</span>
      </div>
    </div>
  );
}

function AddRoom() {
  const { areaId } = useAuth();
  const { getAllArea } = useGetAllArea();
  const { Areas } = useStateContext();
  const { uploadImage } = useUploadImage();
  const { createRoom } = useCreateRoom();
  const [activities, setActivities] = useState([]);
  const [dangerValue, setdangerValue] = useState(1);

  const [priceWholeNumber, setPriceWholeNumber] = useState("");
  const [priceDecimal, setPriceDecimal] = useState("");

  const [state, setState] = useState({
    formData: {
      name: "",
      type: "Single",
      transport: true,
      pricePerPerson: "",
      activities: activities,
    },
    selectedFiles: [],
    isSubmitting: false,
  });

  useEffect(() => {
    getAllArea();
  }, []);

  const handleInputChange = (name, value) => {
    setState((prev) => ({
      ...prev,
      formData: { ...prev.formData, [name]: value },
    }));
  };

  // Handle changes in price
  const handlePriceChange = (whole, decimal) => {
    // Combine whole part and decimal part
    let combinedPrice = `${whole || "0"}.${decimal || "00"}`;
    // Update the state with the combined price
    setState((prev) => ({
      ...prev,
      formData: { ...prev.formData, pricePerPerson: combinedPrice },
    }));
  };

  const handleFilesSelected = (files) => {
    setState((prev) => ({ ...prev, selectedFiles: files }));
  };

  const uploadImages = async () => {
    return await Promise.all(
      state.selectedFiles.map(async (file) => {
        try {
          return await uploadImage(file);
        } catch (error) {
          toast.error(`Error uploading image: ${file.name}`);
          return null;
        }
      })
    ).then((images) => images.filter(Boolean));
  };

  const validateForm = () => {
    const { name, pricePerPerson } = state.formData;
    if (!name.trim()) {
      toast.error("Room name is required");
      return false;
    }
    if (!pricePerPerson || isNaN(pricePerPerson)) {
      toast.error("Valid price per person is required");
      return false;
    }
    if (state.selectedFiles.length === 0) {
      toast.error("At least one image is required");
      return false;
    }
    if (!areaId) {
      toast.error("Region is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setState((prev) => ({ ...prev, isSubmitting: true }));

    try {
      const uploadedImages = await uploadImages();
      const response = await createRoom({
        ...state.formData,
        areaId: areaId,
        images: uploadedImages,
        pricePerPerson: Number(state.formData.pricePerPerson), // Ensure pricePerPerson is sent as a number
        dangerDegree: dangerValue,
      });
      console.log(state.formData.pricePerPerson);
      
      if (response) {
        toast.success("Room created successfully!");
        setState((prev) => ({
          ...prev,
          formData: {
            ...prev.formData,
            name: "",
            type: "Single",
            transport: true,
            pricePerPerson: "",
          },
          selectedFiles: [],
        }));
        setPriceWholeNumber("");
        setPriceDecimal("");
        setActivities([]);
        setdangerValue(1);
      }
    } catch (error) {
      toast.error("Error creating room: " + error.message);
    } finally {
      setState((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  return (
    <div className="mx-auto">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="font-semibold text-lg">Room Images</Label>
            <ImageUploader onFilesSelected={handleFilesSelected} selectedFiles={state.selectedFiles} />
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-1 gap-4 grid-rows-subgrid">
            <div className="space-y-2">
              <Label htmlFor="name">Room Name</Label>
              <Input
                className="rounded-3xl"
                id="name"
                name="name"
                value={state.formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Room Type</Label>
              <Select
                className="rounded-3xl"
                name="type"
                value={state.formData.type}
                onValueChange={(value) => handleInputChange("type", value)}
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
                <Label>Price Per Person (in season)</Label>
                <Input
                  className="rounded-3xl mt-2 w-full"
                  placeholder="Whole number"
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
                {/* Decimal Part Input */}
                  <Label>Price Per Person (on season)</Label>
                <Input
                  className="rounded-3xl mt-2 w-full"
                  placeholder="Decimal part"
                  name="priceDecimal"
                  type="text" // Keep as text to retain all digits
                  value={priceDecimal}
                  onChange={(e) => {
                    setPriceDecimal(e.target.value);
                    handlePriceChange(priceWholeNumber, e.target.value);
                  }}
                  required
                />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="transport"
                name="transport"
                checked={state.formData.transport}
                onCheckedChange={(checked) => handleInputChange("transport", checked)}
              />
              <Label htmlFor="transport">Transport Available</Label>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-primary1 hover:bg-primary1 hover:opacity-70"
            disabled={state.isSubmitting}
          >
            {state.isSubmitting ? <Loading /> : "Create Room"}
          </Button>
        </form>
      </CardContent>
    </div>
  );
}

export default AddRoom;
