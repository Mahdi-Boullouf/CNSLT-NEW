import React,{useEffect} from "react";
import Image from "next/image";
import activityImg from "@/public/activityImg.png";
import { useGetAllActivities } from "@/hooks/useFetchRoom";
import { getUrlImage } from "@/lib/assistant";

export default function Activites() {
  const {data:allActivities, error, isLoading,getAllActivities}=useGetAllActivities()
  useEffect(()=>{
    getAllActivities()
  },[])
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="font-body my-8 text-center">
        <div className="text-3xl text-blue-700">
          Les principales activités et services
        </div>
        <div className="text-2xl text-gray-800">que nous offrons</div>
      </div>
      <div className=" grid  grid-cols-4 gap-x-4  grid-rows-3 sm:grid-rows-3  h-96 sm:grid-cols-2 sm:h-auto   " >
        {allActivities?.map((activity, index) => (
          
          <div
            key={activity.name}
              className={`transform transition duration-500 hover:scale-105 hover:shadow-xl relative rounded-xl overflow-hidden my-2 sm:row-span-1
                ${(index + 1) % 2 === 0 && (index + 1) > 4 ? "row-span-2 sm:h-40 " : "row-span-1 sm:h-40 "}
                ${(index + 1) % 2 !== 0 && (index + 1) < 4 ? "row-span-1 sm:h-20 " : "row-span-2 sm:h-20 "}
              `}
          >
           
            <Image
              src={getUrlImage(activity?.picture)}
              alt={activity?.name}
              layout="fill"
              objectFit="cover"
              className="rounded-lg "
            />
            <div className="font-body absolute bottom-2 left-2 bg-white bg-opacity-75 p-1 rounded-xl px-4">
              {activity?.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}