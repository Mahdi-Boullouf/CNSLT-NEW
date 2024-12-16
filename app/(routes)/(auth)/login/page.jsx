"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import reservationBg from '@/public/cnsl-images/login page/01.JPG'
import logo from '@/public/blackLogo.png'
import toast from "react-hot-toast"
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export default function LoginPage() {
  const { setUser , setToken ,setAreaId} = useAuth()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, formData)
      if(response){
        const user = response.data.data.user
        const token=response.data.data.token 
        const areaId=response.data.data?.areaId 

        setUser(user)
        setToken(response.data.data.token)
        setAreaId(response.data.data.areaId ? response.data.data.areaId : null)
        if (user){
          toast(`Hello${user.fullname}` ,
            {
              icon: '👏',
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            }
          );
          // toast.success("Login successful!")
          Cookies.set('user', JSON.stringify(user), { expires: 7 })
          Cookies.set('token', JSON.stringify(token), { expires: 7 })
          Cookies.set('areaId', JSON.stringify(areaId), { expires: 7 })
          if (user.type === 'admin') {
            router.push('/dashboard');
          } else {
            router.back();
          } 
  
  

        // }else{
          
        }

        

     
      }
        } catch (err) {
          
      toast.error(err.response?.data?.error || 'An error occurred during login')
    } finally {
      setIsLoading(false)
    }
  }
  const handleSignup = () => {
    router.push('/signup');
  };

  return (
    <div className=" flex h-screen bg-gray-100">
      <div className=' sm:hidden block w-2/3 relative'>
        <Image src={reservationBg} alt="Background" layout="fill" objectFit="cover" />
      </div>
      
      <div className='sm:w-full w-1/3 flex items-center justify-center  bg-opacity-60 p-8'>
        <Card className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
          <CardHeader className='text-center'>
            <Image src={logo} alt="Logo" width={100} height={100} className="mx-auto" />
            <CardTitle className='text-primary2 text-2xl font-bold mt-4'>Welcome back!</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-2">
              {['email', 'password'].map((field) => (
                <div key={field} className="space-y-1">
                  <Label htmlFor={field}className="font-semibold text-primary2">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </Label>
                  <Input
                    id={field}
                    type={field === 'password' ? 'password' : 'text'}
                    placeholder={`Enter your ${field}`}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    className="
                    focus-visible:ring-0 focus-visible:ring-offset-0 
                   focus:ring-primary1 focus:border-primary1 focus:border-2"/>
                 
            
                </div>
                           
              ))}
                <div className=' w-full flex  justify-end'>
                   <Link href="/forgot-password" className="text-primary2  text-sm hover:underline text-center">
                      Mot de passe oublié?
                            </Link>

                   </div>
            </CardContent>
       
            <CardFooter className="flex flex-col space-y-4">
              <Button 
              variant="outline"
                type="submit" 
                className="w-full ring-1 ring-primary1  hover:bg-primary1   hover:text-white  text-primary1 py-2 rounded-md hover:bg-primary1/90 transition duration-300"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
              <Button 
               onClick={handleSignup}
               variant="outline"
                type="button" 
                className="w-full ring-1 ring-primary1  hover:bg-primary1   hover:text-white  text-primary1 py-2 rounded-md hover:bg-primary1/90 transition duration-300"
                disabled={isLoading}
              >
                Sign Up
              </Button>
              {/* <Link href="/signup" className="text-primary2  text-sm hover:underline text-center">
                Don't have an account? Sign up
              </Link> */}
            </CardFooter>
          </form>
         
        </Card>
      </div>
    </div>
  )
}