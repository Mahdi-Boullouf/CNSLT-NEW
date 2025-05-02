// hooks/useFetchRoom.js
import { useState } from "react";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { useReservation } from "@/contexts/ReservationContext";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export function useGetAllRooms() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const getAllRooms = async (Data) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${BASE_URL}/room/all`, Data);
      setData(response?.data.data);
      return response?.data;
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, getAllRooms };
}

export function useGetRoomById() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getRoomById = async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${BASE_URL}/room/get`, {
        params: { id },
      });
      setData(response.data.data);
      return response.data.data;
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, getRoomById };
}

export function useCreateRoom() {
  const { token } = useAuth();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const createRoom = async (Data) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${BASE_URL}/room/create`, Data, {
        headers: {
          Authorization: token,
        },
      });
      setData(response.data.data);
      return response.data.data;
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, createRoom };
}

export function useUpdateRoom() {
  const { token } = useAuth();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateRoom = async (Data) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.put(`${BASE_URL}/room/update/`, Data, {
        headers: {
          Authorization: token,
        },
      });
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, updateRoom };
}

export function useDeleteRoom() {
  const { token } = useAuth();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const deleteRoom = async (Data) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${BASE_URL}/room/delete/`, Data, {
        headers: {
          Authorization: token,
        },
      });
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, deleteRoom };
}

export function useGetAllActivities() {
  const { activities, setActivities } = useReservation();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const getAllActivities = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${BASE_URL}/activities`);
      setData(response?.data.data);
      setActivities(response?.data.data);
      return response?.data;
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, getAllActivities };
}
export function useDeleteActivitie() {
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const deletActivities = async (Data) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${BASE_URL}/activities/delete/${Data}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setData(response.data);
      return response.data;
      return response?.data;
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, deletActivities };
}
export function useCreateActivity() {
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const createActivity = async (Data) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${BASE_URL}/activities/create`, Data, {
        headers: {
          Authorization: token,
        },
      });
      setData(response?.data.data);
      return response.data.data;
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, createActivity };
}
