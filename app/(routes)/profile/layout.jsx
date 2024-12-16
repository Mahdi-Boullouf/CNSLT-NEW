"use client"
import React from 'react';
import SidBar from './_sections/SidBar';
import Header from './_sections/Header';


export default function Layout({ children }) {

  return (
    <div className=" ">
        <Header />

<div className='flex'>
<SidBar />  
<main className="  h-screen  w-full">
        

        {children}
      </main>
</div>
       
    </div>
  );
}
