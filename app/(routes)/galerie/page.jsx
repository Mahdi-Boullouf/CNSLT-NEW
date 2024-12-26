"use client"

import React, { useEffect, useState } from "react";
import GalerieSection from "./_sections/GalerieSection";
import { useGetAllArea } from "@/hooks/useFetchArea";

// Define the Tikejda group areas that should be excluded from navigation
const tikejdaAreas = [
  'Chalet de Thighzart',
  'Hôtel Djurdjura',
  'Hôtel Tikjda',
  'Hotel Pin Noir'  // Added this area
].map(name => name.toLowerCase());

export default function Galerie() {
  const { data: allAreas, error, isLoading, getAllArea } = useGetAllArea();
  const [activeArea, setActiveArea] = useState("All");
  const [areaOptions, setAreaOptions] = useState(["All", "Tikejda"]);

  useEffect(() => {
    getAllArea()
      .then((fetchedAreas) => {
        if (fetchedAreas && Array.isArray(fetchedAreas)) {
          // Start with default options
          const uniqueAreas = ["All", "Tikejda"];
          
          // Add other areas that aren't in the tikejdaAreas list
          fetchedAreas.forEach((area) => {
            const normalizedAreaName = area.name.trim().toLowerCase();
            if (!tikejdaAreas.includes(normalizedAreaName)) {
              uniqueAreas.push(area.name);
            }
            console.log("area name" , area.name);
            
          });
          
          setAreaOptions(uniqueAreas);
        }
      })
      .catch((err) => {
        console.error("Error fetching areas:", err);
      });
  }, []);

  const handleAreaClick = (area) => {
    setActiveArea(area);
  };

  const filteredAreas = allAreas?.filter(area => {
    const normalizedAreaName = area.name.trim().toLowerCase();
    
    if (activeArea === "All") {
      return true; // Show all areas
    } else if (activeArea === "Tikejda") {
      return tikejdaAreas.includes(normalizedAreaName); // Show all three Tikejda-related areas
    } else {
      return area.name === activeArea; // Show specific area
    }
  });

  return (
    <div className="container min-h-screen pt-40 sm:auto">
      {/* Scrollable Area Bar */}
      <div className="static sm:p-0 my-16 flex justify-center">
        <div className="w-[100%] bg-red-100 rounded-lg sm:w-full md:w-full h-20 ring-primary1 relative overflow-x-auto flex justify-start scrollbar-thin scrollbar-thumb-primary1 scrollbar-track-gray-200">
          <div
            className="absolute top-0 left-0 h-full rounded-lg bg-primary1 transition-all duration-300 ease-in-out"
            style={{
              width: `${100 / areaOptions.length}%`,
              transform: `translateX(${areaOptions.indexOf(activeArea) * 100}%)`,
            }}
          />
          {/* Area options div */}
          {areaOptions.map((area) => area != 'Chalet de Thighzart' && area != 'Hôtel Djurdjura' && area != 'Hôtel Tikjda' && area != 'Hotel Pin Noir' ? (
            <div
              key={area}
              className={`flex-1 px-4 font-bold text-primary2 font-body uppercase text-lg sm:text-sm flex items-center justify-center cursor-pointer relative z-10 text-center transition-colors duration-300 ${
                activeArea === area ? "text-white" : "text-primary2"
              }`}
              onClick={() => handleAreaClick(area)}
            >
              {area}
            </div>
          ):(
            <div className="h-0 w-0 p-0 m-0"></div>
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
