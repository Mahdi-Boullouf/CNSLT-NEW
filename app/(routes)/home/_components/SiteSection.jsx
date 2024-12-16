'use client';

import React, { useEffect } from 'react';
import SiteCard from '../_components/SiteCard';
import { useGetAllRooms } from '@/hooks/useFetchRoom';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';

const SiteSection = ({ site }) => {
  const { data, error, isLoading, getAllRooms } = useGetAllRooms();

  useEffect(() => {
    getAllRooms({ areaId: site._id });
  }, [site._id]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error/>;
  }

  const getBgColor = (siteName) => {
    switch (siteName) {
      case 'Fouka':
        return 'bg-[#2B601C]';
      case 'Tikjda':
        return 'bg-primary1';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <Carousel opts={{ align: 'start', loop: true }}>
      <div className="flex justify-between items-center sm:flex-col sm:h-24">
        <div className={`font-medium rounded-3xl px-8 py-2 text-white uppercase my-8 ${getBgColor(site.name)}`}>
          CNSL-{site.name}
        </div>
        {/* <div className=" flex items-center justify-center space-x-4 right-6 p-2 mx-4">
          <CarouselPrevious className="w-12 h-12 flex items-center justify-center rounded-full shadow-lg shadow-yellow-200 bg-white border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-white transition-colors duration-300" />
          <CarouselNext className="w-12 h-12 flex items-center justify-center rounded-full shadow-lg shadow-yellow-200 bg-white border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-white transition-colors duration-300" />
        </div> */}
      </div>
      <CarouselContent className="sm:overflow-x-auto sm:scrollbar-hide">
        {data?.map((room, index) => (
          <CarouselItem key={index} className="py-2 md:basis-1/2 basis-1/4 sm:basis-full sm:w-[80%]">
            <SiteCard key={room._id} {...room} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default SiteSection;
