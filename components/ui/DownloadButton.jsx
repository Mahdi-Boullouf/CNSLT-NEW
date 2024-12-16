"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa6';
import { IoIosCloudDone } from "react-icons/io";
import { useAuth } from '@/contexts/AuthContext';

const DownloadButton = ({ url, title, className }) => {
  const {token}=useAuth()
  const [done, setDone] = useState(false);

  const handleDownload = async () => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': token
        }
      });

      if (!response.ok) {
        throw new Error('Download failed');
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'hello';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDone(true);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <motion.button
      onClick={handleDownload}
      className={`flex items-center gap-2 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition-colors ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {done ? <IoIosCloudDone /> : <FaDownload />}
      {title}
    </motion.button>
  );
};

export default DownloadButton;