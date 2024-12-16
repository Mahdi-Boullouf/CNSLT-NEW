import React from 'react'
import Image from 'next/image'
import reservationBg from "@/public/reservationBg.jpg";
import TypingAnimation from '@/components/TypingAnimation';
export default function Header() {
  return (
    <div className="static sm:p-0">
    <div className="h-screen">
      <Image src={reservationBg} className="h-screen w-full" />
    </div>
    <div   className=' sm:px-2 flex items-end  sm:items-center pb-32 px-12  bg-gradient-to-tr  from-black  bg-opacity-10 h-screen w-full absolute top-0 ' >
    <TypingAnimation text='Personal Information ' className='text-7xl text-white font-body' />

    </div>
   
  </div>  )
}
