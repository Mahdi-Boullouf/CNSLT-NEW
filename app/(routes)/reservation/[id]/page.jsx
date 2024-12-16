"use client";
import React, { useState ,useEffect } from "react";
import MultiDayCalendar from "../_components/MultiDayCalendar";
import DetailsRoom from "../_sections/DetailsRoom";
import ReservationCard from "../_components/ReservationCard";
import { ReservationConfirmationDialog } from "../_components/ReservationConfirmationDialog";
import { useGetRoomById } from "@/hooks/useFetchRoom";
import { data } from "autoprefixer";
import { useReservation } from "@/contexts/ReservationContext";
import { CiMonitor } from "react-icons/ci";

let total = "0";
export default function page({ params }) {
  const {setReservedDays} = useReservation()
  const roomId = params.id
    const { data, error, isLoading, getRoomById } = useGetRoomById();
    const [season , setSeason ] = useState('no');
  
    useEffect(() => {
      getRoomById(roomId);
      console.log(data);
      
    }, [roomId]);

    let price = data?.pricePerPerson.toString() || "0";
    price = price?.slice(0, -1); 
    const [inSeason = "0", orSeason = "0"] = price?.split(".");

    const no_season = () => {
      setSeason("no")
    }
    const in_season = () => {
      total = parseInt(inSeason);
      setSeason("in")
    }
    const or_season = () => {
      total = parseInt(orSeason);
      setSeason("or")
    }


  return (
    <div className=" container pt-40 ">
      <DetailsRoom room={data} />
      <div className=" flex items-center justify-around mt-6  border-t-2 border-gray-300 py-4   ">
        {
          season === 'no' ? (
            <div className="w-full flex items-center justify-around sm:flex-col sm:w-full sm:p-3 p-20">
              <div className="w-[25%] h-[380px] sm:w-full sm:mb-10 border-solid border-4 pt-8 rounded-3xl shadow-lg flex flex-col items-center justify-between p-5">
                <h1 className="text-gray-500 text-2xl font-bold">Or Season</h1>
                <CiMonitor className="text-3xl  text-green-600" />
                <p className="text-gray-600 text-center">
                  Out-season: December 15 to March 30 and July 15 to October 30
                </p>
                <button
                  onClick={or_season}
                  className="border-4 border-green-400 text-lg text-gray-600 w-[60%] m-5 p-3 rounded-lg"
                >
                  Reserve now
                </button>
              </div>
              <div className="w-[25%] h-[430px] sm:w-full sm:mb-10 border-solid border-4 pt-8 rounded-3xl shadow-lg flex flex-col items-center justify-between p-5">
                <h1 className="text-gray-500 text-2xl font-bold">In Season</h1>
                <CiMonitor className="text-3xl text-green-600" />
                <p className="text-gray-600 text-center">
                  In-season: April 1 to June 15 and September 1 to December 14
                </p>
                <button
                  onClick={in_season}
                  className="border-4 border-green-400 text-lg text-gray-600 w-[60%] m-5 p-3 rounded-lg"
                >
                  Reserve now
                </button>
              </div>
              <div className="w-[25%] h-[380px] sm:w-full sm:mb-10 border-solid border-4 pt-8 rounded-3xl shadow-lg flex flex-col items-center justify-between p-5">
                <h1 className="text-gray-500 text-2xl font-bold">In Event</h1>
                <CiMonitor className="text-3xl text-green-600" />
                <p className="text-gray-600 text-center">
                  Reserve your spot for special events and celebrations at exclusive prices.
                </p>
                <button
                  className="border-4 border-green-400 text-lg text-gray-600 w-[60%] m-5 p-3 rounded-lg"
                >
                  Reserve now
                </button>
              </div>
            </div>

          ): season === 'in' || season === 'or' ?(
            <div className="flex flex-col w-full">
              <div className="flex justify-around w-full sm:flex-col">
                <div className="   col-span-2 lg:col-span-3">
                  <MultiDayCalendar room={data}/>
                </div>
                <div className="w-[50%] sm:w-full sm:col-span-3 col-span-1 lg:col-span-3 flex items-center justify-end sm:justify-center sm:mt-4">
                    <ReservationCard  room={data} season={season} price={total}/>
                </div>
              </div>
              <button onClick={no_season} className="btn text-xl border-4 border-gray-300 w-36 m-5 p-2 rounded-lg">return</button>
            </div>
          ):(
            <div>no date !</div>
          )
        }
        {/* <div className="   col-span-2 lg:col-span-3">
          <MultiDayCalendar room={data}/>
        </div>
        <div className=" sm:col-span-3 col-span-1 lg:col-span-3">
          <ReservationCard  room={data} season={season} />
        </div> */}
      </div>

    </div>
  );
}
