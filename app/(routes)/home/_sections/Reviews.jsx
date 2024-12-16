import React, { useState } from "react";
import ReviewCard from "../_components/ReviewCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const reviewData = [
  { 
    id: 1, 
    content: "Un endroit parfait pour se détendre et se reconnecter avec la nature. Les sentiers de randonnée offrent des vues spectaculaires et les équipements sportifs sont excellents.", 
    author: "John Doe",
    rating: 4.5
  },
  { 
    id: 2, 
    content: "Service exceptionnel ! Le personnel était attentif et serviable. Les chambres sont spacieuses et confortables. Je reviendrai certainement.", 
    author: "Jane Smith",
    rating: 5
  },
  { 
    id: 3, 
    content: "Une expérience culinaire inoubliable. Le restaurant propose des plats locaux délicieux et une carte des vins impressionnante.", 
    author: "Alice Brown",
    rating: 4
  },
  { 
    id: 4, 
    content: "Les activités proposées sont variées et adaptées à tous les âges. Mes enfants ont adoré la piscine et les jeux organisés.", 
    author: "Bob Johnson",
    rating: 4.5
  },
  { 
    id: 5, 
    content: "Un havre de paix au cœur de la nature. Le spa est un véritable plus pour se relaxer après une journée d'activités.", 
    author: "Charlie Green",
    rating: 5
  },
];

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const onPrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviewData.length - 1 : prevIndex - 1
    );
  };

  const onNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === reviewData.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="my-6">
      <div className="container">
        <div className="flex pl-16 sm:pl-2">
          <div className="text-gray-300 text-3xl"></div>
          <div className="my-12">
            <div className="text-secondary2 font-body text-xl font-semibold py-2 flex items-center">
              Les avis de nos invités sur nos services.
            </div>
            <div className="text-gray-500 mb-4 sm:pl-4">
              Découvrez les impressions de nos visiteurs sur les services et les
              conditions de leur prestation
            </div>
          </div>
        </div>
        <div className="flex justify-start pl-24 overflow-hidden p-2 sm:pl-0 w-full h-72 sm:h-80">





        <Carousel
        className='p-2  '
    opts={{
      align: "start",
      loop: true,
    }}
  >
    <div className="flex justify-between items-center">
    
      <div className=" absolute flex items-center space-x-4 top-52 sm:top-64 p-2  mx-4 sm:left-12">
      <CarouselPrevious  className=" w-12 h-12 flex items-center justify-center rounded-lg shadow-3xl text-secondary2 bg-white hover:bg-secondary2 hover:text-white transform transition duration-500 hover:scale-105 hover:shadow-3xl" />

      <CarouselNext className="w-12 h-12 flex items-center justify-center rounded-lg shadow-3xl text-secondary2 bg-white hover:bg-secondary2 hover:text-white transform transition duration-500 hover:scale-105 hover:shadow-3xl"/>
      </div>
    </div>
    <CarouselContent>
      {reviewData.map((review, index) => (
        <CarouselItem key={index} className="sm:basis-full basis-1/2   py-2">
                <ReviewCard review={review} />
                </CarouselItem>
      ))}
    </CarouselContent>
  </Carousel>






        </div>
        {/* <div className="flex items-center space-x-4 my-8 ml-24">
          <button
            onClick={onPrevClick}
            className="w-12 h-12 flex items-center justify-center rounded-lg shadow-3xl transition-colors duration-300"
            aria-label="Previous"
          >
            <IoIosArrowBack className="text-3xl" />
          </button>
          <button
            onClick={onNextClick}
            className="w-12 h-12 flex items-center justify-center rounded-lg shadow-3xl bg-secondary2 text-white transition-colors duration-300"
            aria-label="Next"
          >
            <IoIosArrowForward className="text-3xl" />
          </button>
        </div> */}
      </div>
    </div>
  );
}
