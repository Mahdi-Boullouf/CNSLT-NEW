"use client";
import React, { useState, useEffect } from "react";
import MultiDayCalendar from "../_components/MultiDayCalendar";
import EventDayCalender from "../_components/EventDayCalender";
import DetailsRoom from "../_sections/DetailsRoom";
import ReservationCard from "../_components/ReservationCard";
import { ReservationConfirmationDialog } from "../_components/ReservationConfirmationDialog";
import { useGetRoomById } from "@/hooks/useFetchRoom";
import { data } from "autoprefixer";
import { useReservation } from "@/contexts/ReservationContext";
import { CiMonitor } from "react-icons/ci";

let total = "0";
let status = "0";
export default function page({ params }) {
  const { setReservedDays } = useReservation();
  const roomId = params.id;
  const { data, error, isLoading, getRoomById } = useGetRoomById();
  const [season, setSeason] = useState("no");

  useEffect(() => {
    getRoomById(roomId);
    console.log(data);
  }, [roomId]);

  let price = data?.pricePerPerson.toString() || "0";
  const [inSeason = "0", orSeason = "0"] = price?.split(".");
  total = parseInt(inSeason);
  status = parseInt(orSeason);

  // const no_season = () => {
  //   setSeason("no")
  // }
  // const in_season = () => {
  //   setSeason("in")
  // }
  // const or_season = () => {
  //   total = parseInt(orSeason);
  //   setSeason("or")
  // }
  // const events = () => {
  //   total = "8000"
  //   setSeason("event")
  // }

  return (
    <div className=" container pt-40 ">
      <DetailsRoom room={data} />
      <div className=" flex items-center justify-around mt-6  border-t-2 border-gray-300 py-4   ">
        {/* {
          season === 'no' ? (
            <div className="w-full flex items-center justify-around sm:flex-col sm:w-full sm:p-3 p-20">
              <div className="w-[25%] h-[380px] sm:w-full sm:mb-10 border-solid border-4 pt-8 rounded-3xl shadow-lg flex flex-col items-center justify-between p-5">
                <h1 className="text-gray-500 text-2xl font-bold">Hors saison</h1>
                <CiMonitor className="text-3xl  text-green-600" />
                <p className="text-gray-600 text-center">
                  Hors saison : du 15 décembre au 30 mars et du 15 juillet au 30 octobre
                </p>
                <button
                  onClick={or_season}
                  className="border-4 border-green-400 text-lg text-gray-600 w-[60%] m-5 p-3 rounded-lg"
                >
                  Reserve now
                </button>
              </div>
              <div className="w-[25%] h-[430px] sm:w-full sm:mb-10 border-solid border-4 pt-8 rounded-3xl shadow-lg flex flex-col items-center justify-between p-5">
                <h1 className="text-gray-500 text-2xl font-bold">Basse saison</h1>
                <CiMonitor className="text-3xl text-green-600" />
                <p className="text-gray-600 text-center">
                  Basse saison : 01Avril – 15Juin et  01Septembre -14 décembre
                </p>
                <button
                  onClick={in_season}
                  className="border-4 border-green-400 text-lg text-gray-600 w-[60%] m-5 p-3 rounded-lg"
                >
                  Reserve now
                </button>
              </div>
              <div className="w-[25%] h-[380px] sm:w-full sm:mb-10 border-solid border-4 pt-8 rounded-3xl shadow-lg flex flex-col items-center justify-between p-5">
                <h1 className="text-gray-500 text-2xl font-bold">événements</h1>
                <CiMonitor className="text-3xl text-green-600" />
                <p className="text-gray-600 text-center">
                  Lors des événements : Les offres pendant les événements 
                </p>
                <button
                onClick={events}
                  className="border-4 border-green-400 text-lg text-gray-600 w-[60%] m-5 p-3 rounded-lg"
                >
                  Reserve now
                </button>
              </div>
            </div>

          ): season === 'in' || season === 'or' || season === 'event' ?( */}
        <div className="flex flex-col w-full">
          <div className="flex justify-around w-full sm:flex-col">
            <div className="   col-span-2 lg:col-span-3">
              {/* {
                    season === 'event' ?(
                      <EventDayCalender room={data}/>
                    ):(
                      <MultiDayCalendar room={data}/>
                      )
                      } */}
              <MultiDayCalendar room={data} />
            </div>
            <div className="w-[50%] sm:w-full sm:col-span-3 col-span-1 lg:col-span-3 flex items-center justify-end sm:justify-center sm:mt-4">
              <ReservationCard
                room={data}
                season={season}
                price={total}
                status={status}
              />
            </div>
          </div>
          {/* <button className="btn text-xl border-4 border-gray-300 w-36 m-5 p-2 rounded-lg">return</button> */}
        </div>
        {/* // ):( */}
        {/* //   <div>no date !</div> */}
        {/* // ) */}
        {/* } */}
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
