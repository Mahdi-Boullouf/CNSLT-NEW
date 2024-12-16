import React from 'react';
import { Button } from "@/components/ui/button";
import { MdOutlineFileDownload } from "react-icons/md";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function ServiceCard({ id, title, description, images }) {
  const isOdd = id % 2 === 0;

  const ImageCarousel = (
    <div className="w-1/2 sm:w-full  sm:mb-4 sm:mt-2 relative mx-2">
      <Carousel>
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <img src={image.src} alt={` Service image ${index + 1}`} className=" rounded-lg w-full h-64 object-cover" />
            </CarouselItem>
          ))}
        </CarouselContent>
        {images?.length > 1 ?
          <div>
 <CarouselPrevious className=' absolute    left-4  hover:bg-primary1 ring-2 ring-primary1 border-0' />
 <CarouselNext className=' hover:bg-primary1  absolute right-4 ring-2 ring-primary1 border-0' />
 </div> : <></>
        }
       
      </Carousel>
    </div>
  );

  const ContentSection = (
    <div className="w-1/2 sm:w-full mx-2 sm:mb-4">
      <h2 className="font-bold text-4xl mb-2 font-raleway sm:text-xl text-center  text-primary2  py-2 ">{title}</h2>
      <p className=" font-medium font-body text-lg px-2 sm:text-base text-center text-secondary2">{description}</p>

    </div>
  );

  return (
    <div className=" flex my-20 font-raleway sm:flex-col  ">
      <div className={` flex sm:flex-col justify-between w-full ${isOdd ? 'flex-row' : 'flex-row-reverse'}`}>
       {ContentSection}
        {ImageCarousel}
      </div>
    </div>
  );
}
