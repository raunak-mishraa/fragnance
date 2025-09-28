"use client"

import React from "react"
import { motion } from "framer-motion"

const HeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Video */}
      <div className="w-full sm:block hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-auto object-contain"
        >
          <source src="/assets/videos/hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Overlay on top of video */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      {/* Scroll Indicator */}
      {/* <motion.div
        className="relative z-10 flex justify-center mt-4 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="w-1 h-3 bg-white/70 rounded-full mt-2"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div> */}
    </section>
  )
}

export default HeroSection
