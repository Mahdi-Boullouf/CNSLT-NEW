
"use client"
import { useState } from 'react';

import useSWR from 'swr';
import axios from 'axios';
const BASE_URL =process.env.NEXT_PUBLIC_BASE_URL 
const fetcher = url => axios.get(url).then(res => res.data)
const posterer = url => axios.post(url).then(res => res.data)

export const useUsers = () => {
  const url=`${BASE_URL}/users`
  const { data, error } = useSWR(url, fetcher);
  
  return {
    users: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useLogin = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (credentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, credentials);
      setUser(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { user, isLoading, error, login };
};