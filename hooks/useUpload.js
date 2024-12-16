import { useState ,useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export function useUploadImage() {
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const uploadImage = async (imageFile) => {
    setIsLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append('file', imageFile, imageFile.name);
    try {

   
      const response = await axios.post(`${BASE_URL}/upload-image`, formData, {
        headers: {
           Authorization: token, 
          'Content-Type': 'multipart/form-data',
        },
      });
 
      setData(response?.data.url);
      return response?.data.url;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'An unknown error occurred';
      console.error('Upload failed:', errorMessage);
      console.error('Full error object:', err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, uploadImage };
}


export function useUploadFile() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const uploadFile = useCallback(async (file, captchaValue) => {
    setIsLoading(true);
    setError(null);
    setData(null);

    const formData = new FormData();
    formData.append('file',file, file.name);
    formData.append('captcha',captchaValue);

    try {
      const response = await axios.post(`${BASE_URL}/files/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setData(response.data.url);
      return response.data.url;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'An unknown error occurred';
      console.error('Upload failed:', errorMessage);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, error, isLoading, uploadFile };
}