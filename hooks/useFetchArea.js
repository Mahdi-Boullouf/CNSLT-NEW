import { useState  } from 'react';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
import { useStateContext } from '@/contexts/ContextProvider';

export function useCreateArea() {
  const { token } = useAuth();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const createArea = async (reservationData) => {
      console.log('data result ',reservationData);
      
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.post(`${BASE_URL}/area/create`, reservationData ,{ headers: {
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
  
    return { data, error, isLoading, createArea };
  }
  export function useGetAllArea() {
    const { token } = useAuth();
    const {setAreas}= useStateContext()
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const getAllArea = async (Data) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${BASE_URL}/area/all/` );
    
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
    return { data, error, isLoading, getAllArea };
  }


  export function useUpdateArea() {
    const { token } = useAuth();

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  
    const updateArea  = async (Data) => {
      setIsLoading(true);
      setError(null);
  
      try {
        const response = await axios.post(`${BASE_URL}/area/update/`, Data, { headers: {
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
  
    return { data, error, isLoading, updateArea  };
  }