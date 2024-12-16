'use client'
import React from 'react'
import { FiLogIn, FiUser, FiBell, FiLogOut } from 'react-icons/fi';
import man from '@/public/man.png'
import { useAuth } from '@/contexts/AuthContext';

export default function SidBar() {
  const {user} = useAuth() 
  return (
    <div className="bg-white shadow-md   w-64 sm:w-36 h-auto  ">
    <div className="flex flex-col items-center  w-full ">
      <div className="w-full sm:h-16  rounded-full overflow-hidden mb-2 flex justify-center items-center mt-12">
        <img
          src={man.src}
          alt="Profile"
          className=" h-32 w-32 sm:h-16 sm:w-16  object-cover "
        />
      </div>
      <h2 className="text-lg font-semibold">{user?.fullname}</h2>
    </div>
    
    <nav className='  w-full my-6 text-sm'>
      <ul className="space-y-4">
        <li className="py-2 px-4   bg-primary1 text-white ">Profile Information</li>
        {/* <li className="py-2 px-4">Booking History</li>
        <li className="py-2 px-4">Newsletter Subscription</li>
        <li className="py-2 px-4">Manage Notification</li> */}
      </ul>
    </nav>
  </div>
);
};
