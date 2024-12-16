"use client"

import React, { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"

export function PriceRangeSlider({ min = 0, max = 1000, onChange }) {
  const [range, setRange] = useState([min, max])

  useEffect(() => {
    onChange(range)
  }, [range, onChange])

  const handleSliderChange = (newRange) => {
    setRange(newRange)
  }

  const handleInputChange = (index, value) => {
    const newValue = Number(value)
    if (!isNaN(newValue)) {
      const newRange = [...range]
      newRange[index] = Math.max(min, Math.min(max, newValue))
      setRange(newRange)
    }
  }

  return (
    <div className="space-y-4">
      <Slider
        min={min}
        max={max}
        step={1}
        value={range}
        onValueChange={handleSliderChange}
        className="w-full"
      />
      <div className="flex justify-between items-center">
        <Input
          type="number"
          value={range[0]}
          onChange={(e) => handleInputChange(0, e.target.value)}
          className="w-20 p-1 text-center"
        />
        <span className="mx-2 font-semibold">to</span>
        <Input
          type="number"
          value={range[1]}
          onChange={(e) => handleInputChange(1, e.target.value)}
          className="w-20 p-1 text-center"
        />
      </div>
    </div>
  )
}