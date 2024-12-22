"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { useReservation } from "@/contexts/ReservationContext";
import { cn } from "@/lib/utils";

export default function EventDayCalender({ ...props }) {
  const { selectedDates, setSelectedDates } = useReservation();
  const [selectedDay, setSelectedDay] = useState(null);

  // Define fixed dates for each button
  const predefinedDates = [
    { day: 1, date: new Date(2025, 0, 1) }, // January 1st
    { day: 2, date: new Date(2025, 0, 2) }, // January 2nd
    { day: 3, date: new Date(2025, 0, 3) }, // January 3rd
    { day: 4, date: new Date(2025, 0, 4) }, // January 4th
  ];

  const handleDaySelect = (day) => {
    setSelectedDay(day.day);
    setSelectedDates({ from: day.date, to: day.date });
  };

  return (
    <div className="space-y-8">
      <div className="text-start border-y-2 border-gray-300 mb-6 py-4 w-10/12">
        <p className="font-semibold text-black text-xl">CNLST</p>
        <p className="text-gray-500 text-sm">
          {selectedDates.from && format(selectedDates.from, "MMM dd, yyyy")}
        </p>
      </div>
      <div className="flex space-x-4">
        {predefinedDates.map((day) => (
          <button
            key={day.day}
            onClick={() => handleDaySelect(day)}
            className={cn(
              "px-4 py-2 rounded-lg text-white font-semibold",
              selectedDay === day.day ? "bg-blue-600" : "bg-gray-400 hover:bg-blue-500"
            )}
          >
            Day {day.day}: {format(day.date, "MM/dd")}
          </button>
        ))}
      </div>
    </div>
  );
}
