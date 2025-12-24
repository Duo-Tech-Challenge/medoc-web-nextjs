'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const CTASection = () => {
  const containerVariants = {
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
      className="w-full py-16 px-4 bg-gradient-to-r from-blue-600 to-blue-700"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Find Your Medication?
        </h2>
        <p className="text-lg text-blue-100 mb-8">
          Join thousands of users who trust Médoc for their pharmacy needs
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/search">
            <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              Start Searching
            </button>
          </Link>

          <Link href="/pages">
            <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
              Explore All Pages
            </button>
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default CTASection;
