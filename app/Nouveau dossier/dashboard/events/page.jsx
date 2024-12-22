"use client";

import React, { useEffect, useState } from 'react';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import { Plus } from "lucide-react";
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useGetAllEvents, useDeleteEvent } from '@/hooks/useFetchEvents';
import EventCard from './_sections/EventCard';

export default function evants() {
  const router = useRouter();
  const { data: allEvents, error, isLoading, getAllEvents } = useGetAllEvents();
  const { deleteEvent } = useDeleteEvent();
  const [events, setEvents] = useState(null);

  useEffect(() => {
    getAllEvents();
  }, []);

  useEffect(() => {
    if (allEvents) {
     
      setEvents(allEvents);
    }
  }, [allEvents]);

  const handleAddAreaClick = () => {
    router.push('/dashboard/events/addevent');
  };

  const handleDelete = async (eventId) => {
    try {
      await deleteEvent(eventId);
      setEvents(events.filter((event) => event._id !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <div className="ag-theme-alpine h-[600px]" style={{ height: 600, width: '100%' }}>
      <div className='text-4xl font-raleway font-semibold mb-4'>
        Events
      </div>
      <div className=' flex justify-between items-center mb-4'>
        <div className='flex justify-between items-center w-full'>
          <div className='sm:flex-col flex text-base text-primary1 items-start space-x-2'>
            <div>All Events ({events?.length || 0})</div>
          </div>
          <Button
            onClick={handleAddAreaClick}
            className='border  bg-transparent border-primary1 text-primary1 hover:bg-primary1  hover:text-white  rounded-full font-bold text-lg'
          >
            <Plus className='w-8' />
            Add a New Event
          </Button>
        </div>
      </div>
      <div className="grid  sm:grid-cols-1 md:grid-cols-1  lg:grid-cols-2 grid-cols-3 gap-4 p-4">
        {events && events.map((event) => (
          <EventCard key={event._id} data={event} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}