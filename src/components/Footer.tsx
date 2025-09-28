"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const Footer = () => {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log('Subscribe email:', email)
    setEmail('')
  }

  return (
    <footer className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Company Details Section - Replaced Newsletter */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              {/* Logo */}
              <div className="relative w-7 h-7 mb-4 flex items-center space-x-1">
                <Image
                  src="/assets/images/logo_dark.png"
                  alt="Scentskape Logo"
                  width={12}
                  height={12}
                  className="object-contain w-full h-full"
                />
                <span className='text-xl font-bold'>SCENTSKAPE</span>
              </div>
              
              {/* Company Description */}
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                At Scentskape, we are inspired by the world's most iconic high-end perfume brands. 
                Our passion lies in recreating those timeless, luxurious scents and making them 
                accessible to everyone who appreciates fine fragrances.
              </p>
              
              {/* Address */}
              <div className="text-sm text-gray-600 mb-2">
                <p className="font-medium text-black">Address:</p>
                <p>Shop no. 81, Sai Krupa Mall, SV Road</p>
                <p>Dahisar West, Opposite Dahisar Railway Station</p>
                <p>Mumbai, India</p>
              </div>
              
              {/* Email */}
              <div className="text-sm text-gray-600">
                <p className="font-medium text-black">Email:</p>
                <a 
                  href="mailto:sales@scentskape.in" 
                  className="hover:text-black transition-colors"
                >
                  sales@scentskape.in
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links - Replaced Find Out More */}
          <div>
            <h3 className="text-sm font-medium text-black tracking-wider mb-4">
              QUICK LINKS
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="/about" className="text-sm text-gray-600 hover:text-black transition-colors">
                  ABOUT US
                </a>
              </li>
              <li>
                <a href="/contact" className="text-sm text-gray-600 hover:text-black transition-colors">
                  CONTACT US
                </a>
              </li>
              <li>
                <a href="/products" className="text-sm text-gray-600 hover:text-black transition-colors">
                  PRODUCTS
                </a>
              </li>
              <li>
                <a href="/collections" className="text-sm text-gray-600 hover:text-black transition-colors">
                  COLLECTIONS
                </a>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-sm font-medium text-black tracking-wider mb-4">
              POLICIES
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="/privacy-policy" className="text-sm text-gray-600 hover:text-black transition-colors">
                  PRIVACY POLICY
                </a>
              </li>
              <li>
                <a href="/terms-of-service" className="text-sm text-gray-600 hover:text-black transition-colors">
                  TERMS OF SERVICE
                </a>
              </li>
              <li>
                <a href="/shipping-policy" className="text-sm text-gray-600 hover:text-black transition-colors">
                  SHIPPING POLICY
                </a>
              </li>
              <li>
                <a href="/return-policy" className="text-sm text-gray-600 hover:text-black transition-colors">
                  RETURN POLICY
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-sm font-medium text-black tracking-wider mb-4">
              FOLLOW US
            </h3>
            <div className="flex space-x-4 mb-6">
              {/* Instagram */}
              <motion.a
                href="https://instagram.com/scentskape"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-pink-500 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5 text-gray-600 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </motion.a>

              {/* Facebook */}
              <motion.a
                href="https://facebook.com/scentskape"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5 text-gray-600 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </motion.a>

              {/* Twitter */}
              <motion.a
                href="https://twitter.com/scentskape"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5 text-gray-600 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.016 10.016 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </motion.a>

              {/* WhatsApp */}
              <motion.a
                href="https://wa.me/your-number"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5 text-gray-600 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </motion.a>
            </div>

            {/* Newsletter Signup - Compact version */}
            <div>
              <h4 className="text-xs font-medium text-black tracking-wider mb-2">
                STAY UPDATED
              </h4>
              <form onSubmit={handleSubscribe} className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-2 bg-white border border-gray-300 text-black placeholder-gray-500 focus:outline-none focus:border-black transition-colors text-xs"
                  required
                />
                <motion.button
                  type="submit"
                  className="bg-black text-white px-3 py-2 text-xs font-medium tracking-wider hover:bg-gray-800 transition-colors whitespace-nowrap"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  JOIN
                </motion.button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200">
          {/* Copyright */}
          <div className="mb-4 md:mb-0">
            <p className="text-xs text-gray-500 tracking-wider">
              © {new Date().getFullYear()} - SCENTSKAPE. ALL RIGHTS RESERVED.
            </p>
          </div>

          {/* Payment Icons */}
          <div className="flex items-center space-x-3">
            {/* American Express */}
            <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">AE</span>
            </div>
            
            {/* Apple Pay */}
            <div className="w-10 h-6 bg-black rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">🍎</span>
            </div>
            
            {/* Mastercard */}
            <div className="w-10 h-6 bg-red-500 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">MC</span>
            </div>
            
            {/* Visa */}
            <div className="w-10 h-6 bg-blue-700 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">V</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer