"use client"
import React, { createContext, useContext, useState } from 'react';
import { addDays } from 'date-fns';

const ReservationContext = createContext();

export const ReservationProvider = ({ children }) => {
  const initialRange = {
    from: null,
    to: null
  };

  const [selectedDates, setSelectedDates] = useState(initialRange);
  const [minPrice, setMinPrice]= useState(0)
  const [maxPrice, setMaxPrice] = useState(50000)
  const [SelectedAreaId ,setSelectedAreaId ] = useState()
  const [activities , setActivities] = useState([])
  const [guests, setGuests] = useState(null);
  const [triggerFilter, setTriggerFilter] = useState(false);
  const [reservedDays, setReservedDays] = useState([])
  const [selectedActivities, setSelectedActivities ]=useState([])

  const updateSelectedAreaId = (newId) => {
    setSelectedAreaId(newId);
  };
  return (
    <ReservationContext.Provider value={{ 
      selectedDates, setSelectedDates, 
      minPrice, setMinPrice,
      maxPrice, setMaxPrice,
      SelectedAreaId ,setSelectedAreaId:updateSelectedAreaId,
      activities , setActivities,
      guests, setGuests,
      triggerFilter, setTriggerFilter,
      reservedDays, setReservedDays,
      selectedActivities, setSelectedActivities 

      }}>
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservation = () => {
  return useContext(ReservationContext);
};
