"use client";

import React, { useState, useCallback } from "react";
import { PriceRangeSlider } from "@/components/PriceRangeSlider";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useReservation } from "@/contexts/ReservationContext";

export default function PriceFilter() {
  const { minPrice, setMinPrice, maxPrice, setMaxPrice } = useReservation();
  const [isOpen, setIsOpen] = useState(true);
  const handlePriceRangeChange = useCallback(
    (newRange) => {
      setMinPrice(newRange[0]);
      setMaxPrice(newRange[1]);
    },
    [setMinPrice, setMaxPrice]
  );

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="shadow-3xl w-full flex flex-col justify-center">
      <div
        className="flex justify-between items-center font-bold w-full py-4 text-xl border-b-2 border-gray-200 px-12 cursor-pointer"
        onClick={toggleOpen}
      >
        Price
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </div>
      {isOpen && (
        <div className="px-12 my-8">
          <PriceRangeSlider
            min={0}
            max={50000}
            onChange={handlePriceRangeChange}
          />
        </div>
      )}
    </div>
  );
}
