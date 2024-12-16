"use client";

import React, { useState, useCallback } from "react";
import { useStateContext } from "@/contexts/ContextProvider";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import MenuButton from "./ui/MeunButton";
import SearchInput from "./SearchInput";
import { Mail, Bell, LogOut } from "lucide-react";
import { FcBusinessman } from "react-icons/fc";
import { IoIosArrowDown } from "react-icons/io";
import toast from "react-hot-toast";

const HeaderIcon = ({ icon: Icon, isClicked, onClick, children }) => (
  <div
    className={`p-2 ${isClicked ? "bg-gray-500 text-white" : "bg-gray-100"} rounded-full cursor-pointer relative`}
    onClick={onClick}
  >
    <Icon className={isClicked ? "text-white" : "text-black"} size={20} />
    {children}
  </div>
);

const UserProfileMenu = ({ onLogout }) => (
  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
    <button
      onClick={onLogout}
      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    >
      <LogOut className="inline-block mr-2" size={16} />
      Logout
    </button>
  </div>
);

export default function HeaderDashboard() {
  const { user, setUser } = useAuth();
  const { activeMenu, setActiveMenu, handleClick, isClicked } = useStateContext();
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const toggleMenu = useCallback(() => setActiveMenu(prev => !prev), [setActiveMenu]);

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleLogout = useCallback(() => {
    Cookies.remove('user');
    setUser(null);
    toast.success("LogOut successful!")

    router.push('/login');
  }, [setUser, router]);

  return (
    <div className="  border-gray-200  px-2 w-full h-20 flex items-center justify-between bg-white border-b-2">
      <div className="w-1/2 flex items-center">
        <MenuButton isOpen={activeMenu} toggleMenu={toggleMenu} />
        {/* <SearchInput
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        /> */}
      </div>
      <div className="flex items-center space-x-4">
        {/* <HeaderIcon
          icon={Mail}
          isClicked={isClicked.chat}
          onClick={() => handleClick('chat')}
        >
          {isClicked.chat && <div className="bg-black h-20 w-48 absolute right-0 mt-6" />}
        </HeaderIcon>
        <HeaderIcon
          icon={Bell}
          isClicked={isClicked.notification}
          onClick={() => handleClick('notification')}
        >
          {isClicked.notification && <div className="bg-red-500 h-20 w-48 absolute right-0 mt-6" />} */}
        {/* </HeaderIcon> */}
        <div className="relative">
          <div
            className="flex items-center bg-gray-100 p-2 rounded-full cursor-pointer"
            onClick={() => handleClick('userProfile')}
          >
            <FcBusinessman />
            <span className="mx-2">{user?.fullname}</span>
            <IoIosArrowDown />
          </div>
          {isClicked.userProfile && <UserProfileMenu onLogout={handleLogout} />}
        </div>
      </div>
    </div>
  );
}