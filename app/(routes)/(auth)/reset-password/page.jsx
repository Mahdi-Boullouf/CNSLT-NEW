"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import reservationBg from '@/public/cnsl-images/login page/03.jpg'
import logo from '@/public/blackLogo.png'
import toast from "react-hot-toast"
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

 

export default function page() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams();
  const token = searchParams.get('token'); // Extracting the token from the URL

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
  
    try {
      const response = await axios.post(`${BASE_URL}/auth/reset-password`, { token, newPassword:password })
    
      toast.success(response.data.message || 'Password reset successful')
      setPassword('')
      setConfirmPassword('')
      router.push('/reservation')

    } catch (err) {
      console.error(err) // Log the full error for debugging
      let errorMessage = 'An error occurred'
      if (err.response?.data?.error) {
        errorMessage = typeof err.response.data.error === 'string' 
          ? err.response.data.error[0].msg 
          : JSON.stringify(err.response.data.error)
      }
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }
  

  return (
    <div className=" flex h-screen bg-gray-100">
    <div className=' sm:hidden block w-2/3 relative'>
      <Image src={reservationBg} alt="Background" layout="fill" objectFit="cover" />
    </div>
    
    <div className='sm:w-full w-1/3 flex items-center justify-center  bg-opacity-60 p-8'>
      <Card className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
        <CardHeader className='text-center'>
          <Image src={logo} alt="Logo" width={100} height={100} className="mx-auto" />
          <CardTitle className='text-primary2 text-2xl font-bold mt-4'>creat New mot de passe!</CardTitle>
        </CardHeader>
        <form 
onSubmit={handleSubmit}        >
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email" className="font-semibold text-primary2">
                New Password
                </Label>
                <Input
                  id="email"
                  type="password"
                 value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-primary1 focus:border-primary1 focus:border-2"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email" className="font-semibold text-primary2">
                Confirm New Password
                </Label>
                <Input
                  id="email"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-primary1 focus:border-primary1 focus:border-2"
                />
              </div>
          </CardContent>
     
          <CardFooter className="flex flex-col space-y-4">
          <Button 
              variant="outline"
                type="submit" 
                className="w-full ring-1 ring-primary1  hover:bg-primary1   hover:text-white  text-primary1 py-2 rounded-md hover:bg-primary1/90 transition duration-300"
                disabled={isLoading}
              >
                {isLoading ? 'Sending in...' : 'Send'}
              </Button>
          </CardFooter>
        </form>
       
      </Card>
    </div>
  </div>
  )
}
