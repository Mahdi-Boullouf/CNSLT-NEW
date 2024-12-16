import { DatePickerDemo } from '@/components/ui/DatePickerDemo'
import React from 'react'

export default function DateFilter() {
  return (
    <div className=' shadow-3xl w-full flex flex-col justify-start  max-h-min  ' style={{ zIndex: 50 }} >
      <div className='  font-bold w-full py-4 text-xl border-b-2 border-gray-200 px-12'>
      Disponibilité
      </div>
      <div className='px-6 my-8 '>
      <DatePickerDemo
              title="From"
              iconColor="text-black"
              height="h-12"
              width="w-[240px] sm:w-full"
              borderColor="border-blue-500 bg-white"
            />
                   <DatePickerDemo
              title="to"
              iconColor="text-black"
              height="h-12"
              width="w-[240px] sm:w-full"
              borderColor="border-blue-500"
            />
            <button className='mt-4 bg-primary1 text-white rounded-lg w-full py-4 flex justify-center font-semibold ' >
            check availability
            </button>

      </div>
    </div>
  )
}
