"use client";
import React, { useState } from "react";
import reservationBg from "@/public/cnsl-images/Reserve maintenant/IMG_0994~1.jpg";
import Image from "next/image";
import SearchFlights from "./_components/SearchFlights";
import FilterHeader from "./_sections/FilterHeader";
import FiltersSidebar from "./_sections/FiltersSidebar";
import FilterSection from "./_sections/FilterSection";
import PressCoverage from "./_sections/PressCoverage";
import { motion, AnimatePresence } from "framer-motion";
import { useStateContext } from "@/contexts/ContextProvider";
import TypingAnimation from "@/components/TypingAnimation";

const sidebarVariants = {
  open: { 
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 50
    }
  },
  closed: { 
    x: "-100%",
    transition: {
      type: "spring",
      stiffness: 300,
      damping:50
    }
  }
};

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

export default function Reservation() {
  const {screenSize}= useStateContext()
  const [value, onChange] = useState(new Date());
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  return (
    <div className=" w-full">
      <div className="static sm:p-0">
        <div className="sm:h-[60vh]">
          <Image src={reservationBg} className="h-screen object-cover w-full sm:h-[60vh]" />
        </div>
        <div
          className=' sm:px-2 flex items-end  sm:items-center  pb-32 sm:pb-8 px-12   bg-gradient-to-tr  from-black  bg-opacity-10 sm:h-[60vh] h-screen w-full absolute top-0 ' >
      <TypingAnimation text='Reserve maintenant' 
      className='text-7xl sm:text-5xl text-white font-body' />
      </div>
        {/* <SearchFlights /> */}
      </div>
      <div className="w-full p-8 sm:p-0">
        <FilterHeader toggleFilters={toggleFilters} isFiltersOpen={isFiltersOpen}/>
        <div className="flex ">

        <AnimatePresence>
            {(isFiltersOpen || screenSize > 768) && (
              <motion.div
              style={{zIndex:44}}
                className="w-1/5 sm:w-full bg-white sm:absolute bg-opacity-20 backdrop-blur-3xl	 "
                initial="closed"
                animate="open"
                exit="closed"
                variants={sidebarVariants}
              >
                <FiltersSidebar isFiltersOpen={isFiltersOpen} />
              </motion.div>
            )}
          </AnimatePresence>


          <FilterSection />
        </div>
      </div>
      <PressCoverage />
    </div>
  );
}
