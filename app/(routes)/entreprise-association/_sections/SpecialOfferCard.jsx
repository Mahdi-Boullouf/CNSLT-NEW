import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { getUrlImage } from '@/lib/assistant'
import { format } from 'date-fns'

export default function SpecialOfferCard({ event }) {
  const formattedDate = event?.date ? format(new Date(event.date), 'MMMM dd, yyyy') : 'Date unavailable';

  return (
    <Card className="">
      <div className="relative h-[200px]">
        <Image
           src={getUrlImage(event?.photo)}
          alt={event.title}
          layout="fill"
          objectFit="cover"
        />
        {/* <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md">
          {offer.promotionPercent}% OFF
        </div> */}
      </div>
      <CardHeader>
        <CardTitle>{event.title}</CardTitle>
        <CardDescription>{event.description}</CardDescription>
      </CardHeader>
      <CardContent>
      </CardContent>
      <CardFooter>
        <div className="w-full bg-primary1 hover:bg-primary1 hover:bg-opacity-60 text-white text-center py-2 rounded-lg">
          {formattedDate}</div>
      </CardFooter>
    </Card>
  )
}
