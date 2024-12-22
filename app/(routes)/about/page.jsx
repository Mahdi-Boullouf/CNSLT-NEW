"use client";
import React, { useEffect, useState } from "react";
import explore from '@/public/explore.png'
import Image from 'next/image'
import { useStateContext } from "@/contexts/ContextProvider";
import { useGetAllArea } from "@/hooks/useFetchArea";
import { getUrlImage } from "@/lib/assistant";
import CnslLive from '@/components/CnslLive'

export default function about() {
    const {Areas}=useStateContext()
    const { data: allAreas, error, isLoading, getAllArea } = useGetAllArea();

    useEffect(() => {
      getAllArea();
    }, []);
  return (
    <div className='   pt-36 bg-white'>
      <CnslLive />
        <div className='flex items-center justify-center my-16'>
            <div className=' text-blue-500 font-semibold uppercase px-4 py-2 text-7xl sm:text-4xl font-body'>
            CNSL
            </div>

        </div>
        <div className=" container grid grid-cols-1  gap-4">
  {allAreas?.map((Area) => (
    <div  key={Area._id} className=" my-4" >
      <div >
              <p className=' max-w-fit text-white  bg-primary1 rounded-full font-bold uppercase px-4 py-2 text-3xl sm:text-xl'>
              ABOUT CNSL - {Area?.name}
           </p>
           </div>

         <div className="flex sm:h-auto items-center sm:flex-col space-x-8">

         <div className="w-1/2 h-[80%] sm:w-full sm:my-6 py-12 object-cover">
           <img src={getUrlImage(Area?.photo)} 

           className="h-[737px] sm:h-full rounded-3xl" 
           alt="Description" />
         </div>
         <div className="flex w-1/2 text-primary2 font-body sm:w-full sm:h-auto h-[737px]  flex-col items-start justify-start">
           <p className="text-[32px] sm:text-xl">
           
            
           {Area?.description}
                      </p>
         </div>
       </div>
       </div>

  ))}
</div>
    </div>
  )
}
