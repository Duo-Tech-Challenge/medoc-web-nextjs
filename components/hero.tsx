'use client';

import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'

const Hero = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8 },
        },
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.8 },
        },
    };

    return (
        <>
            <div className='relative h-[calc(100vh-40px)] w-[calc(100%-40px)] overflow-hidden flex items-center justify-center mt-6 rounded-3xl'>
                <Image src='/hero.png' alt='hero image' width={2000} height={1080} className='w-full object-cover' />
                <div className="w-full h-screen bg-[radial-gradient(circle,rgba(0,0,0,0)_0%,rgba(0,0,0,0.25)_70%,rgba(0,0,0,0.6)_100%)] absolute z-10"></div>
                <div className="w-full h-screen absolute z-20 px-28 py-18 flex items-end">
                    <div className="grid grid-cols-2 w-full h-2/3">
                        <motion.div 
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}
                            className="flex flex-col justify-center items-start gap-8"
                        >
                            <motion.div 
                                variants={itemVariants}
                                className="py-1 px-2 h-10 flex shadow-lg flex items-center border border-white/10 rounded-full text-green-500" 
                                style={{ backdropFilter: 'blur(5px)' }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 mr-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                                </svg>
                                Hello, <span className="text-white">Welcome to you</span>
                            </motion.div>

                            <motion.h1 
                                variants={itemVariants}
                                className="text-6xl text-white font-bold"
                            >
                                Your Smart and Reliable Medicine Finder
                            </motion.h1>

                            <motion.p 
                                variants={itemVariants}
                                className="text-xl max-w-2xl text-white"
                            >
                                A simplified and intuitive experience that helps you find the right medicines with clarity and confidence, giving you quick access to essential information and real-time availability.
                            </motion.p>

                            <motion.div 
                                variants={itemVariants}
                                className="w-3/4 p-2 h-20 border rounded-full grid grid-cols-[70px_1fr_100px] gap-2 bg-white/90" 
                                style={{ boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', backdropFilter: 'blur(10px)' }}
                            >
                                <div className="bg-blue-500 rounded-full flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                    </svg>
                                </div>
                                <input type="text" placeholder='Enter any medicine name...' className='border-none outline-none text-black/90 text-lg' />
                                <input type="text" placeholder='Dosage' className='border-none outline-none text-black/90 text-lg' />
                            </motion.div>
                        </motion.div>

                        <motion.div 
                            initial="hidden"
                            animate="visible"
                            variants={imageVariants}
                            className="flex items-end justify-end"
                        >
                            <div className="w-90 h-90 p-2 rounded-2xl border border-white/20" style={{ backdropFilter: 'blur(10px)' }}>
                                <div className="w-full h-full rounded-2xl border border-white/20 bg-white/50" style={{ backdropFilter: 'blur(10px)' }}></div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero
