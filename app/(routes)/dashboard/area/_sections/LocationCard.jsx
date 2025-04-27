"use client";

import React from "react";
import { Pencil, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getUrlImage } from "@/lib/assistant";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@/contexts/AuthContext";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const LocationCard = ({ data }) => {
  const router = useRouter();
  const { token } = useAuth();

  const onEdit = () => {
    router.push(`/dashboard/area/edit/${data._id}`);
  };
  const onDelete = async () => {
    return await axios
      .post(
        `${BASE_URL}/area/delete`,
        {
          areaId: data._id,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log("response", res);
        router.push("/dashboard/area");
        toast.success("Area deleted successfully");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
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
        <h3 className="absolute bottom-4 left-4 text-white font-bold text-xl">
          {data.name}
        </h3>
      </div>
      <div className="p-5">
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {data.description}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex flex-wrap gap-2 mb-4">
            {data?.activities?.map((activity, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full"
              >
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
          <Button
            className="flex items-center  text-white bg-red-500 hover:bg-red-700 transition-colors duration-200"
            onClick={onDelete}
          >
            <X className="w-4 h-4 mr-2 " />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
