"use client"
import React from 'react';
import { useStateContext } from '@/contexts/ContextProvider';
import LoginReminder from '@/components/LoginReminder';
export default function Layout({ children }) {

  return (
    <div className=" ">
        <LoginReminder/>

          {children}

    </div>
  );
}
