
import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { ArrowLeft, ArrowRight } from "lucide-react"
import { ChevronLeft } from 'lucide-react';

const NavigationArrows = ({prevSlide , nextSlide}) => {


  return (
    <div className="flex items-center space-x-4">
      <button 
  onClick={prevSlide}
  className="w-12 h-12 flex items-center justify-center rounded-full shadow-lg shadow-yellow-200 bg-white border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-white transition-colors duration-300"
        aria-label="Previous"
      >
        <IoIosArrowBack className="text-2xl" />
      </button>
      <button 
  onClick={nextSlide}
  className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-400 text-white hover:bg-yellow-500 transition-colors duration-300"
        aria-label="Next"
      >
        <IoIosArrowForward className="text-2xl" />
      </button>
    </div>
  );
};

export default NavigationArrows;