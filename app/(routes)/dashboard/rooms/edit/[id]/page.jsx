"use client"
import React ,{useEffect} from 'react'
import { useGetRoomById } from '@/hooks/useFetchRoom';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import GoBack from '@/components/GoBack';
import EditRoom from '@/components/EditRoom';

export default function page({params}) {
    const roomId = params.id
    const { data, error, isLoading, getRoomById } = useGetRoomById();
  
    useEffect(() => {
      getRoomById(roomId);
      
    }, [roomId]);
    isLoading ? <Loading/>:null
    error ? <Error /> :null

  return (
    <div>
          <GoBack title="Edit Room" />
          <EditRoom room={data} />

      </div>
  )
}
