'use client'
import React, { useEffect, useState } from 'react'
import Loading from '@/components/ui/Loading'
import RoomCard from '../_components/RoomCard'
import { useReservation } from '@/contexts/ReservationContext'
import { useGetAllRooms } from '@/hooks/useFetchRoom'
import Error from '@/components/ui/Error'

export default function FilterSection() {
  const { minPrice, maxPrice, selectedActivities, areaId, triggerFilter, SelectedAreaId } = useReservation()
  const { data, error, isLoading, getAllRooms } = useGetAllRooms()
  const [displayedRooms, setDisplayedRooms] = useState([])
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    getAllRooms({minPrice, maxPrice, areaId: SelectedAreaId, activities: selectedActivities})
  }, [triggerFilter, SelectedAreaId])

  useEffect(() => {
    if (data) {
      setDisplayedRooms(data.slice(0, 5))
    }
  }, [data])

  const handleViewMore = () => {
    setShowAll(true)
    setDisplayedRooms(data)
  }

  if (isLoading) return <Loading />
  if (error) return <Error />

  return (
    <div className='w-4/5 sm:w-full overflow-y-auto max-h-auto py-4'>
      <div className="mx-4 grid grid-cols-1 gap-4">
        {displayedRooms.map(activity => (
          <RoomCard key={activity._id} activity={activity} />
        ))}
      </div>
      <div className='  container flex justify-end mt-4'>
      {!showAll && data && data.length > 5 && (
       <button
       onClick={handleViewMore}
       className="  bg-primary1 text-white font-medium py-2 px-4 rounded w-full"
     >
       Voir plus..
     </button>
      )}
    </div>
    </div>
  )
}