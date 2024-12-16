'use client'
import React ,{useEffect} from 'react'
import { SelectDemo } from '@/components/SelectDemo';
import { SlidersHorizontal } from 'lucide-react';
import { useStateContext } from '@/contexts/ContextProvider';
import { useReservation } from '@/contexts/ReservationContext';
import { useGetAllArea } from '@/hooks/useFetchArea';
import { useGetAllRooms } from '@/hooks/useFetchRoom';

export default function FilterHeader({isFiltersOpen, toggleFilters}) {
  const {getAllArea}=useGetAllArea()
  const {data,getAllRooms}=useGetAllRooms()
  
  useEffect(()=>{
    getAllArea();
    getAllRooms()


  },[])
  const { Areas } = useStateContext()
  const { SelectedAreaId, setSelectedAreaId } = useReservation()
  
  const activitiesFound = data?.length;

  const handleAreaChange = (value) => {
   
    setSelectedAreaId(value);
  }

  return (
    <div className="w-full my-4 px-4 py-8 flex justify-between items-center sm:flex-col sm:px-2">
      <div className='sm:flex sm:flex-col sm:items-start sm:w-full'>
        <h1 className="text-2xl font-bold mb-2">Choses à Faire à -CNSL</h1>
        <p className="text-gray-600">{activitiesFound} Activités trouvées</p>
   
      </div>
      <div className="flex items-center sm:mt-2 sm:justify-between sm:w-full">
        <span className="font-semibold text-lg mr-12 sm:mr-0 sm:text-sm">Trier par:</span>
        <SelectDemo
       
  options={Areas.map(area => ({ value: area._id, label: area.name }))}
  placeholder="Select Destination"
  onValueChange={handleAreaChange}
  value={SelectedAreaId}
/>
        <div className={`hidden sm:flex border-primary1 border-2 p-2 rounded-full ${isFiltersOpen ? "bg-primary1" : "bg-white"}`}>
          <SlidersHorizontal 
            className={`hidden sm:flex ${isFiltersOpen ? "text-white" : "text-primary1"}`} 
            onClick={toggleFilters} 
          />
        </div>
      </div>
    </div>
  );
}