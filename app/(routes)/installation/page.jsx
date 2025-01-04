// services.js
import React from 'react';
import Image from 'next/image';
import installationBg from "@/public/cnsl-images/Installation/0A4A0217.JPG";
import TypingAnimation from '@/components/TypingAnimation';
import ServiceCard from './_sections/ServiceCard';
import img1 from '@/public/services/services/الاحداث والانشطة/img1.jpg'
import img2 from '@/public/services/services/ترفية/img1.jpg'
import img3 from '@/public/services/services/ترفية/img2.jpg'
import img4 from '@/public/services/services/رياضة/img1.jpg'
import img5 from '@/public/services/services/رياضة/img2.jpg'
import img6 from '@/public/services/services/رياضة/img3.jpg'
import img7 from '@/public/services/services/رياضة/img4.jpg'
import img8 from '@/public/services/services/رياضة/img5.jpg'
import img9 from '@/public/services/services/فندقة/img1.jpg'

const fakeServices = [
  {
    id: 1,
    title: "Services hôteliers et touristiques",
    description: "Le centre garantit des services hôteliers de qualité, comprenant un hébergement confortable et des restaurants, et renforce les activités de divertissement variées pour les touristes et les résidents, reflétant ainsi son engagement envers une expérience complète et exceptionnelle pour ses invités. Le centre propose également quatre hôtels: Tikejda, Djurdjura, Chalet kef, Le Pin Noir.",
    images: [img9]
  },
  {
    id: 2,
    title: "Accueil et préparation des athlètes",
    description: " Le centre offre un environnement intégré pour les athlètes de toutes catégories, y compris les équipes nationales et étrangères, avec toutes les ressources nécessaires pour soutenir leur préparation physique, technique et mentale",
    images: [img4,img5 ,img6 ,img7,img8]
  },
  {
    id: 3,
    title: "Hébergement et organisation d'activités",
    description: "Le centre propose des services hôteliers de haute qualité pour les touristes, avec des installations complètes pour l'hébergement et les repas. Il organise également des activités touristiques et récréatives spécialement conçues pour les jeunes et les visiteurs, tout en respectant rigoureusement les règles de protection de l'environnement.",
    images: [img1]
  },  {
    id: 4,
    title: "Services hôteliers et Divertissement",
    description: "Le centre garantit des services hôteliers de qualité, comprenant un hébergement confortable et des restaurants, et renforce les activités de divertissement variées pour les touristes et les résidents, reflétant ainsi son engagement envers une expérience complète et exceptionnelle pour ses invités.",
    images: [img2,img3]
  },
  // Add more fake services as needed
];

export default function Services() {
  return (
    <div className='min-h-screen'>
          <div className="static sm:p-0">
        <div className="sm:h-[60vh]">
          <Image src={installationBg} className="h-screen w-full sm:h-[60vh]" />
        </div>
        <div
           className=' sm:px-2 flex items-end  sm:items-center  pb-32 sm:pb-8 px-12   bg-gradient-to-tr  from-black  bg-opacity-10 sm:h-[60vh] h-screen w-full absolute top-0 ' >
      <TypingAnimation text='INSTALLATIOS SPORTIVES' 
      className='text-7xl sm:text-5xl text-white font-body' />
      </div>
      </div>

      {/* <div className='w-full flex justify-center'> */}

      <div className='w-full flex flex-col items-center mt-12 pb-8'>
        <div className='w-[70%] flex flex-col p-10 rounded-xl bg-gray-100 sm:w-full'>
          <div className='bg-blue-800 text-3xl p-3 rounded-xl text-white text-center w-full mb-5'>TIKJDA</div>
          <div className='flex w-full justify-between h-[300px] mb-7 sm:flex-col'>
            <Image src='/tikjda/00E45F.png'  width={400} height={400}  className="h-full sm:w-full w-[58%] rounded-xl" />
            <div className="h-full w-[38%] rounded-xl bg-green-400 sm:w-full text-white flex items-center justify-center text-bold text-4xl text-bold">Terrains de football</div>
          </div>
          <div className='flex w-full justify-between h-[300px] mb-7 sm:flex-col'>
            <div className="h-full w-[38%] rounded-xl bg-blue-400 sm:w-full text-white flex items-center justify-center text-bold text-4xl text-bold">salle de musculation</div>
            <Image src='/tikjda/3B82F6.png'  width={400} height={400}  className="h-full sm:w-full w-[58%] rounded-xl" />
          </div>
          <div className='flex w-full justify-between h-[300px] mb-7 sm:flex-col'>
            <Image src='/tikjda/E41E0A.png'  width={400} height={400}  className="h-full sm:w-full w-[58%] rounded-xl" />
            <div className="h-full w-[38%] rounded-xl bg-red-400 text-white flex sm:w-full items-center text-center justify-center text-bold text-4xl text-bold">centre médico sportif</div>
          </div>
          <div className='flex w-full justify-between h-[300px] mb-7 sm:flex-col'>
            <div className="h-full w-[38%] rounded-xl bg-orange-400 text-white sm:w-full flex items-center justify-center text-bold text-4xl text-bold">salle de sport</div>
            <Image src='/tikjda/FBBA00.png'  width={400} height={400}  className="h-full sm:w-full w-[58%] rounded-xl" />
          </div>
          <div className='flex w-full justify-between h-[300px] mb-7 sm:flex-col'>
            <Image src='/tikjda/E5007D.png'  width={400} height={400}  className="h-full sm:w-full w-[58%] rounded-xl" />
            <div className="h-full w-[38%] rounded-xl bg-pink-500 text-white flex sm:w-full text-center items-center justify-center text-bold text-4xl text-bold">parcours de santé en <br /> plein foret</div>
          </div>
          <div className='flex w-full justify-between h-[300px] mb-7 sm:flex-col'>
            <div className="h-full w-[38%] rounded-xl bg-green-300 text-white sm:w-full flex items-center justify-center text-bold text-4xl text-bold">terrain de réplique</div>
            <Image src='/tikjda/98E916.png'  width={400} height={400}  className="h-full sm:w-full w-[58%] rounded-xl" />
          </div>
        </div>

        <div className='w-[70%] flex flex-col p-10 rounded-xl bg-gray-100 mt-16 sm:w-full'>
          <div className='bg-dreen-800 bg-green-500 text-3xl p-3 rounded-xl text-white text-center w-full mb-5'>FOUKA</div>
          <div className='flex w-full justify-between h-[300px] mb-7 sm:flex-col'>
            <Image src='/fouka/0DCF5E.png'  width={400} height={400}  className="h-full sm:w-full w-[58%] rounded-xl" />
            <div className="h-full w-[38%] rounded-xl bg-green-700 text-white flex sm:w-full items-center justify-center text-bold text-4xl text-bold">salles fédérales</div>
          </div>
          <div className='flex w-full justify-between h-[300px] mb-7 sm:flex-col'>
            <div className="h-full w-[38%] rounded-xl bg-blue-400 text-white flex sm:w-full items-center justify-center text-bold text-4xl text-bold">Piscine olympique</div>
            <Image src='/fouka/3B82F6.png'  width={400} height={400}  className="h-full sm:w-full w-[58%] rounded-xl" />
          </div>
          <div className='flex w-full justify-between h-[300px] mb-7 sm:flex-col'>
            <Image src='/fouka/E41E0A.png'  width={400} height={400}  className="h-full sm:w-full w-[58%] rounded-xl" />
            <div className="h-full w-[38%] rounded-xl bg-red-400 text-white flex sm:w-full items-center text-center justify-center text-bold text-4xl text-bold">Bloc Médico sportifs</div>
          </div>
          <div className='flex w-full justify-between h-[300px] mb-7 sm:flex-col'>
            <div className="h-full w-[38%] rounded-xl bg-green-300 text-white text-center flex sm:w-full items-center justify-center text-bold text-4xl text-bold">Salle de musculation</div>
            <Image src='/fouka/98E916.png'  width={400} height={400}  className="h-full sm:w-full w-[58%] rounded-xl" />
          </div>
          <div className='flex w-full justify-between h-[300px] sm:mb-12 mb-7 sm:flex-col'>
            <Image src='/fouka/1B1FFD.png'  width={400} height={400}  className="h-full sm:w-full w-[58%] rounded-xl" />
            <div className="h-full w-[38%] rounded-xl bg-blue-600 text-white flex sm:w-full text-center items-center justify-center text-bold text-4xl text-bold">Terrains de beach-volley<br /> plein foret</div>
          </div>
          <div className='flex w-full justify-between h-[300px] mb-7 sm:flex-col'>
            <div className="h-full w-[38%] rounded-xl bg-orange-400 text-white sm:w-full flex items-center justify-center text-bold text-4xl text-center text-bold">Terrains de tennis <br /> plein air</div>
            <Image src='/fouka/E5BF12.png'  width={400} height={400}  className="h-full sm:w-full w-[58%] rounded-xl" />
            {/* <Image src='/fouka/E41E0A.png'  width={400} height={400}  className="h-full sm:w-full w-[58%] rounded-xl" /> */}
          </div>
        </div>

        <div className='w-[70%] sm:w-full flex flex-col p-10 rounded-xl bg-gray-100 mt-16'>
          <div className='bg-dreen-800 bg-blue-300 text-3xl p-3 rounded-xl text-white text-center w-full mb-5'>SERAIDI</div>
          <div className='flex w-full justify-between h-[300px] mb-7 sm:flex-col'>
            <Image src='/siraidi/00E45F.png'  width={400} height={400}  className="h-full sm:w-full w-[58%] rounded-xl" />
            <div className="h-full w-[38%] rounded-xl bg-green-500 text-white flex sm:w-full items-center justify-center text-bold text-4xl text-bold">Terrain de Football</div>
          </div>
          <div className='flex w-full justify-between h-[300px] mb-7 sm:flex-col'>
            <div className="h-full w-[38%] rounded-xl bg-orange-500 text-white flex sm:w-full items-center justify-center text-bold text-4xl text-bold">Deux salles OMS</div>
            <Image src='/siraidi/E47200.png'  width={400} height={400}  className="h-full sm:w-full w-[58%] rounded-xl" />
          </div>
          <div className='flex w-full justify-between h-[300px] mb-7 sm:mb-9 sm:flex-col'>
            <Image src='/siraidi/3B82F6.png'  width={400} height={400}  className="h-full sm:w-full w-[58%] rounded-xl" />
            <div className="h-full w-[38%] rounded-xl  bg-blue-500 text-white flex sm:w-full items-center justify-center text-bold text-4xl text-bold">Piscine semi olympique</div>
          </div>
          <div className='flex w-full justify-between h-[300px] mb-7 sm:flex-col'>
            <div className="h-full w-[38%] rounded-xl bg-red-600 text-white flex sm:w-full items-center justify-center text-bold text-4xl text-bold">terrain d'athlétisme</div>
            <Image src='/siraidi/E41E0A.png'  width={400} height={400}  className="h-full sm:w-full w-[58%] rounded-xl" />
          </div>
          <div className='flex w-full justify-between h-[300px] mb-7 sm:flex-col'>
            <Image src='/siraidi/FBBA00.png'  width={400} height={400}  className="h-full sm:w-full w-[58%] rounded-xl" />
            <div className="h-full w-[38%] rounded-xl bg-yellow-500 text-white flex sm:w-full text-center items-center justify-center text-bold text-4xl text-bold">salle de BOXE</div>
          </div>
          <div className='flex w-full justify-between h-[300px] sm:mb-9 mb-7 sm:flex-col'>
            <div className="h-full w-[38%] rounded-xl bg-pink-600 text-white flex sm:w-full items-center justify-center text-bold text-4xl text-center text-bold">salle de musculation</div>
            <Image src='/siraidi/E5007D.png'  width={400} height={400}  className="h-full sm:w-full w-[58%] rounded-xl" />
          </div>
          <div className='flex w-full justify-between h-[300px] mb-7 sm:flex-col'>
            <Image src='/siraidi/16DBBA (1).png'  width={400} height={400}  className="h-full sm:w-full w-[58%] rounded-xl" />
            <div className="h-full w-[38%] rounded-xl bg-blue-300 text-white flex sm:w-full items-center justify-center text-bold text-4xl text-center text-bold">infirmerie</div>
          </div>
        </div>

      </div>
    </div>
  );
}

