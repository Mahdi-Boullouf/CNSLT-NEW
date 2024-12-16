"use client"
import React, { useState, useEffect } from 'react';

import { motion } from 'framer-motion';

const TypingAnimation = ({
  text,
  speed = 50,
  className
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, speed]);

  return (
    <div className={className}>
      {displayedText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        className={`inline-block w-0.5 h-5 ml-1`}
      />
    </div>
  );
};

export default TypingAnimation;