import React from 'react'
import HotelCard from '../_components/HotelCard'
import hotelImg from '@/public/hotelImg.png'
import hotel1 from '@/public/hotel1.png'

// hotel1.png
export default function Featured() {
  return (
    <div className="w-full  ">
    <div className=" text-secondary2 text-6xl  font-body text-center sm:text-4xl">Featured Accommodation</div>
    <div className=" text-gray-500 font-body text-center ">Experience Comfort and Luxury in Every Stay</div>
    <div className="grid  sm:grid-cols-1  grid-cols-4 gap-6  ">
      {[1, 2, 3,4].map((item) => (
        <div key={item}>
          <HotelCard 
            imageSrc={hotelImg}
            rating="4.5"
            name="Paradise Cove Inn"
            location="Djurdjura"
          />
        </div>
      ))}
    </div>
  </div>
  )
}
