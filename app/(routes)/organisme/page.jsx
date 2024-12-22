import React from "react";
import Image from "next/image";
// import reservationBg from "@/public/cnsl-images/Entreprise Et Association/3.JPG";
import events from "@/public/events.jpg";
import TypingAnimation from "@/components/TypingAnimation";
import OfferSpecial from "./_sections/EventSpecial";
import DemanderDevis from "./_sections/DemanderDevis";
import CnslLive from '@/components/CnslLive'

export default function page() {
  return (
    <div className=" w-full">
      <CnslLive/> 
      <div className="static sm:p-0">
        <div className="sm:h-[60vh]">
          <Image src={events} className="h-screen w-full sm:h-[60vh]" />
        </div>
        <div className=" sm:px-2 flex items-end  sm:items-center  pb-32 sm:pb-8 px-12   bg-gradient-to-tr  from-black  bg-opacity-10 sm:h-[60vh] h-screen w-full absolute top-0 ">
          <TypingAnimation
            text="Demande de facture proforma "
            className="text-7xl sm:text-5xl text-white font-body"
          />
        </div>
      </div>
      <div className=" container min-h-screen my-12  bg-white">
        <DemanderDevis />
      </div>
    </div>
  );
}
