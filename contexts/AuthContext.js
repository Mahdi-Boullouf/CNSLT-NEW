"use client"

import Cookies from 'js-cookie';
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [areaId ,setAreaId] = useState(null) 

  useEffect(() => {
    const storedUser = Cookies.get('user');
    const storedToken = Cookies.get('token');
    const storedAreaId =  Cookies.get('areaId');

    

    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
        setToken(JSON.parse(storedToken));
        setAreaId(JSON.parse(storedAreaId))
      } catch (error) {
        console.error('Error parsing user data from cookie:', error);
        Cookies.remove('user');
        Cookies.remove('token');
        Cookies.remove('areaId')
      }
    }
  }, []);

  const updateUser = (newUser) => {
    if (newUser) {
      setUser(newUser);
      Cookies.set('user', JSON.stringify(newUser), { expires: 7 });
    } else {
      setUser(null);
      setToken(null);
      Cookies.remove('user');
      Cookies.remove('token');
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser: updateUser, token, setToken ,setAreaId ,areaId  }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);