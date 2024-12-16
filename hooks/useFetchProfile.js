import { useState  } from 'react';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export function useChangePassword() {
    const { token } = useAuth();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const changePassword = async (Data) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.post(`${BASE_URL}/auth/change-password`, Data ,{ headers: {
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
    return { data, error, isLoading, changePassword };
}