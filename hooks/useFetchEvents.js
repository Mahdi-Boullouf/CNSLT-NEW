import { useState  } from 'react';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
import { useStateContext } from '@/contexts/ContextProvider';

export function useCreateEvant() {
  const { token } = useAuth();

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const createEvent = async (Data) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.post(`${BASE_URL}/events`, Data,{ headers: {
          Authorization: token, 
        }});
        setData(response.data);
        return response.data;
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred');
        throw err;
      } finally {
        setIsLoading(false);
      }
    };
  
    return { data, error, isLoading, createEvent };
  }
  export function useGetAllEvents() {
    const {setAreas}= useStateContext()
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const getAllEvents = async (Data) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${BASE_URL}/events` );
       
        setData(response.data.data);
        setAreas(response.data.data)

        return response.data.data;
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred');
        throw err;
      } finally {
        setIsLoading(false);
      }
    };
    return { data, error, isLoading, getAllEvents };
  }
  

  
export function useDeleteEvent() {
  const { token } = useAuth();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const deleteEvent= async (Data) => {
    setIsLoading(true);
    setError(null);

    try {
      
      const response = await axios.delete(`${BASE_URL}/events/${Data}`,{ headers: {
        Authorization: token, 
      }});
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, deleteEvent  };
}

  
