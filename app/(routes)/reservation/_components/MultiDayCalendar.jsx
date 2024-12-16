"use client";

import React, { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import { eachDayOfInterval, format, differenceInDays, isWithinInterval } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useReservation } from "@/contexts/ReservationContext";

const generateDisabledDates = (reservations) => {
  if (!reservations || !Array.isArray(reservations)) return [];
  return reservations.flatMap((reservation) => {
    const start = new Date(reservation.reservedFrom);
    const end = new Date(reservation.reservedTo);
    return eachDayOfInterval({ start, end });
  });
};

export default function MultiDayCalendar({ room, ...props }) {
  const { selectedDates, setSelectedDates } = useReservation();
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [disabledDays, setDisabledDays] = useState([]);

  useEffect(() => {
    const newDisabledDays = generateDisabledDates(room?.reservations);
    setDisabledDays(newDisabledDays);
    if (selectedDates.from && selectedDates.to) {
      setNumberOfDays(differenceInDays(selectedDates.to, selectedDates.from) + 1);
    } else {
      setNumberOfDays(0);
    }
  }, [selectedDates, room]);

  const handleSelect = (range) => {
    if (!range) {
      setSelectedDates({ from: undefined, to: undefined });
      return;
    }

    const { from, to } = range;
    const isOverlapping = disabledDays.some((disabledDate) => {
      return (
        (from && isWithinInterval(from, { start: disabledDate, end: disabledDate })) ||
        (to && isWithinInterval(to, { start: disabledDate, end: disabledDate }))
      );
    });

    if (!isOverlapping) {
      setSelectedDates(range);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-start border-y-2 border-gray-300 mb-6 py-4 w-10/12">
        <p className="font-semibold text-black text-xl">CNLST</p>
        <p className="text-gray-500 text-sm">
          {selectedDates.from && format(selectedDates.from, "MMM dd, yyyy")}
          {selectedDates.to && ` - ${format(selectedDates.to, "MMM dd, yyyy")}`}
        </p>
      </div>
      <DayPicker
        disabled={disabledDays}
        numberOfMonths={2}
        mode="range"
        selected={selectedDates}
        onSelect={handleSelect}
        classNames={{
          months: "flex sm:flex-col sm:items-start sm:space-x-0 space-x-12 sm:space-y-8",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-medium",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
          row: "flex w-full mt-2",
          cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "h-9 w-12 p-0 font-normal aria-selected:opacity-100 rounded-full"
          ),
          day_selected:
            "bg-primary rounded-full text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          day_today: "bg-accent text-accent-foreground",
          day_outside: "text-muted-foreground opacity-50",
          day_disabled: "text-muted-foreground opacity-50",
          day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
        }}
        components={{
          IconLeft: () => <ChevronLeft className="h-4 w-4" />,
          IconRight: () => <ChevronRight className="h-4 w-4" />,
        }}
        {...props}
      />
    </div>
  );
}
