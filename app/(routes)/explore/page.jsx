"use client";
import React, { useEffect, useState } from "react";
import explore from '@/public/explore.png'
import Image from 'next/image'
import { useStateContext } from "@/contexts/ContextProvider";
import { useGetAllArea } from "@/hooks/useFetchArea";
import { getUrlImage } from "@/lib/assistant";

export default function page() {
            
    const {Areas}=useStateContext()
    const { data: allAreas, error, isLoading, getAllArea } = useGetAllArea();

    useEffect(() => {
      getAllArea();
    }, []);
  return (
    <div className='   pt-36 bg-gray-100'>
        <div className='flex items-center justify-center my-16'>
            <div className=' text-primary2 bg-primary1 rounded-full font-bold uppercase px-4 py-2 text-3xl'>
            Nos Destinations 
            </div>

        </div>
        <div className='bg-white flex justify-center'>
            <Image src={explore} className=" w-2/3 sm:w-full" />
        </div>
        <div className=" container grid grid-cols-1  gap-4">
  {allAreas?.map((Area) => (
    <div key={Area._id} className=" flex flex-col items-center">
      <p className="bg-primary1 text-white px-4 py-2 rounded-full text-3xl font-bold my-4">
        {Area?.name}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-1 gap-4 w-full ">
        {Area.gallery.slice(0, 4).map((item, index) => (
          <div key={index} className="relative p-4 shadow-3xl rounded-3xl transform transition duration-500 hover:scale-105 hover:shadow-xl">
            <img src={getUrlImage(item)} alt={item.caption} className="w-full h-80 object-cover rounded-3xl" />
            {/* <div className="absolute bottom-0 left-0 bg-primary1 text-white px-2 py-1 text-sm">
              {item.caption}
            </div> */}
          </div>
        ))}
      </div>
    </div>
  ))}
</div>
    </div>
  )
}
