import { useState  } from 'react';
import axios from 'axios';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
import { useAuth } from '@/contexts/AuthContext';

export function useCreateDevis() {
    
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const createDevis = async (Data) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.post(`${BASE_URL}/devis/create/`, Data )
        setData(response.data);
        return response.data;
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred');
        throw err;
      } finally {
        setIsLoading(false);
      }
    };
  
    return { data, error, isLoading, createDevis };
  }
  export function useGetAllDevis() {
    const { token } = useAuth();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const getAllDevis = async (Data) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${BASE_URL}/devis/all` , { headers: {
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
    return { data, error, isLoading, getAllDevis };
  }


  