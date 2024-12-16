"use client";

import React from "react";
import Select from 'react-select';
import { cn } from "@/lib/utils";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    boxShadow: state.isFocused ? 'white' : provided.boxShadow,
    borderColor: state.isFocused ? 'transparent' : 'transparent',
    '&:hover': {
      borderColor: 'transparent',
    },

  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#f0f0f0' : provided.backgroundColor,
  }),
};

const selectClassName = cn(
  "z-50 bg-red-600 p-1 mx-2 flex bg-white h-10 w-full items-center justify-between rounded-md border border-input bg-background  text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
);

export function SelectDemo({ options, placeholder, onValueChange ,value}) {
  return (
    <div className=" z-50 sm:w-2/3 w-96 md border border-input bg-background rounded-lg mx-1 p-1">
    <Select
      options={options}
      styles={customStyles}
      placeholder={placeholder}
      onChange={(selectedOption) => onValueChange(selectedOption.value)}
    />
    </div>

  );
}