"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import homeImg from "@/public/homeImg.jpg";
import Link from "next/link";
import { useGetAllArea } from "@/hooks/useFetchArea";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { getUrlImage } from "@/lib/assistant";
export default function Offers() {
  const { data: allAreas, error, isLoading, getAllArea } = useGetAllArea();

  useEffect(() => {
    getAllArea();
  }, []);
  isLoading && <Loading />;
  error && <Error />;

  return (
    <div className=" w-full mt-6 ">
      <h1 className="text-3xl font-semibold text-center mb-2 font-body">
        <span className="text-primary1 ">Accédez a des offres exceptionnelles</span>
      </h1>
      <p className="text-center mb-8 font-body  text-gray-500 ">
        pour votre prochain séjour
      </p>

      <div className="overflow-x-auto scrollbar-hide flex gap-4 p-4 pb-10 sm:flex-col sm:w-full">
  {allAreas?.map((location, index) => (
    <div
      key={location?._id}
      className="card card-compact bg-base-100 w-96 shadow-xl flex-shrink-0 h-[400px] flex flex-col justify-around sm:w-[100%] sm:mb-7"
    >
      <figure>
        <Image
          src={getUrlImage(location?.photo)}
          alt={location?.name}
          width={700}
          height={700}
          className="w-full h-48 object-cover rounded-t-lg"
          loading="lazy" // Optimize image loading
        />
      </figure>
      <div className="card-body h-full flex flex-col justify-around p-5 pt-10 ">
        <h2 className="card-title text-primary">{location?.name}</h2>
        <p className="text-sm text-gray-600">
          Découvrez l'élégance d'un séjour inoubliable. Cliquez ci-dessous pour plus de détails !
        </p>
        <br />
        <div className="card-actions justify-end">
          <Link
            href={`hotel/${location?._id}`}
            className="btn btn-primary bg-blue-300 text-gl p-4 rounded-lg"
          >
            Explorez
          </Link>
        </div>
      </div>
    </div>
  ))}
</div>

    </div>
  );
}
