"use client";
import homeImg from "@/public/cnsl-images/fouka page/cover.JPG";


import thumb from "@/public/cnsl-images/fouka page/cover.JPG";
import { useState ,useEffect } from "react";
import SeasonToggle from "@/components/ui/SeasonToggle";
import Image from "next/image";
import RoomGrid from "@/components/RoomGrid";
import { useGetAllArea } from "@/hooks/useFetchArea";
import FromGallery from "@/components/FromGallery";
import { getUrlImage } from "@/lib/assistant";
import Link from "next/link";
export default function fouka() {
  const [foukaId] = useState('66b65caf05df9925c598396c');
  const [summer, setSummer] = useState(false);
  const [selectedDegree, setSelectedDegree] = useState(3);
  const { data: allAreas, error, isLoading, getAllArea } = useGetAllArea();
  const [Erea, setErea] = useState(null);

  useEffect(() => {
      getAllArea();
  }, []);

  useEffect(() => {
      if (allAreas) {
          const area = allAreas.find(area => area._id === foukaId);
          if (area) {
              setErea(area);
          }
      }
  }, [allAreas]);
  const handleDegreeClick = (degree) => {
    setSelectedDegree(degree);
  };

  return (
    <div>
           <div
        className="font-raleway w-full flex items-center justify-center bg-fixed bg-no-repeat bg-cover
      
        "
        style={{
          backgroundImage: `url(${summer ? thumb.src : homeImg.src})`,
          height: "100vh",
        }}
      >
        <div className=" sm:flex-col px-24  sm:px-2  w-full h-full flex items-center  justify-between bg-gradient-to-r from-blue-500 via-white-500 to-transparent bg-opacity-10">
          <div className="  w-1/3 h-full  flex justify-center items-end pb-16  sm:item-center   sm:w-full">
            <div className=" text-white  sm:mt-48 ">
              <div className=" uppercase font-semibold   text-6xl  mb-4">
              fouka
              </div>
              <div className=" uppercase   mb-8 text-4xl ">
              CNSLT FOUKA TIPAZA       
                     </div>
              <Link href='reservation' className="bg-primary1 rounded-lg py-2 px-4 text-center w-2/3 ">
                RESERVE NOW
              </Link>
            </div>
          </div>
          <div className="w-1/3 h-full flex justify-center items-end pb-16 sm:w-full ">
            <SeasonToggle summer={summer} setSummer={setSummer} />
          </div>
        </div>
      </div>
      <div className=" container mt-8 flex flex-col justify-center sm:mt-2 ">
      <div className="flex items-center sm:flex-col space-x-8">
          <div className="w-1/2 h-full sm:w-full sm:my-6 py-12">
            <img src={getUrlImage(Erea?.photo)} 

            className="h-[737px] sm:h-full rounded-3xl" 
            alt="Description" />
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
        <RoomGrid areaId={foukaId} selectedDegree={selectedDegree} />
       
        <div className=" my-16 rounded-3xl">
        <iframe
        className=" rounded-3xl"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25603.471141780297!2d2.7547675!3d36.6640674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128f9f339559d151%3A0xedba21ef6f978471!2sFouka!5e0!3m2!1sen!2sdz!4v1724167444130!5m2!1sen!2sdz"
        width="100%"
        height="450"
        style={{ border: 0 }} // Corrected the style prop
        allowFullScreen // Corrected the attribute
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>        </div>
        <FromGallery images={Erea?.gallery}/>
        

      </div>
 
    </div>
  );
}
