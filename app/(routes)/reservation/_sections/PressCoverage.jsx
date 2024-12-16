import React from 'react';
import Image from 'next/image';

import { useGetAllArticles } from '@/hooks/useFetchArticles';
import { useEffect ,useState } from 'react';
import { getUrlImage } from '@/lib/assistant';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
export default function PressCoverage() {
  const router= useRouter()
  const { data: allArticles, error, isLoading, getAllArticles } = useGetAllArticles();
  // const { deleteEvent } = useDeleteEvent();
  const [Articles, setArticles] = useState(null);

  useEffect(() => {
    getAllArticles();
  }, []);

  useEffect(() => {
    if (allArticles) {
     
      setArticles(allArticles);
    }
  }, [allArticles]);

  return (
    <div className="py-12 px-8">
      <div className="mb-8 flex justify-between sm:flex-col items-center  ">
        <div className=' flex flex-col  w-3/4 sm:w-full '>
        <h2 className="text-3xl font-semibold font-body sm:text-xl">À travers le regard de la presse</h2>
        <p className="text-gray-600 mt-2 sm:text-sm">
          Ce titre suggère une compilation des couvertures médiatiques et des reportages les plus remarquables sur le CNSL, mettant en lumière sa position centrale dans l'actualité et son importance pour la communauté.
        </p>
        </div>
    
          <Link href='/articles' className=' bg-secondary2 text-white rounded-lg px-4 py-2 sm:w-full sm:my-2'>
        Voici les détails

          </Link>
          
   

      </div>

      
      <Carousel
        className='p-2 pb-6  '
    opts={{
      align: "start",
      loop: true,
    }}
  >
    <div className="flex justify-between items-center  ">
    
      <div className=" absolute flex items-center space-x-4 p-2 z-[80] mx-4 sm:left-2 left-12  bottom-0 ">
      <CarouselPrevious  className=" w-12 h-12 flex items-center justify-center rounded-lg shadow-3xl text-secondary2 bg-white hover:bg-secondary2 hover:text-white transform transition duration-500 hover:scale-105 hover:shadow-3xl " />

      <CarouselNext className="w-12 h-12 flex items-center justify-center rounded-lg shadow-3xl text-secondary2 bg-white hover:bg-secondary2 hover:text-white transform transition duration-500 hover:scale-105 hover:shadow-3xl"/>
      </div>
    </div>
    <CarouselContent className='p-4 space-x-4'>
      {Articles?.map((article, index) => (
        <CarouselItem key={index} className="  sm:basis-full basis-1/4   py-2bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-xl hover:cursor-pointer"
                
          onClick={()=>router.push(article.link)} >
            <div className="relative h-48">
              <Image src={getUrlImage(article.image)} layout="fill" objectFit="cover" alt={article.title} />
            </div>
            <div className="p-4">
              <div className='flex items-center'> 
                <div className=' relative flex bg-red-300 w-10 h-10 rounded-full mr-2'> 
                  <Image  src={getUrlImage(article.image)} layout="fill" objectFit="cover" className='rounded-full'/>
                  </div>

              <p className="text-gray-600 text-sm">{article.title}</p>

              </div>
              <h3 className="text-lg font-semibold mt-2">{article.description}</h3>
            </div>
          {/* </div> */}
                </CarouselItem>
      ))}
    </CarouselContent>
  </Carousel>
    </div>
  );
}
