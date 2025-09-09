"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Truck, RefreshCw, Headphones, Shield } from "lucide-react";



const AboutPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative h-[80vh] bg-black overflow-hidden">
        {/* Background Image */}
        <Image
          src="/assets/images/aboutImage.jpg"
          alt="About Us Background"
          fill
          priority
          className="object-cover object-center opacity-70"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Centered About Us Text */}
        <motion.h1
          className="absolute inset-0 flex items-center justify-center text-white text-4xl md:text-6xl font-light tracking-wider"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          ABOUT US
        </motion.h1>
      </section>

      {/* Main Content Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* House of Perfumes Title */}
          <motion.h1
            className="text-3xl md:text-4xl font-light text-black tracking-wider mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            SCENTSKAPE
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
              At Scentskape, we are inspired by the world’s most iconic high-end perfume brands. Our passion lies in recreating those timeless, luxurious scents and making them accessible to everyone who appreciates fine fragrances. Each perfume in our collection is carefully crafted to reflect the elegance, richness, and character of designer originals—without the premium price tag. With long-lasting quality and attention to detail, Scentskape brings you the experience of luxury perfumes at an affordable value.
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
  );
};

export default AboutPage;
