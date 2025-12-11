'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Shield, AlertCircle, Pharmacy, Bell } from 'lucide-react';

interface Feature {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
}

const features: Feature[] = [
  {
    icon: Shield,
    title: 'Smart Medication Insights',
    description: 'AI adjusts dosage & timing based on personal data',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    icon: AlertCircle,
    title: 'Drug Interaction Alerts',
    description: 'AI detects harmful combinations',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
  {
    icon: Pharmacy,
    title: 'Seamless Pharmacy Integrations From Doctors',
    description: 'Users connect directly with healthcare providers and pharmacies',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600',
  },
  {
    icon: Bell,
    title: 'Personalized Reminders',
    description: 'Context-aware notifications instead of rigid alarms',
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-600',
  },
];

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
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className='w-full min-h-screen flex items-center justify-center px-8 py-24'>
      <motion.div
        ref={ref}
        initial='hidden'
        animate={isInView ? 'visible' : 'hidden'}
        variants={containerVariants}
        className='max-w-6xl w-full'
      >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`${feature.bgColor} rounded-2xl p-8 backdrop-blur-sm border border-white/50`}
              >
                <div className='flex items-start gap-4 mb-4'>
                  <div className={`${feature.iconColor} p-3 rounded-lg bg-white/80`}>
                    <Icon size={28} />
                  </div>
                </div>
                <h3 className='text-xl font-semibold text-black mb-2'>
                  {feature.title}
                </h3>
                <p className='text-black/60 text-base leading-relaxed'>
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default Features;
