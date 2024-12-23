"use client";
import React from "react";
import { FaHandHoldingUsd } from "react-icons/fa";
import { useStateContext } from "@/contexts/ContextProvider";
import Link from "next/link";
import SiteSection from "../_components/SiteSection";


export default function Sites() {
  const {Areas}=useStateContext()

  return (
    <div>
      <h2 className="text-2xl border-b-2 py-4 border-gray-200 my-4">
        Choisissez parmi une large sélection d'hôtels adaptés à vos besoins
      </h2>
      {Areas.map((Area) => (
        <SiteSection key={Area._id} site={Area} />
      ))}
      <div className="flex flex-col justify-center items-center mt-16">
        <div className=" text-blue-800 text-6xl  font-body sm:text-3xl sm:text-center mb-6 ">
          Vous êtes une organisme ?
        </div>
        <div className="my-10 flex items-center justify-between bg-white p-4 rounded-lg  shadow-3xl sm:flex-col sm:px-2  sm:py-2  ">
          <div className="flex items-center sm:flex-col">
            <div className="p-4  rounded-full">
              <FaHandHoldingUsd className=" text-secondary2 h-12 w-12 " />
            </div>
            <div className="ml-4  mr-10 w-2/3 sm:w-full sm:mr-0 sm:ml-0 ">
              <h3 className="font-bold text-gray-900 font-body text-2xl my-2  sm:text-xl ">
                Vous pouvez bénéficier d'un accord de partenariat avec nous.
              </h3>
              <p className="text-gray-400 font-raleway text-lg my-2  sm:text-sm   ">
                Découvrez les avantages dont bénéficient les organisations qui
                remplissent les conditions de l'accord et les services offerts.
              </p>
            </div>
          </div>
          <Link className=" text-center bg-secondary2 text-white px-4 py-2 rounded-full sm:w-full sm:px-0  " 
          href='/entreprise-association'>
            Voici les détails
          </Link>
        </div>
      </div>
    </div>
  );
}
