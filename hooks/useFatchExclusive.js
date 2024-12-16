import { useState  } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import axios from 'axios';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export function useUpdateExclusive() {
    const { token } = useAuth();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const updateExclusive = async (reservationData) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.post(`${BASE_URL}/notification/create`, reservationData ,{ headers: {
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
  
    return { data, error, isLoading, updateExclusive };
  }

  export function useGetExclusive() {
    const { token } = useAuth();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const getExclusive = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${BASE_URL}/notification/get` ,{ headers: {
          Authorization: token, 
        }});
        setData(response.data.data);
        return response.data.data;
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred');
        throw err;
      } finally {
        setIsLoading(false);
      }
    };
  
    return { data, error, isLoading, getExclusive };
  }
