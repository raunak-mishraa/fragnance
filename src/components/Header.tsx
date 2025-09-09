"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import AnnouncementBar from './AnnouncementBar';

const brands = [
  "Pacific Intense", "Millionaire", "Woody Oud", "Vanilla Cigar", "Leatherette", "Cherry Bliss", 
  "Y-King", "Aventis", "Mt. Silver", "The G.O.A.T", "Prisprysm", "SRK", "Hermes", "Most Hunted", 
  "White Oud", "Addiction", "Pride", "Floral Garden", "The No 5", "Tropical Rush", "Alpha Male", 
  "Savage", "Blue", "Aqua Vibe", "Aqua de Blu", "Nomad's Path", "Y S L Y", "Afgan", "Ispan", 
  "Forever Yours", "Chrome", "Red Tobacco", "Drake Noir", "Tyger", "Eros Blue", "Legend", 
  "Pink Tease", "Illusion", "Love Spell", "BR Five40", "Roses and More", "Delina", 
  "Chocolate Eclairs", "Juicy Apple", "Tam Dam", "Iconic", "Boss", "Obsession", "Origins", 
  "Cool Breeze"
];

// Custom icon components
const UserIcon = ({ className, isScrolled, isHovered }: { className?: string, isScrolled: boolean, isHovered: boolean }) => (
  <svg className={className} aria-hidden="true" fill="none" focusable="false" width="24" viewBox="0 0 24 24">
    <path d="M16.125 8.75c-.184 2.478-2.063 4.5-4.125 4.5s-3.944-2.021-4.125-4.5c-.187-2.578 1.64-4.5 4.125-4.5 2.484 0 4.313 1.969 4.125 4.5Z" stroke={isScrolled || isHovered ? "#000000" : "#ffffff"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3.017 20.747C3.783 16.5 7.922 14.25 12 14.25s8.217 2.25 8.984 6.497" stroke={isScrolled || isHovered ? "#000000" : "#ffffff"} strokeWidth="1.5" strokeMiterlimit="10" />
  </svg>
);

const SearchIcon = ({ className, isScrolled, isHovered }: { className?: string, isScrolled: boolean, isHovered: boolean }) => (
  <svg className={className} aria-hidden="true" fill="none" focusable="false" width="24" viewBox="0 0 24 24">
    <path d="M10.364 3a7.364 7.364 0 1 0 0 14.727 7.364 7.364 0 0 0 0-14.727Z" stroke={isScrolled || isHovered ? "#000000" : "#ffffff"} strokeWidth="1.5" strokeMiterlimit="10" />
    <path d="M15.857 15.858 21 21.001" stroke={isScrolled || isHovered ? "#000000" : "#ffffff"} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" />
  </svg>
);

const ShoppingBagIcon = ({ className, isScrolled, isHovered }: { className?: string, isScrolled: boolean, isHovered: boolean }) => (
  <svg className={className} aria-hidden="true" fill="none" focusable="false" width="24" viewBox="0 0 24 24">
    <path d="M4.75 8.25A.75.75 0 0 0 4 9L3 19.125c0 1.418 1.207 2.625 2.625 2.625h12.75c1.418 0 2.625-1.149 2.625-2.566L20 9a.75.75 0 0 0-.75-.75H4.75Zm2.75 0v-1.5a4.5 4.5 0 0 1 4.5-4.5v0a4.5 4.5 0 0 1 4.5 4.5v1.5" stroke={isScrolled || isHovered ? "#000000" : "#ffffff"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Header = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showDark = isScrolled || isHovered;

  const handleUserClick = () => {
    router.push('/login');
  };

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleNavClick = (category: string) => {
    if (category === 'ABOUT US') {
      router.push('/about');
    } else if (category === 'CONTACT US') {
      router.push('/contact');
    }
  };

  const handleBrandClick = (brand: string) => {
    const formattedBrand = brand.toLowerCase().replace(/\s+/g, '-');
    router.push(`/collections/${formattedBrand}`);
  };

  const categories = {
    'BRAND': brands,
    'COLLECTIONS': [],
    'SOCIAL HUB': [],
    'ABOUT US': [],
    'CONTACT US': []
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled || isHovered || isSearchOpen
          ? 'bg-white shadow-sm'
          : 'bg-transparent'
      }`}
      onMouseEnter={() => setTimeout(() => setIsHovered(true), 100)}
      onMouseLeave={() => setTimeout(() => setIsHovered(false), 100)}
    >
      <AnnouncementBar className={`${isScrolled ? 'hidden' : 'block'}`} />
      <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {/* Top Header */}
        <motion.div 
          className="flex items-center justify-center h-auto relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className='relative cursor-pointer'
            onClick={() => router.push('/')}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className='relative h-12 w-fit max-w-24 my-3.5'>
              <Image
                src="/assets/images/logo.png"
                alt="House of Perfumes Logo"
                width={80}
                height={80}
                className={`object-contain transition-opacity duration-300 w-full h-full ${
                  showDark ? "hidden" : "block"
                }`}
              />
              <Image
                src="/assets/images/logo_dark.png"
                alt="House of Perfumes Dark Logo"
                width={80}
                height={80}
                className={`object-contain transition-opacity duration-300 w-full h-full ${
                  showDark ? "block" : "hidden"
                }`}
              />
            </div>
          </motion.div>
          
          <div className="flex items-center space-x-6 absolute right-0">
            <motion.button 
              onClick={handleUserClick}
              className="transition-colors duration-300 cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <UserIcon className="h-6 w-6" isScrolled={isScrolled} isHovered={isHovered} />
            </motion.button>

            <motion.button 
              onClick={handleSearchClick}
              className="transition-colors duration-300 cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <SearchIcon className="h-6 w-6" isScrolled={isScrolled} isHovered={isHovered} />
            </motion.button>

            <motion.button 
              onClick={handleCartClick}
              className="transition-colors duration-300 cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <ShoppingBagIcon className="h-6 w-6" isScrolled={isScrolled} isHovered={isHovered} />
            </motion.button>
          </div>
        </motion.div>

        <motion.nav 
          className="flex justify-center space-x-8 pb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {Object.keys(categories).map((category, index) => (
            <div 
              key={category}
              className="relative"
              onMouseEnter={() => setTimeout(() => setHoveredCategory(category), 100)}
              onMouseLeave={() => setTimeout(() => setHoveredCategory(null), 100)}
            >
              <motion.button
                onClick={() => handleNavClick(category)}
                className={`${
                  isScrolled || isHovered 
                    ? 'text-black hover:text-gray-600' 
                    : 'text-white hover:text-gray-300'
                } text-sm font-light tracking-wider py-2 px-1 relative block transition-colors duration-300 cursor-pointer`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                {category}
                <motion.div
                  className={`absolute top-full left-0 h-0.5 mt-4 z-50 ${
                    isScrolled || isHovered ? 'bg-black' : 'bg-white'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ 
                    width: hoveredCategory === category && category === 'BRAND' ? '800px' : 
                           hoveredCategory === category ? '100%' : 0 
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
              </motion.button>

              <AnimatePresence>
                {hoveredCategory === 'BRAND' && category === 'BRAND' && (
                  <motion.div
                    className="absolute top-full left-0 mt-4.5 bg-white border border-gray-200 shadow-xl z-50 overflow-hidden"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="grid grid-cols-4 gap-0 w-[800px] p-6">
                      {categories['BRAND'].map((brand, index) => (
                        <motion.a
                          key={brand}
                          onClick={() => handleBrandClick(brand)}
                          className="block text-xs text-gray-600 hover:text-black transition-colors tracking-wider py-1 cursor-pointer"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          whileHover={{ x: 5, color: '#000' }}
                        >
                          {brand}
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.nav>

        <AnimatePresence>
          {isSearchOpen && (
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
                    className="flex-1 py-3 bg-transparent border-none outline-none text-black placeholder-gray-400 text-sm tracking-wider"
                    autoFocus
                  />
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="ml-3 text-gray-400 hover:text-black transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 h-full w-96 bg-white shadow-xl z-50 overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-light text-black">Shopping Cart</h2>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-gray-400 hover:text-black transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <ShoppingBagIcon className="w-8 h-8" isScrolled={true} isHovered={false} />
                  </div>
                  <p className="text-gray-600 mb-4">Your cart is empty</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="bg-black text-white px-6 py-2 text-sm font-medium tracking-wider hover:bg-gray-800 transition-colors"
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;