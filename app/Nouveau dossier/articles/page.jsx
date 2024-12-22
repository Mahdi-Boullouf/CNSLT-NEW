"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import reservationBg from "@/public/cnsl-images/les Articles/IMG_3732.JPG"
import TypingAnimation from '@/components/TypingAnimation'
import { useGetAllArticles } from '@/hooks/useFetchArticles'
import { getUrlImage } from '@/lib/assistant'
import { useRouter } from 'next/navigation'
import CnslLive from '@/components/CnslLive'

export default function Page() {
  const router = useRouter()
  const { data: allArticles, error, isLoading, getAllArticles } = useGetAllArticles()
  const [articles, setArticles] = useState(null)
  const [displayedArticles, setDisplayedArticles] = useState([])
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    getAllArticles()
  }, [])

  useEffect(() => {
    if (allArticles) {
      setArticles(allArticles)
      setDisplayedArticles(allArticles.slice(0, 6))
    }
  }, [allArticles])

  const handleViewMore = () => {
    setShowAll(true)
    setDisplayedArticles(articles)
  }

  const ArticleCard = ({ article }) => (
    <div
      onClick={() => router.push(article.link)}
      className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-xl hover:cursor-pointer"
    >
      <div className="relative h-48">
        <Image src={getUrlImage(article.image)} layout="fill" objectFit="cover" alt={article.title} />
      </div>
      <div className="p-4">
        <div className='flex items-center'>
          <div className='relative flex bg-red-300 w-10 h-10 rounded-full mr-2'>
            <Image src={getUrlImage(article.image)} layout="fill" objectFit="cover" className='rounded-full'/>
          </div>
          <p className="text-gray-600 text-sm">{article.title}</p>
        </div>
        <h3 className="text-lg font-semibold mt-2">{article.description}</h3>
      </div>
    </div>
  )

  return (
    <div className="w-full">
      <CnslLive/> 
      <div className="static sm:p-0">
        <div className="sm:h-[60vh]">
          <Image src={reservationBg} className="h-screen w-full sm:h-[60vh]" alt="Reservation Background" />
        </div>
        <div className='sm:px-2 flex items-end sm:items-center pb-32 sm:pb-8 px-12 bg-gradient-to-tr from-black bg-opacity-10 sm:h-[60vh] h-screen w-full absolute top-0'>
          <TypingAnimation text='les Articles' className='text-7xl sm:text-5xl text-white font-body' />
        </div>
      </div>
      <div className='container my-12'>
        <div>
          <div className='text-center text-primary1 font-bold text-5xl sm:text-3xl mb-4 '>
          Explorez Nos Articles
          </div>

        <div className="text-black  text-lg font-medium text-center font-body mb-8">
        Votre Guide Complet pour un Voyage Inoubliable – Découvrez des Destinations Exotiques, des Conseils d'Experts, et Bien Plus Encore!
        </div>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-1 md:grid-cols-2 gap-6">
          {displayedArticles?.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </div>
        {!showAll && articles && articles.length > 6 && (
          <div className="text-right mt-8">
            <button
              onClick={handleViewMore}
              className="  bg-primary1 text-white font-medium py-2 px-4 rounded"
            >
              Voir plus..
            </button>
          </div>
        )}
      </div>
    </div>
  )
}