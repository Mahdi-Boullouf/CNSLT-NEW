"use client";
import React , { useState, useRef, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUploadImage } from "@/hooks/useUpload"; 
import AddRoom from "@/components/AddRoom";
import GoBack from "@/components/GoBack";
export default function page() {
  const router = useRouter();
  const { data, error, isLoading, uploadImages } = useUploadImage();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);
  return (
    <div className=" px-4">
<GoBack title="Add New Room" />
  
      <div className=" w-full  border-2 border-gray-300 p-4 my-4 rounded-lg ">
<AddRoom />
        


      </div>
    </div>

  );
}
