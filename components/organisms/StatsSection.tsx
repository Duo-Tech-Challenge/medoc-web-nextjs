'use client';

import { motion } from 'framer-motion';
import { Clock, Users, Package, Award } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    { icon: <Package size={32} />, label: 'Medications', value: '5000+', color: 'bg-blue-100' },
    { icon: <Users size={32} />, label: 'Pharmacies', value: '500+', color: 'bg-green-100' },
    { icon: <Clock size={32} />, label: 'Real-time Updates', value: '24/7', color: 'bg-purple-100' },
    { icon: <Award size={32} />, label: 'Satisfaction', value: '98%', color: 'bg-orange-100' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: true }}
      className="w-full py-16 px-4 bg-white"
      id="stats"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-lg text-gray-600">
            Médoc is the leading medication discovery platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className={`${stat.color} rounded-xl p-8 text-center`}
            >
              <div className="flex justify-center mb-4 text-gray-700">
                {stat.icon}
              </div>
              <p className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</p>
              <p className="text-gray-700 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default StatsSection;
