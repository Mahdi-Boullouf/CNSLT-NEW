"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { ChromePicker } from "react-color";
import { Palette, EyeOff, Eye } from "lucide-react";
import { useGetExclusive, useUpdateExclusive } from "@/hooks/useFatchExclusive";
import LoadingPage from "@/components/LoadingPage";
import Error from "@/components/ui/Error";
import toast from "react-hot-toast";

// Memoized color picker dialog to prevent unnecessary re-renders
const ColorPickerDialog = React.memo(({ color, onColorChange, title }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button
        variant="outline"
        size="icon"
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      >
        <Palette className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </Button>
    </DialogTrigger>
    <DialogContent className="rounded-lg shadow-lg">
      <DialogHeader>
        <DialogTitle className="text-lg font-semibold text-gray-700 dark:text-gray-200">
          {title} Color
        </DialogTitle>
      </DialogHeader>
      <div className="flex justify-center py-4">
        <ChromePicker
          color={color}
          onChange={onColorChange}
          className="shadow-md"
        />
      </div>
    </DialogContent>
  </Dialog>
));

const ExclusiveManagementPage = () => {
  const { data: exclusive, isLoading, error, getExclusive } = useGetExclusive();
  const { updateExclusive } = useUpdateExclusive();

  // Use useMemo to create initial state only when exclusive data changes
  const initialState = useMemo(() => ({
    id: exclusive?._id || "",
    title: exclusive?.title || "",
    colorText: exclusive?.colorText || "",
    color: exclusive?.color || "#FFFFFF",
    isHidden: exclusive?.isHidden || false,
  }), [exclusive]);

  // Use state with initial state from useMemo
  const [exclusiveItem, setExclusiveItem] = useState(initialState);

  // Fetch exclusive data on component mount
  useEffect(() => {
    getExclusive();
  }, []);

  // Update state when exclusive data changes
  useEffect(() => {
    setExclusiveItem(initialState);
  }, [initialState]);

  // Memoized input change handler
  const handleInputChange = React.useCallback((e) => {
    const { name, value } = e.target;
    setExclusiveItem(prev => ({ ...prev, [name]: value }));
  }, []);

  // Memoized color change handlers
  const handleColorChange = React.useCallback((type) => (color) => {
    setExclusiveItem(prev => ({ 
      ...prev, 
      [type === 'text' ? 'colorText' : 'color']: color.hex 
    }));
  }, []);

  // Memoized hidden toggle handler
  const handleHiddenToggle = React.useCallback((checked) => {
    setExclusiveItem(prev => ({ ...prev, isHidden: checked }));
  }, []);

  // Memoized save handler with error handling
  const handleSave = React.useCallback(async () => {
    try {
      await updateExclusive({
        id: exclusiveItem.id,
        title: exclusiveItem.title,
        colorText: exclusiveItem.colorText,
        color: exclusiveItem.color,
        isHidden: exclusiveItem.isHidden,
      });
      toast.success("Cnsl Live Updated Successfully");
    } catch (error) {
      console.error("Failed to save exclusive item", error);
      toast.error("Failed to save exclusive item");
    }
  }, [exclusiveItem, updateExclusive]);

  // Render loading or error states
  if (isLoading) return <LoadingPage />;
  if (error) return <Error />;

  return (
    <div className="container mx-auto p-6 max-w-xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
          Cnsl Live Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage exclusive items seamlessly.
        </p>
      </div>

      <div className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="grid gap-4">
          {/* Title Input */}
          <div className="grid gap-2">
            <Label htmlFor="title" className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              value={exclusiveItem.title}
              onChange={handleInputChange}
              placeholder="Enter exclusive item title"
              className="w-full p-3 rounded-lg shadow-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Title Color Picker */}
          <div className="grid gap-2">
            <Label className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Title Color
            </Label>
            <div className="flex items-center space-x-4">
              <div
                className="h-10 w-10 rounded-full border border-gray-300 dark:border-gray-600"
                style={{ backgroundColor: exclusiveItem.colorText }}
              ></div>
              <ColorPickerDialog
                color={exclusiveItem.colorText}
                onColorChange={handleColorChange('text')}
                title="Title"
              />
            </div>
          </div>

          {/* Background Color Picker */}
          <div className="grid gap-2">
            <Label className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Background Color
            </Label>
            <div className="flex items-center space-x-4">
              <div
                className="h-10 w-10 rounded-full border border-gray-300 dark:border-gray-600"
                style={{ backgroundColor: exclusiveItem.color }}
              ></div>
              <ColorPickerDialog
                color={exclusiveItem.color}
                onColorChange={handleColorChange('background')}
                title="Background"
              />
            </div>
          </div>

          {/* Visibility Toggle */}
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {exclusiveItem.isHidden ? "Hidden" : "Visible"}
            </Label>
            <div className="flex items-center space-x-2">
              {exclusiveItem.isHidden ? (
                <EyeOff className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              ) : (
                <Eye className="w-5 h-5 text-blue-500" />
              )}
              <Switch
                checked={exclusiveItem.isHidden}
                onCheckedChange={handleHiddenToggle}
                className="bg-gray-300 dark:bg-gray-600"
              />
            </div>
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            className="w-full py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Save Cnsl Live 
          </Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ExclusiveManagementPage);