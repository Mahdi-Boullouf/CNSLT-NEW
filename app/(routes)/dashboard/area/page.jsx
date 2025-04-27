"use client";
import React, { useEffect } from "react";
import { useGetAllArea } from "@/hooks/useFetchArea";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import LocationCard from "./_sections/LocationCard";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AreaPage() {
  const router = useRouter();

  const { data: allAreas, error, isLoading, getAllArea } = useGetAllArea();

  useEffect(() => {
    getAllArea();
  }, [router]);
  if (isLoading) return <Loading />;
  if (error) return <Error />;

  const handleAddAreaClick = () => {
    router.push("/dashboard/area/addarea");
  };
  return (
    <div
      className="ag-theme-alpine h-[600px]"
      style={{ height: 600, width: "100%" }}
    >
      <div className="text-4xl font-raleway font-semibold mb-4">Areas</div>
      <div className=" flex justify-between items-center mb-4">
        {/* <div className='sm:flex-col flex text-base text-primary1 items-start space-x-2'>
        <div>All Rooms ({rooms.length || 0})</div>
        <div>Available Rooms (TBD)</div>
        <div>Booked Rooms (TBD)</div>
      </div> */}
        <div className="flex justify-between items-center w-full">
          <div className="sm:flex-col flex text-base text-primary1 items-start space-x-2">
            <div>All Areas ({allAreas?.length || 0})</div>
          </div>
          <Button
            onClick={handleAddAreaClick}
            className="border  bg-transparent border-primary1 text-primary1 hover:bg-primary1  hover:text-white  rounded-full font-bold text-lg"
          >
            <Plus className="w-8" />
            Add a New Area
          </Button>
        </div>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-1  lg:grid-cols-2 grid-cols-3 gap-4 p-4">
        {allAreas &&
          allAreas.map((area) => <LocationCard key={area._id} data={area} />)}
      </div>
    </div>
  );
}
