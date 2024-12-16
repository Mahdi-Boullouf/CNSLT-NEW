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
      <TypingAnimation text='Installation' 
      className='text-7xl sm:text-5xl text-white font-body' />
      </div>
      </div>

      <div className='container my-8'>
        <h1 className='text-center font-bold text-5xl font-body my-4'>
          Offer de services CNSL
        </h1>
        {fakeServices.map(service => (
          <ServiceCard key={service.id} {...service} />
        ))}
      </div>
    </div>
  );
}

