"use client";
import { useState ,useEffect } from "react";
import Image from "next/image";
import SeasonToggle from "@/components/ui/SeasonToggle";
import RoomGrid from "@/components/RoomGrid";

import homeImg from "@/public/cnsl-images/Tikjda page/1.jpg"; 
import  thumb from '@/public/cnsl-images/home page/Été/IMG_0994~1.jpg' 

import { useGetAllArea } from "@/hooks/useFetchArea";
import FromGallery from "@/components/FromGallery";
import { getUrlImage } from "@/lib/assistant";
import Link from "next/link";
import { useRouter , useParams } from "next/navigation";
import LoadingPage from "@/components/LoadingPage";
export default function page() {
  const {id} = useParams()
  // const [tikjdaId] = useState('66b69dee46674f256fd80cec');
  const [summer, setSummer] = useState(false);
  const [selectedDegree, setSelectedDegree] = useState(3);
  const { data: allAreas, error, isLoading, getAllArea } = useGetAllArea();
  const [Erea, setErea] = useState(null);
  useEffect(() => {
    getAllArea();
}, []);

  useEffect(() => {
    if (allAreas) {
        const area = allAreas.find(area => area._id === id);
        if (area) {
            setErea(area);
        }
    }
}, [allAreas]);

  const handleDegreeClick = (degree) => {
    setSelectedDegree(degree);
  };
  if(isLoading) return <LoadingPage/>

  return (
    <div>
      <div
        className="font-raleway w-full flex items-center justify-center bg-fixed bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(${summer ? getUrlImage(Erea?.coverSummer) : getUrlImage(Erea?.coverWinter)})`,
          height: "100vh",
        }}
      >
        <div className="sm:flex-col px-24 sm:px-2 w-full h-full flex items-center justify-between bg-gradient-to-r from-black via-white-500 to-transparent bg-opacity-10">
          <div className="w-1/3 h-full flex justify-center items-end pb-16 sm:item-center sm:w-full">
            <div className="text-white sm:mt-48">
              <div className="uppercase font-semibold text-6xl mb-4">
              {Erea?.name}
              </div>
              <div className="uppercase mb-8 text-4xl">
                cnslt Tikjda bouira
              </div>
              <Link href='reservation' className="bg-primary1 rounded-lg py-2 px-4 text-center w-2/3 ">
                RESERVE NOW
              </Link>
            </div>
          </div>
          <div className="w-1/3 h-full flex justify-center items-end pb-16 sm:w-full">
            <SeasonToggle summer={summer} setSummer={setSummer} />
          </div>
        </div>
      </div>
      
      <div className="container mt-8 flex flex-col justify-center sm:mt-2">
        <div className="flex items-center sm:flex-col space-x-8">
          <div className="w-1/2 h-full sm:w-full sm:my-6 py-12">
            <Image width={900} height={900} src={getUrlImage(Erea?.photo)} 
            className="h-[737px] sm:h-full w-auto object-cover rounded-3xl" 
            alt="Description"
            loading="lazy"
            style={{
              objectPosition: "center", // Center the image
            }}
            />
          </div>
          <div className="flex w-1/2 text-primary2 font-body sm:w-full h-[737px]  flex-col items-start justify-start">
            <p className="text-[32px] sm:text-xl">
              {Erea?.description}
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center px-4 py-8">
          <h1 className="text-4xl font-bold mb-4 font-body">
            Explore Popular Cities
          </h1>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto font-raleway">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit
          </p>
          <div className="flex justify-center space-x-4">
            
          </div>
        </div>

        <RoomGrid areaId={id} selectedDegree={selectedDegree} />

        <div className="my-16 rounded-3xl">

        <iframe
        className=" rounded-3xl"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3209.450529004647!2d4.1281362!3d36.4466671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128c49b62cb9854d%3A0x8e61b18df60f6032!2zQ2VudHJlIG5hdGlvbmFsIGRlcyBzcG9ydHMgZXQgbG9pc2lycyBUaWtqZGEg2KfZhNmF2LHZg9iyINin2YTZiNi32YbZiiDYp9mE2LHZitin2LbYqSDZiNin2YTYqtix2YHZitmHINiq2YrZg9is2K_YqQ!5e0!3m2!1sen!2sdz!4v1724167540507!5m2!1sen!2sdz"
        width="100%"
        height="450"
        style={{ border: 0 }} // Corrected the style prop
        allowFullScreen // Corrected the attribute
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>         </div>

        <FromGallery images={Erea?.gallery}/>

      </div>
    </div>
  );
}