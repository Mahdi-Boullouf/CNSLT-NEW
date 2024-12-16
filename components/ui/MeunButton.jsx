"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function MenuButton({isOpen  ,toggleMenu,  setIsOpen}) {
  // const [isOpen, setIsOpen] = useState(false)

  // const toggleMenu = () => setIsOpen(!isOpen)

  const variants = {
    closed: {
      rotate: 0,
    },
    open: {
      rotate: 0,
    },
  }

  const topBarVariants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: 45, y: 15 },
  }

  const middleBarVariants = {
    closed: { opacity: 1 },
    open: { opacity: 0 },
  }

  const bottomBarVariants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: -45, y: -10 },
  } 

  return (
    <motion.div 
      className='bg-secondary2 rounded-lg h-12 w-14 cursor-pointer'
      onClick={toggleMenu}
      variants={variants}
      animate={isOpen ? 'open' : 'closed'}
    >
      <div className='flex flex-col justify-center items-center h-full'>
        <motion.div 
          className='w-8 rounded-lg h-1 bg-white my-1'
          variants={topBarVariants}
        />
        <motion.div 
          className='w-8 rounded-lg h-1 bg-white my-1'
          variants={middleBarVariants}
        />
        <motion.div 
          className='w-8 rounded-lg h-1 bg-white my-1'
          variants={bottomBarVariants}
        />
      </div>
    </motion.div>
  )
}