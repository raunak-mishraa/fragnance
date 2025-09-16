'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = ({ onClose }: { onClose: () => void }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-40"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="relative flex items-center">
            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="SEARCH FOR..."
              className="flex-1 py-3 bg-transparent border-none outline-none text-black placeholder-gray-400 text-sm tracking-wider w-full"
            />
            <button
              onClick={onClose}
              className="ml-3 text-gray-400 hover:text-black transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchBar;