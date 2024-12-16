"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStateContext } from "@/contexts/ContextProvider";
import Image from "next/image";
import blackLogo from "@/public/blackLogo.png";
import { useAuth } from "@/contexts/AuthContext";
import { adminLinks, receptorLinks } from "@/app/(routes)/dashboard/_data/lib";
import { superAdminLinks } from "@/app/(routes)/dashboard/_data/lib";
import { commonLinks } from "@/app/(routes)/dashboard/_data/lib";
const SidebarDashboard = () => {
  const { user } = useAuth();
  const pathname = usePathname();

  const [links, setLinks] = useState(null);
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();
  useEffect(() => {
    if (user) {
      if(user?.type === "receptor" )
      {
        setLinks(receptorLinks)
      }
      if (user?.type === "admin" ) {
        setLinks(adminLinks);
      }
      if (user?.type === "superadmin") {
        setLinks(superAdminLinks);
      }

      superAdminLinks;
    } else {
      setLinks(null);
    }
  }, [user]);

  const handleCloseSideBar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const getLinkClass = (linkPath) => {
    const isActive = pathname === linkPath;
    return `flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-full text-md m-2 ${
      isActive ? "text-white bg-gray-500" : "text-gray-700 hover:bg-light-gray"
    }`;
  };

  if (!activeMenu) return null;

  return (
    <div
      className="  bg-gray-200 w-64 sm:absolute sm:w-11/12 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10"
      style={{ zIndex: 3000 }}
    >
      <div className="w-full flex justify-center items-center gap-3 mt-4">
        <Image src={blackLogo} alt="Logo" />
      </div>
      <div className="mt-10 text-black font-semibold">
        {links?.map((link) => (
          <Link href={link.route} key={link.name}>
            <div
              onClick={handleCloseSideBar}
              className={getLinkClass(link.route)}
            >
              {link.icon}
              <span className="capitalize">{link.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default SidebarDashboard;
