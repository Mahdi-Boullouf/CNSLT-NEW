"use client"

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { CheckboxGroup } from '@/components/CheckboxGroup';

export default function DurationFilter() {
  const [items, setItems] = useState([
    { id: 'notifications', label: 'Receive notifications', checked: false },
    { id: 'newsletter', label: 'Subscribe to newsletter', checked: false },
    { id: 'updates1', label: 'Automatic updates', checked: true },
    { id: 'updates2', label: 'Automatic updates', checked: true },
    { id: 'updates3', label: 'Automatic updates', checked: true },
  ]);

  const [isOpen, setIsOpen] = useState(false); // State to manage the visibility of CheckboxGroup

  const handleCheckedChange = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: true } : { ...item, checked: false }
    ));
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='shadow-3xl w-full flex flex-col justify-center'>
      <div
        className='flex justify-between items-center font-bold w-full py-4 text-xl border-b-2 border-gray-200 px-12 cursor-pointer'
        onClick={toggleOpen}
      >
        Duration
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </div>
      {isOpen && (
        <div className='px-12 my-8'>
          <CheckboxGroup 
            items={items}
            onCheckedChange={handleCheckedChange}
          />  
        </div>
      )}
    </div>
  );
}
