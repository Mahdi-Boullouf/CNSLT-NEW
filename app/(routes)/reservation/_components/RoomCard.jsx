"use client";
import React from "react";
import Image from "next/image";
import { Users, CarTaxiFront, ImageOff } from "lucide-react";
import Link from "next/link";
import { getUrlImage } from "@/lib/assistant";
export default function RoomCard({ activity }) {
  if (!activity) {
    return null;
  }

  return (
    <Link 
      className=" transform transition duration-500 hover:scale-100  scale-95 hover:shadow-xl flex sm:flex-col sm:w-full bg-white rounded-lg sm:my-2 shadow-3xl "
      href={`/reservation/${activity._id}`}
    >
      <div className="relative w-48 h-48 sm:w-full sm:h-52" style={{zIndex:40}}>
        {activity.images && activity.images[0] ? (
          <Image
            src={getUrlImage(activity.images[0])}
            alt={activity.name || 'Activity image'}
            className="object-cover rounded-lg"
            layout="fill"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-lg">
            <ImageOff className="text-gray-400" size={24} />
            <span className="text-gray-500 text-sm ml-2">Image unavailable</span>
          </div>
        )}
      </div>
      <div className=" flex flex-col  justify-around  w-full p-4 sm:w-full">
        <div>
          <h2 className="text-xl font-bold mb-2 text-gray-800">{activity.name}</h2>
          <div className="flex flex-wrap items-center text-gray-600 text-sm gap-4 mb-2">
            {activity.transport && (
              <div className="flex items-center">
                <CarTaxiFront className="mr-1 w-4 h-4" />
                Transport
              </div>
            )}
            <div className="flex items-center">
              <Users className="mr-1 w-4 h-4" />
              {activity.type}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-end">
          <div className="text-lg font-bold text-primary1">
          Voir plus..
            <span className="text-xs text-gray-500 block">per person</span>
          </div>
          {/* <button className="bg-primary1  text-white px-4 py-2 rounded-md hover:bg-primary1/80 transition duration-300">
          Réservez          </button> */}
        </div>
      </div>
    </Link>
  );
}