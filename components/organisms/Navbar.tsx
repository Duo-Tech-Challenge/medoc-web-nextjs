'use client';

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const Navbar = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <>
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className='flex justify-between items-center w-8xl py-8 rounded-full absolute top-12 z-100 text-lg text-white'
      >
        <motion.div 
          variants={itemVariants}
          className="w-2xl text-white flex items-end gap-2"
        >
          <Image src='/logo.png' alt="Médoc logo" width={50} height={10} />
          <div className='text-xl font-bold'>Médoc.</div>
        </motion.div>

        <motion.ul 
          variants={containerVariants}
          className="flex items-center justify-center gap-8"
        >
          <motion.li variants={itemVariants}>
            <Link href="/" className='border-b border-b-3 border-b-white/0 hover:border-b-white duration-400 pb-3'>Home</Link>
          </motion.li>
          <motion.li variants={itemVariants}>
            <Link href="/#about" className='border-b border-b-3 border-b-white/0 hover:border-b-white duration-400 pb-3'>About</Link>
          </motion.li>
          <motion.li variants={itemVariants}>
            <Link href="/#features" className='border-b border-b-3 border-b-white/0 hover:border-b-white duration-400 pb-3'>Our Features</Link>
          </motion.li>
        </motion.ul>

        <motion.div 
          variants={containerVariants}
          className="w-2xl flex items-center justify-end gap-8"
        >
          <motion.div variants={itemVariants}>
            <Link href="/auth/login" className='inline-block'>
              <button className='cursor-pointer py-4 px-6 border rounded-full overflow-hidden group duration-300 relative'>
                <div className="w-full h-full flex items-center justify-center">Login</div>
              </button>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link href="/auth/register" className='inline-block'>
              <button className='cursor-pointer py-4 px-6 border rounded-full overflow-hidden group duration-300 relative'>
                <div className="w-full h-full flex items-center justify-center">Join As Pharmacy</div>
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  )
}

export default Navbar
