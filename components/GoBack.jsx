"use client";
import React  from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";


export default function GoBack({title}) {
    const router = useRouter();
  return (
   
              <div className="flex items-center space-x-2">
        <div
          className=" p-2 bg-gray-200 rounded-full hover:bg-gray-400 "
          onClick={() => router.back()}
        >
          <ArrowLeft />
        </div>
        <div className=" font-semibold text-3xl">{title}</div>
      </div>
   
  )
}
