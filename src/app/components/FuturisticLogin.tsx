"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const FuturisticLogin = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Email submitted:', email)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center">
          {/* Logo */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Image 
              src="/assets/logo.avif" 
              alt="House of Perfumes Logo" 
              width={80} 
              height={80} 
              className="mx-auto"
            />
          </motion.div>

          {/* Sign in heading */}
          <motion.h1
            className="text-2xl font-medium text-black mb-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Sign in
          </motion.h1>

          {/* Description text */}
          <motion.p
            className="text-gray-600 text-sm mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Enter your email and we'll send you a verification code
          </motion.p>

          {/* Email input form */}
          <form onSubmit={handleSubmit} className="mb-6">
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                required
              />
            </motion.div>

            {/* Continue button */}
            <motion.button
              type="submit"
              className="w-full py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 focus:outline-none transition-all"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Continue
            </motion.button>
          </form>

          {/* Privacy policy link */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <a
              href="#"
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              Privacy policy
            </a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default FuturisticLogin
