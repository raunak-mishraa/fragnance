"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const messages = [
  "FREE DELIVERY ABOVE 400 INR",
  "DELIVERY IN INDIA ONLY !!",
  "SIGN UP & GET 10% OFF YOUR FIRST PURCHASE",
]

export default function AnnouncementBar({ className = "" }: { className?: string }) {
  const [index, setIndex] = useState(0)

  // Auto-rotate messages every 4s
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const prevMessage = () =>
    setIndex((prev) => (prev - 1 + messages.length) % messages.length)
  const nextMessage = () => setIndex((prev) => (prev + 1) % messages.length)

  return (
    <div className={`w-full bg-[#1C1C1C] font-deem text-white font-small tracking-mid uppercase flex items-center justify-center relative h-13 sm:h-10 ${className}`}>
      {/* Left arrow - positioned properly for both mobile and desktop */}
      <button
        onClick={prevMessage}
        className="absolute left-4 sm:left-1/2 sm:-translate-x-100 text-white/75 hover:text-white transition-colors z-10"
        aria-label="Previous announcement"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Animated message - responsive width */}
      <div className="text-center w-8/12 sm:w-10/12 mx-2">
        <p
          key={index}
          className="animate-fadeSlide px-2 sm:px-6 text-center whitespace-normal break-words"
        >
          {messages[index]}
        </p>
      </div>

      {/* Right arrow - positioned properly for both mobile and desktop */}
      <button
        onClick={nextMessage}
        className="absolute right-4 sm:right-1/2 sm:translate-x-100 text-white/75 hover:text-white transition-colors z-10"
        aria-label="Next announcement"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  )
}