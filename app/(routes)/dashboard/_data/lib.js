import React from 'react';
import { FaHome, FaUsersCog, FaHotel } from "react-icons/fa";
import { TbPackageImport, TbChartCandleFilled, TbCalendarStar } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { PiMapPinAreaBold } from "react-icons/pi";
import { GrArticle } from "react-icons/gr";
import { MdOutlineSportsEsports } from "react-icons/md";
import { TbCirclesRelation } from "react-icons/tb";
import { FaFire } from "react-icons/fa";



export const commonLinks = [
  { name: 'home', route: "/dashboard", icon: <FaHome size={20} /> },
  { name: 'reservation', route: "/dashboard/reservation", icon: <TbPackageImport size={20} /> },

];

export const adminLinks = [
  ...commonLinks,
  // { name: 'reservation', route: "/dashboard/reservation", icon: <TbPackageImport size={20} /> },
  { name: 'Rooms', route: "/dashboard/rooms", icon: <FaHotel size={20} /> },
];

export const receptorLinks = [...commonLinks];
GrArticle

export  const superAdminLinks = [
  ...commonLinks,
  
  { name: 'Events', route: "/dashboard/events", icon: <TbCalendarStar size={20} /> },
  { name: 'Area', route: "/dashboard/area", icon: <PiMapPinAreaBold size={20} /> },
  { name: 'Devis', route: "/dashboard/devis", icon: <TbChartCandleFilled size={20} /> },
  { name: 'Articles', route: "/dashboard/articles", icon: <GrArticle size={20} /> },
  { name: 'Activities', route: "/dashboard/activities", icon: <MdOutlineSportsEsports size={20} /> },
  { name: 'Exclusive', route: "/dashboard/exclusive", icon: <FaFire size={20} /> }, 
  { name: 'Partnership', route: "/dashboard/partnership", icon: <TbCirclesRelation  size={20} /> },


];
export const roomTypes = [
  "Single",
  "Double",
  "Triple",
  "Suite Junior",
  "Suite Senior",
  "Duplex"
];

// export const links = user?.type === 'admin' ? adminLinks : superAdminLinks;
