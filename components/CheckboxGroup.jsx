"use client"

import React from "react"
import { Checkbox } from "@/components/ui/checkbox"

export function CheckboxGroup({ items, onCheckedChange ,className }) {
  return (
    <div className={className}>
      {items?.map((item) => (
        <div key={item.id} className="flex items-center space-x-2 col-span-1 row-span-1  h-8 ">
          <Checkbox 
            id={item.id} 
            checked={item.checked}
            onCheckedChange={(checked) => onCheckedChange(item.id, checked)}
          />
          <label
            htmlFor={item.id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {item.label}
          </label>
        </div>
      ))}
    </div>
  )
}