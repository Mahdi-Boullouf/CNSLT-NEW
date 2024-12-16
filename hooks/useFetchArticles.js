import { useState  } from 'react';
import axios from 'axios';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
import { useAuth } from '@/contexts/AuthContext';

export function useCreateArticle() {
  const { token } = useAuth();
    
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const createArticle = async (Data) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.post(`${BASE_URL}/articles/create/`, Data, { headers: {
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
  
    return { data, error, isLoading, createArticle };
  }
  
  export function useGetAllArticles() {
    const { token } = useAuth();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const getAllArticles = async (Data) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${BASE_URL}/articles/getAll` , { headers: {
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
    return { data, error, isLoading, getAllArticles };
  }


  export function useUpdateArticle() {
    const { token } = useAuth();
      
      const [data, setData] = useState(null);
      const [error, setError] = useState(null);
      const [isLoading, setIsLoading] = useState(false);
      const updateArticle = async (Data) => {
        setIsLoading(true);
        setError(null);
        try {
          const response = await axios.post(`${BASE_URL}/articles/update/${Data.id}`,Data,{ headers: {
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
    
      return { data, error, isLoading, updateArticle };
    }
    export function useGetArticleById() {
         const { token } = useAuth();
        
        const [data, setData] = useState(null);
        const [error, setError] = useState(null);
        const [isLoading, setIsLoading] = useState(false);
        const getArticleById = async (Data) => {
          setIsLoading(true);
          setError(null);
          try {
            const response = await axios.get(`${BASE_URL}/articles/get/${Data}`)
            setData(response.data.data);
            return response.data.data;
          } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
            throw err;
          } finally {
            setIsLoading(false);
          }
        };
      
        return { data, error, isLoading, getArticleById };
      }