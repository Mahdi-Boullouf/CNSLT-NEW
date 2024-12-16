"use client"

import React from 'react'
import Image from 'next/image';

export default function Dashboard() {
  return (
    <div 
      className="w-full bg-[url('/dashboard-01.svg')] bg-cover  h-screen m-0 p-0"
    >
      {/* <img src="/dashboard-01.svg" alt="photo" srcset="" /> */}
      <div className='w-[100%] h-[30%] flex justify-center items-center'>
        {/* <Image 
          src='/logo.png'
          width={100}
          height={100}
          layout="fill"
          priority
          className='h-28 w-28'
          alt="logo" srcset=""
        /> */}
        <img src="/logo.png" alt="logo" srcset="" className='w-28 h-28 priority' />
      </div>
      <div className='h-[60%] flex justify-around pl-10 pr-10 sm:flex-col sm:item-center'>
        <img src="ds-01.png" alt="computer" srcset="" className='w-[50%] h-[100%]  priority sm:w-full priority' />
        <img src="/dashboard-06.svg" alt="description" srcset="" className='w-[40%] h-[60%] mt-[3%] mr-[3%] priority sm:w-full sm:m-0 relative sm:left-6' />
      </div>
      <div className='flex items-center justify-between w-full h-[10%] text-gray-300 p-5'>
          <p>Developed by <span className='text-xl font-bold'>Lighten°</span></p>
          <p>version 1.0.0</p>
      </div>
    </div>
  )
}