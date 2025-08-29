"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Truck, RefreshCw, Headphones, Shield } from 'lucide-react'

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative h-[60vh] bg-black overflow-hidden">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 400"><defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:%23D4AF37;stop-opacity:0.3" /><stop offset="25%" style="stop-color:%23FFD700;stop-opacity:0.4" /><stop offset="50%" style="stop-color:%23B8860B;stop-opacity:0.3" /><stop offset="75%" style="stop-color:%23DAA520;stop-opacity:0.4" /><stop offset="100%" style="stop-color:%23CD853F;stop-opacity:0.3" /></linearGradient></defs><rect width="1200" height="400" fill="url(%23grad1)"/><g opacity="0.6"><circle cx="150" cy="200" r="40" fill="%23FFD700" opacity="0.7"/><rect x="120" y="160" width="60" height="80" rx="30" fill="%23B8860B" opacity="0.8"/><circle cx="350" cy="180" r="35" fill="%23DAA520" opacity="0.6"/><rect x="325" y="145" width="50" height="70" rx="25" fill="%23CD853F" opacity="0.7"/><circle cx="550" cy="220" r="45" fill="%23D4AF37" opacity="0.8"/><rect x="520" y="175" width="60" height="90" rx="30" fill="%23FFD700" opacity="0.6"/><circle cx="750" cy="190" r="38" fill="%23B8860B" opacity="0.7"/><rect x="725" y="152" width="50" height="76" rx="25" fill="%23DAA520" opacity="0.8"/><circle cx="950" cy="210" r="42" fill="%23CD853F" opacity="0.6"/><rect x="925" y="168" width="50" height="84" rx="25" fill="%23D4AF37" opacity="0.7"/></g></svg>')`
          }}
        />
        
        {/* Decorative Circle */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center"
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="w-2 h-2 bg-black rounded-full"></div>
        </motion.div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* About Us Heading */}
          <motion.h2
            className="text-xs font-medium text-gray-500 tracking-[0.3em] mb-8 uppercase"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            ABOUT US
          </motion.h2>

          {/* House of Perfumes Title */}
          <motion.h1
            className="text-3xl md:text-4xl font-light text-black tracking-wider mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            HOUSE OF PERFUMES
          </motion.h1>

          {/* Description Text */}
          <motion.div
            className="text-gray-700 leading-relaxed mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="mb-6 text-sm md:text-base font-light">
              House of Perfumes, is a leading perfume house from the UAE, <span className="text-blue-600 font-medium">specializing in French, Arabic and Oriental fragrances</span> over the last 25 years. Our creations are made from all natural ingredients of essential oils and extracts sourced from the best flavors and scent providers in the world who focus on <span className="text-blue-600 font-medium">sustainable and environmentally friendly business practices</span>. We take inspiration in our designs and creations from the rich <span className="text-blue-600 font-medium">cultural heritage of Arabian perfumery</span> and wish to preserve this art through our sustainable and ESG focussed business model.
            </p>
          </motion.div>

          {/* Download Portfolio Button */}
          <motion.button
            className="bg-black text-white px-8 py-3 text-sm font-medium tracking-wider hover:bg-gray-800 transition-colors duration-300 mb-16"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            DOWNLOAD PORTFOLIO
          </motion.button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Free Delivery */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center mb-4">
                <Truck className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-xs font-medium text-gray-800 tracking-[0.2em] uppercase">
                FREE DELIVERY ABOVE 100 AED
              </h3>
            </motion.div>

            {/* Satisfied or Refunded */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center mb-4">
                <RefreshCw className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-xs font-medium text-gray-800 tracking-[0.2em] uppercase">
                SATISFIED OR REFUNDED
              </h3>
            </motion.div>

            {/* Top-Notch Support */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center mb-4">
                <Headphones className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-xs font-medium text-gray-800 tracking-[0.2em] uppercase">
                TOP-NOTCH SUPPORT
              </h3>
            </motion.div>

            {/* Secure Payments */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center mb-4">
                <Shield className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-xs font-medium text-gray-800 tracking-[0.2em] uppercase">
                SECURE PAYMENTS
              </h3>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
