"use client"

import React from 'react';
import { Pencil } from "lucide-react";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { getUrlImage } from '@/lib/assistant';
const LocationCard = ({ data }) => {
  const router = useRouter()

  const onEdit = () => {
    router.push(`/dashboard/area/edit/${data._id}`)
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="relative h-48">
        <Image 
          src={getUrlImage(data?.photo)}
          alt={data.name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <h3 className="absolute bottom-4 left-4 text-white font-bold text-xl">{data.name}</h3>
      </div>
      <div className="p-5">
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{data.description}</p>
        <div className='flex justify-between items-center'>

        <div className="flex flex-wrap gap-2 mb-4">
          {data?.activities?.map((activity, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
              {activity.name}
            </span>
          ))}
        </div>
        <Button
          className="flex items-center  text-white bg-blue-500 hover:bg-blue-700 transition-colors duration-200"
          onClick={onEdit}
        >
          <Pencil className="w-4 h-4 mr-2 " />
          Edit
        </Button>
        </div>

      </div>
    </div>
  );
};

export default LocationCard;