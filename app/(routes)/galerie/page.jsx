"use client"

import React, { useEffect, useState } from "react";
import GalerieSection from "./_sections/GalerieSection";
import { useGetAllArea } from "@/hooks/useFetchArea";
import { data } from "autoprefixer";

// const areaOptions = ["All", "Chalet de Thighzart", "Hôtel Djurdjura", "Hôtel Tikjda"];

const areaOptions = ["All"];

export default function Galerie() {
  const { data: allAreas, error, isLoading, getAllArea } = useGetAllArea();
  const [activeArea, setActiveArea] = useState("All");
  

  useEffect(() => {
    getAllArea()
      .then((fetchedAreas) => {
        if (fetchedAreas && Array.isArray(fetchedAreas)) {
          console.log("Fetched area names:");
          fetchedAreas.forEach((area) => {
            if (!areaOptions.includes(area.name)) {
              // Add only unique names
              areaOptions.push(area.name);
            }
          });
        }
      })
      .catch((err) => {
        console.error("Error fetching areas:", err);
      });
  }, []);

//! main app
  const handleAreaClick = (area) => {
    setActiveArea(area);
  };

  const filteredAreas = activeArea === "All" 
    ? allAreas 
    : allAreas?.filter(area => area.name.trim().toLowerCase() == activeArea.trim().toLowerCase());

    // useEffect(()=>{
    //   console.log(filteredAreas);
      
    // } , [filteredAreas])

    return (
      <div className="container min-h-screen pt-40 sm:auto">
        {/* Scrollable Area Bar */}
        <div className="static sm:p-0 my-16 flex justify-center">
          <div className="w-[100%] bg-red-100 rounded-lg sm:w-full md:w-full h-20 ring-primary1 relative overflow-x-auto flex justify-start scrollbar-thin scrollbar-thumb-primary1 scrollbar-track-gray-200">
            <div
              className="absolute top-0 left-0 h-full rounded-lg bg-primary1 transition-all duration-300 ease-in-out"
              style={{
                width: `${100 / areaOptions.length}%`, // Consistent width calculation
                transform: `translateX(${areaOptions.indexOf(activeArea) * 100}%)`,
              }}
            />
            {/* Area options div */}
            {areaOptions.map((area) => (
              <div
                key={area}
                className={`flex-1 px-4 font-bold text-primary2 font-body uppercase text-lg sm:text-sm flex items-center justify-center cursor-pointer relative z-10 text-center transition-colors duration-300 ${
                  activeArea === area ? "text-white" : "text-primary2"
                }`}
                onClick={() => handleAreaClick(area)}
              >
                {area}
              </div>
            ))}
          </div>
        </div>
  
        {/* Galerie Sections */}
        <div>
          {filteredAreas?.map((area) => (
            <GalerieSection key={area._id} area={area} />
          ))}
        </div>
      </div>
    );
}