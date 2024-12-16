"use client"

import React, { useState } from "react"
import { format } from "date-fns"
import {  CalendarDays } from "lucide-react"
{/* <CalendarClock /> */}
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePickerDemo({ date, setDate,title ="", iconColor = "text-primary1", height = "h-10", width = "w-[192px]" }) {
  // const [] = useState()

  return (
    <Popover >
      <PopoverTrigger asChild>
        <div className={`${width}`}> 
        <div className=" font-semibold font-raleway my-2">
{title}
        </div>
        <Button
          variant={"outline"}
          className={cn(
            `${width} ${height} justify-between  text-sm text-left font-normal bg-gray-200 ",
            !date && "text-muted-foreground
          `)}
        >
          {date ? format(date, "MM/dd/yyyy") : <span className="sm:text-xs">Choose Dates</span>}

          <CalendarDays className={`mr-2 sm:mr-0 ${iconColor} `} size={24} />
        </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-white">
        <Calendar
        className='  bg-white bg-opacity-100'
         borderColor="border-blue-500"
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}