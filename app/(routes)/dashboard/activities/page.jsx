"use client";

import React, { useEffect, useState } from 'react';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import { Plus } from "lucide-react";
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useGetAllActivities  } from '@/hooks/useFetchRoom';
import ActivitiesCard from './_sections/ActivitiesCard';
import { useDeleteActivitie } from '@/hooks/useFetchRoom';
export default function activities() {
  const router = useRouter();
  const { data: allActivities, error, isLoading, getAllActivities } = useGetAllActivities();
  const { data, error:err, isLoading:lamd, deletActivities } = useDeleteActivitie();
  const [Activities, setActivities] = useState(null);

  useEffect(() => {
    getAllActivities();
  }, []);

  useEffect(() => {
    if (allActivities) {
      setActivities(allActivities);
    }
  }, [allActivities]);

  const handleAddActivitieClick = () => {
    router.push('/dashboard/activities/add-activitie');
  };

  const handleDelete = async (activitieId) => {
    try {
      await deletActivities(activitieId);
      setActivities(Activities.filter((activitie) => activitie._id !== activitieId));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <div className="ag-theme-alpine h-[600px]" style={{ height: 600, width: '100%' }}>
      <div className='text-4xl font-raleway font-semibold mb-4'>
      Activities
      </div>
      <div className=' flex justify-between items-center mb-4'>
        <div className='flex justify-between items-center w-full'>
          <div className='sm:flex-col flex text-base text-primary1 items-start space-x-2'>
            <div>All Events ({Activities?.length || 0})</div>
          </div>
          <Button
            onClick={handleAddActivitieClick}
            className='border  bg-transparent border-primary1 text-primary1 hover:bg-primary1  hover:text-white  rounded-full font-bold text-lg'
          >
            <Plus className='w-8' />
            Add a New Activity
          </Button>
        </div>
      </div>
      <div className="grid  sm:grid-cols-1 md:grid-cols-1  lg:grid-cols-2 grid-cols-3 gap-4 p-4">
        {Activities && Activities.map((Activitie) => (
          <ActivitiesCard key={Activitie._id} data={Activitie} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  )
}
