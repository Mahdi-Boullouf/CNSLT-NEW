// contexts/ContextProvider.js
"use client"
import React, { createContext, useContext, useState , useEffect } from 'react';

const StateContext = createContext();

const initialState = {

  chat: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {

  const [currentColor, setCurrentColor] = useState('#03C9D7');
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] =useState(0);
  const [openHeader, setopenHeader] = useState(false)
  const [openHeaderWithDestination, setopenHeaderWithDestination]= useState(false)
  const [isClicked, setIsClicked] = useState(initialState);
  const [Areas , setAreas]= useState([])
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setScreenSize(window.innerWidth);
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);



  const handleClick = (clicked) => {
    setIsClicked(prev => ({
      ...initialState,
      [clicked]: !prev[clicked]
    }));
  };


  return (
    <StateContext.Provider value={{ handleClick, isClicked,
     initialState,
      setIsClicked,
      openHeaderWithDestination , setopenHeaderWithDestination, 
      openHeader , setopenHeader, 
      currentColor, setCurrentColor,
       activeMenu, setActiveMenu,
        screenSize, setScreenSize ,
        Areas , setAreas,
        }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
