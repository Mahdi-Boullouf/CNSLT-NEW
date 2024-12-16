"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import blackLogo from "@/public/blackLogo.png";
import reservationBg from '@/public/cnsl-images/login page/02.jpg';
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function SignupPage() {
  const  router= useRouter()
  const [formData, setFormData] = useState({
    fullname: "", email: "", password: "", confirmPassword: "", phone: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, {
        ...formData, type: "user"
      });
      if ( response.data.status==="success"){
        toast.success(response.data.message);
        setFormData({ fullname: "", email: "", password: "", confirmPassword: "", phone: "" });
        router.push('/reservation')

      }
      else{
        toast.error(response.data.errors[0].msg)
      }
 
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="sm:hidden block w-2/3 relative">
        <Image className="object-cover h-full" src={reservationBg} alt="Background" layout="fill" />
      </div>

      <div className="sm:w-full w-1/3 flex items-center justify-center p-8">
        <Card className="w-full max-w-md py-0">
          <CardHeader className="space-y-1 text-center">
            <Image src={blackLogo} alt="Logo" width={100} height={100} className="mx-auto" />
            <CardTitle className="text-2xl font-bold text-primary2">Welcome!</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-2">
              {Object.entries(formData).map(([key, value]) => (
                <div key={key} className="space-y-1">
                  <Label htmlFor={key} className="font-semibold text-primary2">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Label>
                  <Input
                    id={key}
                    type={key.includes('password') ? 'password' : key === 'email' ? 'email' : 'text'}
                    placeholder={`Enter your ${key}`}
                    value={value}
                    onChange={handleChange}
                    required
                    className="
                     focus-visible:ring-0 focus-visible:ring-offset-0 
                    focus:ring-primary1 focus:border-primary1 focus:border-2"
                  />
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
              variant="outline"

                type="submit"
                className="w-full ring-1 ring-primary1  hover:bg-primary1  hover:text-white text-primary1 py-2 rounded-md hover:bg-primary1/90 transition duration-30"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Sign Up"}
              </Button>
              <Link href="/login" className="text-sm text-primary2 hover:underline text-center">
                Already have an account? Log in
              </Link>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}