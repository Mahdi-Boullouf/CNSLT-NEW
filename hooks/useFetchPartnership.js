import { useState  } from 'react';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL


export function useGetAllPartnership() {
    const { token } = useAuth();
  
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  
    const getAllPartnership  = async (Data) => {
      setIsLoading(true);
      setError(null);
  
      try {
        const response = await axios.get(`${BASE_URL}/files/all`, { headers: {
          Authorization: token, 
        }});
        setData(response.data.data.files);
        return response.data.data.files;
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred');
        throw err;
      } finally {
        setIsLoading(false);
      }
    };
  
    return { data, error, isLoading, getAllPartnership  };
  }
  
  export function useDeletPartnership() {
    const { token } = useAuth();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  
    const deletPartnership  = async (id) => {
      setIsLoading(true);
      setError(null);
  
      try {
        const response = await axios.post(`${BASE_URL}/files/delete/${id}`,{}, { headers: {
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
  
    return { data, error, isLoading, deletPartnership  };
  }
  