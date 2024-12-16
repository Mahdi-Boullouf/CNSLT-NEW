"use client"
import React from "react";
import { MdLocalHotel } from "react-icons/md";
import { ArrowRight } from "lucide-react";
import { DatePickerDemo } from "@/components/ui/DatePickerDemo";
export default function SearchFlights() {
    // const [value, onChange] = useState(new Date());
  return (
    <div className=" sm:px-2 flex items-end  sm:items-center pb-32 px-12  bg-gradient-to-tr  from-black  bg-opacity-10 h-screen w-full absolute top-0 ">
      <div className="  w-full    ">
        <div className=" h-28 sm:h-16 w-1/6 sm:w-1/2 bg-white rounded-t-3xl text-white flex items-center justify-center  ">
          <div className=" bg-primary1 flex w-2/3  py-6 sm:py-2 rounded-lg  items-center justify-center font-semibold  ">
            <MdLocalHotel size={28} className="mx-2" /> Hotels
          </div>
        </div>

        <div className="  bg-white w-full h-36 rounded-b-3xl rounded-e-3xl grid grid-cols-5 sm:grid-cols-2 sm:h-auto gap-2 items-center">
          <div className=" flex justify-center items-center "></div>
          <div className=" flex justify-center items-center h-2/3 sm:border-l-0 border-l-2 border-gray-200  ">
            <DatePickerDemo
              title="Check in"
              iconColor="text-primary1 "
              height="h-12"
              width="w-[240px] sm:w-[160px]"
              borderColor="border-blue-500"
            />
          </div>
          <div className=" flex justify-center items-center h-2/3 sm:border-0 border-x-2 border-gray-200  ">
            <DatePickerDemo
              title="Check Out "
              iconColor="text-primary1"
              height="h-12"
              width="w-[240px] sm:w-[160px]"
              borderColor="border-blue-500"
            />
          </div>
          <div className=" flex justify-center items-center "></div>
          <div className=" flex justify-center items-end w-full h-2/3 sm:col-span-2  sm:my-2 ">
            <button className="  bg-primary1 text-white rounded-lg w-2/3 py-3 flex justify-between px-2 font-semibold">
              Search flights <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
