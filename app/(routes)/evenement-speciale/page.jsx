import React from "react";
import Image from "next/image";
import EventBg from "@/public/cnsl-images/événement Spéciale/2.JPG";
import TypingAnimation from "@/components/TypingAnimation";
import EventSpecial from "../entreprise-association/_sections/EventSpecial";
export default function page() {
  return (
    <div className=" w-full">
      <div className="static sm:p-0">
        <div className="sm:h-[60vh]">
          <Image src={EventBg} className="h-screen w-full sm:h-[60vh]" />
        </div>
        <div className=" sm:px-2 flex items-end  sm:items-center  pb-32 sm:pb-8 px-12   bg-gradient-to-tr  from-black  bg-opacity-10 sm:h-[60vh] h-screen w-full absolute top-0 ">
          <TypingAnimation
            text="événement Spéciale "
            className="text-7xl sm:text-5xl text-white font-body"
          />
        </div>

        {/* <SearchFlights /> */}
      </div>
      <div className=" container my-12  bg-white  ">
        <div className="text-black text-[36px] sm:text-lg font-medium text-center font-body">
          Rejoignez-nous pour une expérience inoubliable lors de notre Événement
          Spécial-Un moment d'exception vous attend !
        </div>
        <EventSpecial />
      </div>
    </div>
  );
}
