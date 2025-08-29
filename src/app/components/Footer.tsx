"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'

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
          
          {/* Newsletter Section */}
          <div className="lg:col-span-1">
            <h3 className="text-sm font-medium text-black tracking-wider mb-4">
              NEWSLETTER
            </h3>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Sign up to our newsletter to receive exclusive offers.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-300 text-black placeholder-gray-500 focus:outline-none focus:border-black transition-colors text-sm"
                  required
                />
              </div>
              <motion.button
                type="submit"
                className="bg-black text-white px-6 py-2 text-xs font-medium tracking-wider hover:bg-gray-800 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                SUBSCRIBE
              </motion.button>
            </form>
          </div>

          {/* Find Out More */}
          <div>
            <h3 className="text-sm font-medium text-black tracking-wider mb-4">
              FIND OUT MORE
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">
                  ABOUT US
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">
                  CONTACT US
                </a>
              </li>
            </ul>
          </div>

          {/* Main Menu Footer */}
          <div>
            <h3 className="text-sm font-medium text-black tracking-wider mb-4">
              MAIN MENU FOOTER
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">
                  BWMC 2024
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">
                  PRODUCT
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">
                  SMART SHOPPING
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">
                  SOCIAL HUB
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
                <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">
                  PRIVACY POLICY
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">
                  TERMS OF SERVICE
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200">
          {/* Copyright */}
          <div className="mb-4 md:mb-0">
            <p className="text-xs text-gray-500 tracking-wider">
              © 2025 - HOUSE OF PERFUMES
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
