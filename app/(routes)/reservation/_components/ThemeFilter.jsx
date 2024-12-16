"use client"

import React, { useState, useCallback, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { CheckboxGroup } from '@/components/CheckboxGroup';
import { useReservation } from '@/contexts/ReservationContext';
import { useGetAllActivities } from "@/hooks/useFetchRoom";
import Loading from '@/components/ui/Loading';

const headerClasses = 'flex justify-between items-center font-bold w-full py-4 text-xl border-b-2 border-gray-200 px-12 cursor-pointer';

export default function ThemeFilter() {
  const { data: allActivities,error,isLoading, getAllActivities } = useGetAllActivities();
  const { selectedActivities, setSelectedActivities } = useReservation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getAllActivities();
  }, []);

  useEffect(() => {
    if (allActivities && selectedActivities.length === 0) {
      setSelectedActivities([]);
    }
  }, []);

  const handleCheckedChange = useCallback((id) => {
    setSelectedActivities(prev => {
      if (prev.includes(id)) {
        return prev.filter(activityId => activityId !== id);
      } else {
        return [...prev, id];
      }
    });
  }, [setSelectedActivities]);

  const toggleOpen = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const items = allActivities?.map(activity => ({
    id: activity._id,
    label: activity.name,
    checked: selectedActivities.includes(activity._id)
  })) || [];
  if (isLoading) return <Loading/>

  return (
    <div className='shadow-3xl w-full flex flex-col justify-center'>
      <div className={headerClasses} onClick={toggleOpen}>
        Activités
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </div>
      {isOpen && (
        <div className='px-12 my-8'>
          <CheckboxGroup
            className="space-y-2"
            items={items}
            onCheckedChange={handleCheckedChange}
          />
        </div>
      )}
    </div>
  );
}