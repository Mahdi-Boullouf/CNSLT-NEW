import React from 'react';
import { motion } from 'framer-motion';
import DateFilter from '../_components/DateFilter';
import DestinationFilter from '../_components/DestinationFilter';
import DurationFilter from '../_components/DurationFilter';
import ThemeFilter from '../_components/ThemeFilter';
import PriceFilter from '../_components/PriceFilter';
import { useReservation } from '@/contexts/ReservationContext';

export default function FiltersSidebar() {
  const { setTriggerFilter } = useReservation();

  const handleFilterClick = () => {
    setTriggerFilter(prev => !prev);
  };
  return (
    <motion.div 
      className='  border-y border-gray-100  sm:py-12  bg-blur-3xl sm:-mt-10 w-full sm:px-4 sm:bg-gray-0 flex flex-col space-y-4 overflow-y-auto' 
      style={{zIndex:60}}
    >
      {/* <DateFilter /> */}
      <PriceFilter />
      <ThemeFilter />
      <button 
              onClick={handleFilterClick}

      className='mt-4 bg-primary1 text-white rounded-lg w-full py-4 flex justify-center font-semibold ' >
            Filter
      </button>
    </motion.div>
  );
}
