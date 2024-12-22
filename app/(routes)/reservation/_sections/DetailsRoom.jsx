"use client"
import React, { useState } from "react";
import { FaRegStar, FaRegHeart, FaHeart } from "react-icons/fa";
import { PiMedal } from "react-icons/pi";
import { FaShareFromSquare } from "react-icons/fa6";
import Image from "next/image";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/Loading";
import { LuLayoutGrid } from "react-icons/lu";
import { getUrlImage } from "@/lib/assistant";
import { usePathname } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
// import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function DetailsRoom({room}) {
  const pathName =usePathname()
  const [isSaved, setIsSaved] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);

  return (
    <div className="mt-24">
      <div className="my-4">
        <div className="font-raleway text-7xl text-center text-primary2 my-6 sm:text-4xl font-medium">
          RESERVATION
        </div>
        <div className="text-black font-semibold text-xl font-raleway">{room?.name}</div>
        <div className="flex justify-between text-gray-500 my-2 space-x-6">
          <div className="flex items-center space-x-2 sm:flex-col sm:items-start sm:justify-center">
            {/* <div className="flex items-center space-x-2 sm:space-x-0">
              <FaRegStar className="text-red-700"/>
              <span className="text-black font-bold text-lg sm:mx-2">4.3</span>
              <div className="text-black font-bold underline decoration-1">7 reviews</div>
            </div> */}
            <div className="flex items-center space-x-2 sm:space-x-0 sm:items-start">
              <PiMedal className="text-red-700" />
              <span>Superhost</span>
            </div>
            <div className="underline decoration-1"><span className="font-bold uppercase border-l border-gray-300 px-2">{room?.areaId.name}</span></div>
          </div>
          {/* <div className="sm:flex-col sm:items-start sm:justify-center flex items-center text-black space-x-4 sm:space-x-0 sm:space-y-4 font-semibold">
            <button 
              className="flex items-center space-x-2"
              onClick={() => setIsShareOpen(true)}
            >
              <FaShareFromSquare />
              <span>Share</span>
            </button>
            <button 
              className="flex items-center space-x-2"
              onClick={() => setIsSaved(!isSaved)}
            >
              {isSaved ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
              <span>Save</span>
            </button>
          </div> */}
        </div>
      </div>

      <div className="w-full h-80  grid grid-cols-4 sm:grid-cols-2 grid-rows-2 sm:grid-rows-4 rounded-lg gap-2 relative">
        {[0, 1, 2, 3, 4].map((index) => (
          <div key={index} className={`${index === 0 ? 'row-span-2 col-span-2 sm:col-span-2 sm:row-span-2  ' : 'row-span-1 col-span-1'} relative`}>
            {room?.images && room.images[index] ? (
              <Image
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
                src={getUrlImage(room.images[index])}
                alt={`Room image ${index + 1}`}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg">
                <Loading/>
              </div>
            )}
          </div>
        ))}
        <Button 
          className="font-semibold mx-1 absolute bottom-4 right-4 bg-white text-black hover:bg-gray-100 bg-opacity-80 border-2 border-gray-200"
          onClick={() => setIsCarouselOpen(true)}
        >
          <LuLayoutGrid />

          View all photos
        </Button>
      </div>

      <Dialog open={isShareOpen} onOpenChange={setIsShareOpen} className="rounded-lg">
        <DialogContent className="rounded-lg">
          <div className="grid flex-1 gap-2 m-4">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={pathName}
              readOnly
            />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isCarouselOpen} onOpenChange={setIsCarouselOpen} className='bg-opacity-40  w-10/12 '>
        <DialogContent className="max-w-4xl w-full p-0 bg-opacity-40">
        <Carousel className= "  w-full   h-96 bg-opacity-40">
        <CarouselContent className="bg-opacity-40 ">
            {room?.images?.map((image, index) => (
              <CarouselItem className='flex justify-center basis-1/2 sm:basis-1'  key={index}>
                <img 
                 className=" h-96 "
                  src={getUrlImage(image)}
                  alt={`Room image ${index + 1}`}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious   />
      <CarouselNext  />
    </Carousel>
        </DialogContent>
      </Dialog>
    </div>
  );
}