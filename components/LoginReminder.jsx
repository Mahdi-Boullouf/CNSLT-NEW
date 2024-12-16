import React, { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const LoginReminder = () => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const {user} = useAuth()

  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => setIsVisible(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  const handleLogin = () => {
    router.push('/login');
  };
  const handleSignup = () => {
    router.push('/signup');
  };



  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className=" ring-2  ring-primary1 rounded-lg fixed bottom-4 right-4 w-80 z-[100] font-body">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Login Reminder
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={handleClose}>
            <IoClose className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">
            Don't forget to log in to access all features!
          </p>
        </CardContent>
        <CardFooter className='flex flex-col space-y-2'>
          <Button 
            variant="outline"
            type="submit" 
            className="w-full ring-1 ring-primary1  hover:bg-primary1   hover:text-white  text-primary1 py-2 rounded-md hover:bg-primary1/90 transition duration-300"
           onClick={handleLogin}>
            Login 
          </Button>
          <Button 
            variant="outline"
            type="submit" 
            className="w-full ring-1 ring-primary1  hover:bg-primary1   hover:text-white  text-primary1 py-2 rounded-md hover:bg-primary1/90 transition duration-300"
           onClick={handleSignup}>
         Signup
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginReminder;