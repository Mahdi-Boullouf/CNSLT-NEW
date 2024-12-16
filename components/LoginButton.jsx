import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiLogIn, FiUser, FiBell, FiLogOut } from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { usePathname, useRouter } from 'next/navigation';
import { MdOutlineDashboardCustomize } from "react-icons/md";

const LoginButton = () => {
  const router = useRouter();
  const pathName = usePathname();
  const { user, setUser, setToken } = useAuth();
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, [user, pathName]);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    toast.success("Logout successful!");
    closeMenu();
    router.push('/'); // Redirect to home page after logout
  }

  const closeMenu = () => setIsOpen(false);

  const buttonClasses = "sm:h-12 sm:w-24 h-12 w-32 font-medium text-lg flex justify-center items-center py-2 bg-primary1 text-white rounded-lg transition-colors duration-300 hover:bg-opacity-90";
  
  const buttonVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  if (!hydrated) return null;

  if (user) {
    const menuItems = [
      { icon: FiUser, text: 'Profile', onClick: () => router.push('/profile') },
      { icon: FiLogOut, text: 'Logout', onClick: handleLogout }
    ];

    // Add Dashboard option for admin or superadmin
    if (user.type === 'admin' || user.type === 'superadmin'  || user.type === 'receptor') {
      menuItems.splice(1, 0, { 
        icon: MdOutlineDashboardCustomize, 
        text: 'Dashboard', 
        onClick: () => router.push('/dashboard') 
      });
    }

    return (
      <div className="relative">
        <motion.button
          className={buttonClasses}
          initial="hidden"
          animate="visible"
          variants={buttonVariants}
          transition={{ duration: 0.5 }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <FiUser className="h-6 w-6 mr-2" />
          <span className="text-sm">{user.fullname}</span>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={menuVariants}
            >
              {menuItems.map(({ icon: Icon, text, onClick }, index) => (
                <button
                  key={index}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={() => { onClick(); closeMenu(); }}
                >
                  <Icon className="inline-block mr-2" /> {text}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <Link href="/login" passHref>
      <motion.a
        className={buttonClasses}
        initial="hidden"
        animate="visible"
        variants={buttonVariants}
        transition={{ duration: 0.5 }}
      >
        <FiLogIn className="mr-2" /> Login
      </motion.a>
    </Link>
  );
};

export default LoginButton;