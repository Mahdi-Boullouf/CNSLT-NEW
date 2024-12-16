// components/RoomGrid.js
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useGetAllRooms } from "@/hooks/useFetchRoom";
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import { useRouter } from "next/navigation";
import { getUrlImage } from "@/lib/assistant";
export default function RoomGrid({ areaId, selectedDegree }) {
  const { data, error, isLoading, getAllRooms } = useGetAllRooms();

  useEffect(() => {
    getAllRooms({ areaId, degree: selectedDegree });
  }, [areaId, selectedDegree]);

//   if (isLoading) return <Loading />;
//   if (error) return <Error />;

  return (
    <div className=" min-h-72 grid grid-cols-2 sm:grid-cols-1 gap-6 justify-items-center">
      {data?.map((item) => (
        <RoomCard key={item.id} item={item} />
      ))}
    </div>
  );
}

function RoomCard({ item }) {
  const router = useRouter()

  return (
    <div className=" transform transition duration-500 hover:scale-105 hover:shadow-xl cursor-pointer rounded-3xl overflow-hidden border border-gray-200 shadow-3xl bg-white w-4/5 sm:w-full h-96"
    onClick={()=>router.push(`../reservation/${item._id}`)}
    >
      <div className="relative p-4 rounded-3xl">
        <Image
          src={getUrlImage(item.images[0])}
          alt={item.name}
          width={400}
          height={600}
          className="w-full h-72 object-cover rounded-3xl"
        />
        {/* <div className="absolute top-3 left-3 bg-white rounded-full px-2 py-1 text-sm font-bold shadow">
          4.5
        </div> */}
        {/* <button className="absolute top-3 right-3 text-white hover:text-primary1 bg-primary1 hover:bg-white rounded-full p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
        </button> */}
      </div>
      <div className="px-4">
        <h2 className="font-bold text-xl mb-1">{item.name}</h2>
        {/* <p className="text-gray-600 text-sm">Abu Dhabi</p> */}
      </div>
    </div>
  );
}