"use client";
import homeImg from "@/public/home2.png";
import  thumb from '@/public/home1.png' 
import Offers from "./_sections/Offers";
import Activites from "./_sections/Activites";
import Sites from "./_sections/Sites";
import Reviews from "./_sections/Reviews";
import SeasonToggle from "@/components/ui/SeasonToggle";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { useStateContext , usePathname } from "@/contexts/ContextProvider";
import Link from "next/link";
import LoadingPage from "@/components/LoadingPage";
import { useGetAllArea } from "@/hooks/useFetchArea";
import { useEffect } from "react";
import CnslLive from '@/components/CnslLive'
import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";


const menuItems = [
  // { name: "Nos Destinations", route: "/" },
  { name: "INSTALLATIOS SPORTIVES", route: "/installation" },
  { name: "ACTIVITES SPORTIVES ET DETENTES", route: "/galerie" },
  { name: "REVUE DE PRESSE", route: "/articles" },
  { name: "ÉVÉNEMENTS SPÉCIAUX", route: "/evenement-speciale" },
];

const menuVariants = {
  hidden: { x: "-100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1 },
  exit: { x: -20, opacity: 0 },
};



export default function Home() {
  const { data: allAreas, error, isLoading, getAllArea } = useGetAllArea();

  useEffect(() => {
    getAllArea();
  }, []);
  isLoading && <LoadingPage />;


  const [summer, setSummer] = useState(false);
  const [statusPage , setStatusPage] = useState(false);
  const [statusButton , setStatusButton] = useState(false);
  

const changePage = ()=>{
  setStatusButton(false)
  setStatusPage(!statusPage);
}

const changecomponents =()=>{
  setTimeout(()=>{
    setStatusButton(!statusButton)
  },1000)
}

  const {
    openHeaderWithDestination,
    setopenHeaderWithDestination,
    openHeader,
    setopenHeader,
  } = useStateContext();

  const handleClickDestination = (index) => {
    if (index === 0) {
      setopenHeaderWithDestination(true);
      setopenHeader(!openHeader);
    }
  };

  return (
    <div>
      <CnslLive/>
      <div
        className="w-full flex items-center justify-center bg-fixed bg-no-repeat bg-cover h-[100vh]"
        style={{
          backgroundImage: `url(${summer ? homeImg.src : thumb.src})`,
          height: "100vh",
        }}
      >
        <div
          className={`w-full h-full flex sm:flex-col items-center justify-center bg-gradient-to-tr ${
            summer ? "from-blue-300" : "from-black"
          } via-white-500 to-transparent bg-opacity-10`}
        >
          <div className="w-1/3 h-full flex justify-center items-end pb-16 sm:w-full">
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="h-[calc(100vh-9rem)] w-1/3 absolute top-36 left-0 sm:w-full "
            >
              <nav className="w-full h-full flex justify-start items-end pb-16 pl-16 sm:items-center sm:pl-2 sm:pt-6">
                <ul className="text-gray-500 text-3xl space-y-6 uppercase font-raleway sm:text-xl   sm:mb-20">
                  {menuItems.map((item, index) => (
                    <motion.li
                      key={index}
                      variants={itemVariants}
                      whileHover={{ scale: 1.0, x: 10 }}
                      className={`hover:text-white hover:font-semibold transition-all duration-300 cursor-pointer font-medium text-bold ${
                        summer ? "text-gray-200" : "text-gray-300"
                      }`}
                    >
                      <Link
                        href={item.route}
                        onClick={() => handleClickDestination(index)}
                      >
                        {item.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          </div>
          <div className="   w-2/3 absolute bottom-0 flex justify-center items-end pb-16 sm:w-full sm:px-2 sm:absolute  right-0 r">
            <SeasonToggle summer={summer} setSummer={setSummer} />
          </div>
          <div className="sm:px-0 w-1/3 sm:w-1/3 h-full flex justify-center  items-end pb-48 sm:pb-0 sm:justify-end sm:items-center    absolute  sm:h-40 right-0 sm:mt-48 ">
            <div
              onClick={changePage}
              className="sm:rounded-full  sm:fixed sm:z-[100] sm:-rotate-90 sm:h-28 sm:w-2  "
            >
              <motion.button
                // absolute sm:bottom-10  bottom-24   sm:right-9 rounded-full w-40 h-40 sm:w-32 sm:h-32 bg-primary1 flex justify-center items-center
                className=" sm:rounded-lg  bg-primary1 p-2  sm:p-2 rounded-full  sm:h-auto sm:w-auto shadow-3xl  "
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  className="   sm:rounded-lg  font-body flex-col  border-4 sm:border-0 sm:border-x sm:border-t  border-white rounded-full flex justify-center items-center text-white font-medium text-xl sm:text-base text-center w-36 sm:w-full sm:px-4 sm:h-full h-36 "
                  whileHover={{ rotate: 10 }}
                >
                  RESERVE
                  <motion.span className=" mx-1 uppercase flex items-center justify-start">
                    Now <FaArrowRight className="ml-1 " />
                  </motion.span>
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
      <div className="container w-full">
        <Offers />
        <Activites />
        <Sites />
      </div>
      <Reviews />
      {statusPage == true ? (
        <div className='fixed flex flex-col items-center justify-center top-0 left-0 h-screen w-screen backdrop-blur-sm bg-primary2 bg-opacity-90 z-50'>
        
            {
              !statusButton ? (
                <div className='w-[50%] h-[260px] sm:w-[80%] sm:h-[560px] bg-primary2 border-2 border-solid border-white rounded-lg flex sm:flex-col pl-5 pr-5 items-center justify-around'>
                  <Link href='../entreprise-association' className='w-[30%] h-[55%] bg-slate-700 border-solid rounded-lg border-2 border-white p-2 text-lg flex flex-col justify-around sm:w-[80%] sm:h-[30%]'>
                    <span className="text-orange-400 text-lg">Sportifs</span>
                    <span className="text-white">Réservez maintenent et profitez des meilleur offres sportives</span>
                  </Link>
                  <Link href='/organisme' className='w-[30%] h-[55%] bg-slate-700 rounded-lg border-solid border-2 border-white p-2 text-lg flex flex-col justify-around sm:w-[80%] sm:h-[30%]'>
                    <span className="text-orange-400 text-lg">ORGANISME</span>
                    <span className="text-white">Réservez maintenent et profitez des meilleurs offres sportives</span>
                  </Link>
                  <Link href={'../reservation'} className='w-[30%] h-[55%] bg-slate-700 rounded-lg border-solid border-2 border-white p-2 flex flex-col justify-around sm:w-[80%] sm:h-[30%]'>
                    <span className="text-orange-400 text-lg">Large public</span>
                    <span className="text-white">Choisissez la catégorie qui vous convient</span>
                  </Link>
                </div>

              ):(
                <div className='w-[30%] h-[260px] bg-primary2 border-2 border-solid border-white rounded-lg flex items-center justify-around  sm:w-[80%] sm:h-[460px] sm:flex-col'>
                </div>
              )
            }
          
          <div onClick={changePage} className="mt-10 text-3xl text-white"><IoMdClose /></div>
        </div>
      ) : ( 
        <div></div>
      )
      }
    </div>
  );
}

