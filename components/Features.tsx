'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Search, Info, Store, AlertCircle } from 'lucide-react';
import Image from 'next/image';

const Features = () => {
  const { ref, isInView } = useScrollAnimation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-8 py-2">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={containerVariants}
        className="max-w-[90%] w-full h-screen"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative h-[80%]">
          
          {/* Logo central */}
          <div
            className="p-2 absolute z-100 top-[50%] left-[50%] shadow rounded-full"
            style={{ backdropFilter: 'blur(10px)', transform: 'translate(-50%, -50%)' }}
          >
            <div
              className="h-50 w-50 bg-white/70 rounded-full flex items-center justify-center shadow"
              style={{ backdropFilter: 'blur(30px)' }}
            >
              <Image
                src="/logo.png"
                alt="Médoc logo"
                width={100}
                height={20}
                className="drop-shadow-xl"
              />
            </div>
          </div>

          {/* Feature 1 */}
          <motion.div
            variants={itemVariants}
            className="bg-blue-100 rounded-2xl p-8 backdrop-blur-sm border border-white/50"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="text-blue-600 p-3 rounded-lg bg-white/80">
                <Search size={28} />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">
              Advanced Drug Search
            </h3>
            <p className="text-black/60 text-base leading-relaxed">
              Find medications instantly with smart filtering and accurate results.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            variants={itemVariants}
            className="bg-blue-100 rounded-2xl p-8 backdrop-blur-sm border border-white/50"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="text-purple-600 p-3 rounded-lg bg-white/80">
                <Info size={28} />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">
              Complete Medication Details
            </h3>
            <p className="text-black/60 text-base leading-relaxed">
              Access dosage info, side effects, precautions, and usage guidelines.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            variants={itemVariants}
            className="bg-blue-100 rounded-2xl p-8 backdrop-blur-sm border border-white/50"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="text-green-600 p-3 rounded-lg bg-white/80">
                <Store size={28} />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">
              Pharmacy Availability
            </h3>
            <p className="text-black/60 text-base leading-relaxed">
              Check real-time stock and prices across nearby pharmacies.
            </p>
          </motion.div>

          {/* Feature 4 */}
          <motion.div
            variants={itemVariants}
            className="bg-blue-100 rounded-2xl p-8 backdrop-blur-sm border border-white/50"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="text-orange-600 p-3 rounded-lg bg-white/80">
                <AlertCircle size={28} />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">
              Interaction & Safety Alerts
            </h3>
            <p className="text-black/60 text-base leading-relaxed">
              Automatically detect dangerous drug interactions and warnings.
            </p>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
};

export default Features;