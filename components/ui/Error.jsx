"use client";
import React from 'react';
import errorImage from '@/public/404-error.png';
import Image from 'next/image';

export default function Error() {
  return (
    <div className=' w-full flex flex-col items-center justify-center '>
      <Image 
        src={errorImage} 
        alt="Error" 
        className=' w-2/12'
 
      />
            <div className=' text-4xl mt-4 mb-2 font-bold font-body '>Oops !</div>

      <div className=' font-serif text-gray-500 '>Something Went Wrong </div>
    </div>
  );
}
