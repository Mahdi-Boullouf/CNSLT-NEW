import { getUrlImage } from '@/lib/assistant';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

const GalerieSection = ({ area }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <div className="mx-auto p-4">
        <div className="w-full grid sm:grid-cols-2 grid-cols-3 md:grid-cols-4 gap-2">
          {area?.gallery?.map((image, index) => (
            <div 
              key={index} 
              className="aspect-w-1 aspect-h-1 cursor-pointer relative group"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={getUrlImage(image)}
                alt={`Gallery Image ${index + 1}`}
                className="w-full h-full object-cover rounded-lg transition-transform duration-200 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-200 rounded-lg" />
            </div>
          ))}
        </div>
      </div>

      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)} style={{ zIndex: 10000 }}>
        <DialogContent className="sm:max-w-[90vw] max-h-[90vh] p-0 overflow-hidden bg-transparent border-0">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute right-4 top-4 z-50 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
          <img
            src={selectedImage ? getUrlImage(selectedImage) : ''}
            alt="Selected gallery image"
            className="w-full h-full object-contain"
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GalerieSection;