"use client"

import React from "react"
import { Checkbox } from "@/components/ui/checkbox"

export function CheckboxDemo({ label, checked, onCheckedChange }) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox 
        id="checkbox" 
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
      <label
        htmlFor="checkbox"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  )
}