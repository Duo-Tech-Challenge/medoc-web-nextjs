'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Star } from 'lucide-react';
import Link from 'next/link';

const SearchSection = () => {
  const [medicationQuery, setMedicationQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (medicationQuery.trim()) {
      // Redirect to search page with query
      window.location.href = `/search?medication=${encodeURIComponent(medicationQuery)}`;
    }
  };

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
      className="w-full py-16 px-4 bg-gradient-to-b from-blue-50 to-white"
      id="search"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Find Medications Near You
          </h2>
          <p className="text-lg text-gray-600">
            Search real-time availability across pharmacies in your area
          </p>
        </div>

        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Medication Input */}
            <div className="relative">
              <div className="absolute left-4 top-4 text-gray-400">
                <Search size={20} />
              </div>
              <input
                type="text"
                placeholder="Search medication (e.g., Aspirin)"
                value={medicationQuery}
                onChange={(e) => setMedicationQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Location Input */}
            <div className="relative">
              <div className="absolute left-4 top-4 text-gray-400">
                <MapPin size={20} />
              </div>
              <input
                type="text"
                placeholder="Your location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Search Now
          </button>
        </form>

        {/* Popular Searches */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-3">Popular searches:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['Paracetamol', 'Ibuprofen', 'Aspirin', 'Vitamin C'].map((med) => (
              <button
                key={med}
                onClick={() => window.location.href = `/search?medication=${med}`}
                className="px-3 py-1 text-sm text-blue-600 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors"
              >
                {med}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default SearchSection;
