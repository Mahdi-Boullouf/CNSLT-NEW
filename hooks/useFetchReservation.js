// hooks/useFetchRoom.js
import { useState  } from 'react';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export function useCreateReservation() {
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const createReservation = async (reservationData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${BASE_URL}/reservation/create/`, reservationData , { headers: {
        Authorization: token, 
      }});

      setData(response.data.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, createReservation };
}


export function useGetAllReservation() {
    const { token  } = useAuth();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const GetAllReservation = async (data) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.post(`${BASE_URL}/reservation/all`,data,{ headers: {
          Authorization: token, 
        }});
        setData(response.data.data);
        return response.data;
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred');
        throw err;
      } finally {
        setIsLoading(false);
      }
    };
  
    return { data, error, isLoading, GetAllReservation };
  }
  
export function useConfirmRoomReservation() {
  const { token } = useAuth();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const ConfirmRoomReservation = async (Data) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${BASE_URL}/room/reserve`,{reservationId:Data},{ headers: {
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

  return { data, error, isLoading, ConfirmRoomReservation };
}

export function useRefuseRoomReservation() {
  const { token } = useAuth();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const RefuseRoomReservation = async (Data) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${BASE_URL}/room/refuse`,{reservationId:Data},{ headers: {
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

  return { data, error, isLoading, RefuseRoomReservation };
}

export function useDeleteReservation() {
  const { token } = useAuth();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const DeleteReservation = async (reservationId) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${BASE_URL}/reservation/delete`,{reservationId},{ headers: {
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

  return { data, error, isLoading, DeleteReservation };
}