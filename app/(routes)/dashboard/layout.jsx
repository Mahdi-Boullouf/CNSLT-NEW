"use client"
import React from 'react';
import SidbarDashboard from '@/components/SidbarDashboard';
import HeaderDashboard from '@/components/HeaderDashboard';
import { useStateContext } from '@/contexts/ContextProvider';
export default function Layout({ children }) {
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
  useStateContext();
  return (
    <div className="flex z-40">
     {activeMenu && (
        <div className=" bg-gray-200 pt-20 sm:pt-20 w-64 sm:w-0  sm:bg-white ">
          <SidbarDashboard />
        </div>
      )}
             
      <div className={`flex flex-col flex-grow `}>
        <HeaderDashboard />
        <main className="flex-grow p-0 h-screen  overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
