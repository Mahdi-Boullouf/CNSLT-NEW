"use client"
import React, { useEffect, useState } from 'react';

import hotelImg from '@/public/hotelImg.png'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import SpecialOfferCard from "./SpecialOfferCard";
import { useGetAllEvents } from "@/hooks/useFetchEvents";

export default function EventSpecial() {

  const { data: allEvents, error, isLoading, getAllEvents } = useGetAllEvents();
 
  const [events, setEvents] = useState(null);
  
useEffect(() => {
  getAllEvents();
}, []);
useEffect(() => {
  if (allEvents) {
    
    setEvents(allEvents);
  }
}, [allEvents]);

  return (
    <div className=" ">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <div className="flex justify-between items-center">
          <div className=" my-6 font-body font-semibold text-primary1 text-6xl sm:text-3xl  text-center ">
          événements 
          </div>
          <div className=" absolute flex items-center space-x-4  right-6 p-2  mx-4">
            <CarouselPrevious className="w-12 h-12 flex items-center justify-center rounded-full shadow-lg shadow-yellow-200 bg-white border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-white transition-colors duration-300" />

            <CarouselNext className="w-12 h-12 flex items-center justify-center rounded-full shadow-lg shadow-yellow-200 bg-white border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-white transition-colors duration-300" />
          </div>
        </div>
        <CarouselContent>
          {events && events.map((event,index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 basis-1/4 sm:basis-full"
            >
              <SpecialOfferCard key={index} event={event} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
