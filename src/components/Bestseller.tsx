"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const Bestseller = () => {
  const [activeCategory, setActiveCategory] = useState('MEN\'S');
  const router = useRouter();
  
  const categories = ['MEN\'S', 'WOMEN\'S', 'UNISEX'];
  
  const products = {
    'MEN\'S': [
      {
        id: 1,
        name: 'X BOND AQUA',
        price: '290.00',
        currency: '₹',
        soldOut: true,
        color: 'from-cyan-200 to-cyan-300',
        bottleColor: 'from-cyan-400 to-cyan-600'
      },
      {
        id: 2,
        name: 'X BOND BLACK',
        price: '290.00',
        currency: '₹',
        soldOut: true,
        color: 'from-gray-200 to-gray-300',
        bottleColor: 'from-gray-700 to-gray-900'
      },
      {
        id: 3,
        name: 'X BOND BLUE',
        price: '290.00',
        currency: '₹',
        soldOut: true,
        color: 'from-blue-200 to-blue-300',
        bottleColor: 'from-blue-600 to-blue-800'
      },
      {
        id: 4,
        name: 'X BOND GOLD',
        price: '290.00',
        currency: '₹',
        soldOut: true,
        color: 'from-yellow-200 to-yellow-300',
        bottleColor: 'from-yellow-500 to-yellow-700'
      }
    ],
    'WOMEN\'S': [
      {
        id: 5,
        name: 'ORCHID ROSE',
        price: '350.00',
        currency: '₹',
        soldOut: true,
        color: 'from-pink-200 to-pink-300',
        bottleColor: 'from-pink-500 to-pink-700'
      },
      {
        id: 6,
        name: 'ORCHID WHITE',
        price: '350.00',
        currency: '₹',
        soldOut: true,
        color: 'from-purple-200 to-purple-300',
        bottleColor: 'from-purple-500 to-purple-700'
      },
      {
        id: 7,
        name: 'ORCHID GOLD',
        price: '350.00',
        currency: '₹',
        soldOut: true,
        color: 'from-amber-200 to-amber-300',
        bottleColor: 'from-amber-500 to-amber-700'
      },
      {
        id: 8,
        name: 'ORCHID BLACK',
        price: '350.00',
        currency: '₹',
        soldOut: true,
        color: 'from-gray-200 to-gray-300',
        bottleColor: 'from-gray-700 to-gray-900'
      }
    ],
    'UNISEX': [
      {
        id: 9,
        name: 'MYSTIC OUD',
        price: '450.00',
        currency: '₹',
        soldOut: true,
        color: 'from-amber-200 to-amber-300',
        bottleColor: 'from-amber-600 to-amber-800'
      },
      {
        id: 10,
        name: 'MYSTIC BLACK',
        price: '450.00',
        currency: '₹',
        soldOut: true,
        color: 'from-gray-200 to-gray-300',
        bottleColor: 'from-gray-700 to-gray-900'
      },
      {
        id: 11,
        name: 'MYSTIC BLUE',
        price: '450.00',
        currency: '₹',
        soldOut: true,
        color: 'from-blue-200 to-blue-300',
        bottleColor: 'from-blue-600 to-blue-800'
      },
      {
        id: 12,
        name: 'MYSTIC GOLD',
        price: '450.00',
        currency: '₹',
        soldOut: true,
        color: 'from-yellow-200 to-yellow-300',
        bottleColor: 'from-yellow-500 to-yellow-700'
      }
    ]
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xs font-medium text-gray-500 tracking-[0.2em] mb-6 uppercase">
            BESTSELLER
          </h2>
          
          {/* Category Tabs */}
          <div className="flex justify-center space-x-8 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative text-lg font-light tracking-wider pb-2 transition-colors duration-300 ${
                  activeCategory === category 
                    ? 'text-black' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
                {/* Active underline */}
                {activeCategory === category && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Products Container */}
        <div className="relative">
          {/* Products Grid - Hidden on mobile, shown on tablet and up */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {products[activeCategory as keyof typeof products].map((product, index) => (
              <motion.div
                key={product.id}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                {/* Product Image */}
                <div className="relative mb-4 overflow-hidden bg-white rounded-lg">
                  {/* Sold Out Badge */}
                  {product.soldOut && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className="bg-gray-800 text-white text-xs font-medium px-2 py-1 tracking-wider">
                        SOLD OUT
                      </span>
                    </div>
                  )}
                  
                  {/* Product Image Container */}
                  <div className={`aspect-square relative bg-gradient-to-br ${product.color} p-8`}>
                    {/* Perfume Bottle */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`w-20 h-32 bg-gradient-to-b ${product.bottleColor} rounded-lg shadow-xl relative overflow-hidden`}>
                        {/* Bottle Cap */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-8 h-4 bg-black rounded-t-lg"></div>
                        
                        {/* Bottle Label */}
                        <div className="absolute inset-x-2 top-6 bottom-6 bg-black/10 rounded flex items-center justify-center">
                          <div className="text-white text-[6px] font-bold transform rotate-90 whitespace-nowrap tracking-wider">
                            {product.name.split(' ')[1] || product.name}
                          </div>
                        </div>
                        
                        {/* Bottle Reflection */}
                        <div className="absolute left-1 top-2 bottom-2 w-1 bg-white/30 rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* Hover Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                  </div>
                </div>

                {/* Product Info */}
                <div className="text-center">
                  <h3 className="text-sm font-medium text-black tracking-wider mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 font-light">
                    {product.currency} {product.price}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Horizontal Scroll Container - Visible only on mobile */}
          <div className="sm:hidden overflow-x-auto pb-4 mb-8 -mx-4 px-4 
                [-ms-overflow-style:none] [scrollbar-width:none] 
                [-webkit-overflow-scrolling:touch]">
            <div className="flex space-x-6 min-w-min">
              {products[activeCategory as keyof typeof products].map((product, index) => (
                <motion.div
                  key={product.id}
                  className="group cursor-pointer flex-shrink-0 w-64"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Product Image */}
                  <div className="relative mb-4 overflow-hidden bg-white rounded-lg">
                    {/* Sold Out Badge */}
                    {product.soldOut && (
                      <div className="absolute top-3 left-3 z-10">
                        <span className="bg-gray-800 text-white text-xs font-medium px-2 py-1 tracking-wider">
                          SOLD OUT
                        </span>
                      </div>
                    )}
                    
                    {/* Product Image Container */}
                    <div className={`aspect-square relative bg-gradient-to-br ${product.color} p-8 w-64`}>
                      {/* Perfume Bottle */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`w-20 h-32 bg-gradient-to-b ${product.bottleColor} rounded-lg shadow-xl relative overflow-hidden`}>
                          {/* Bottle Cap */}
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-8 h-4 bg-black rounded-t-lg"></div>
                          
                          {/* Bottle Label */}
                          <div className="absolute inset-x-2 top-6 bottom-6 bg-black/10 rounded flex items-center justify-center">
                            <div className="text-white text-[6px] font-bold transform rotate-90 whitespace-nowrap tracking-wider">
                              {product.name.split(' ')[1] || product.name}
                            </div>
                          </div>
                          
                          {/* Bottle Reflection */}
                          <div className="absolute left-1 top-2 bottom-2 w-1 bg-white/30 rounded-full"></div>
                        </div>
                      </div>
                      
                      {/* Hover Overlay */}
                      <motion.div
                        className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      />
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="text-center">
                    <h3 className="text-sm font-medium text-black tracking-wider mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 font-light">
                      {product.currency} {product.price}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.button
            onClick={() => router.push('/collections/bestsellers')}
            className="bg-black text-white px-8 py-3 text-sm font-medium tracking-wider hover:bg-transparent hover:border-black border-2 hover:text-black transition-colors duration-300"
            whileTap={{ scale: 0.95 }}
          >
            VIEW ALL
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Bestseller;