"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const messages = [
  "FREE DELIVERY ABOVE 100 AED",
  "DELIVERY IN UAE ONLY !!",
  "SIGN UP & GET 10% OFF YOUR FIRST PURCHASE",
]

export default function AnnouncementBar() {
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
    <div className="w-full bg-[#1C1C1C] text-white text-sm tracking-widest uppercase flex items-center justify-center relative h-10">
      {/* Left arrow */}
      <button
        onClick={prevMessage}
        className="absolute left-1/2 -translate-x-100 text-gray-400 hover:text-white transition"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Animated message */}
      <div className="overflow-hidden">
        <p
          key={index}
          className="animate-fadeSlide px-6 text-center whitespace-nowrap"
        >
          {messages[index]}
        </p>
      </div>

      {/* Right arrow */}
      <button
        onClick={nextMessage}
        className="absolute right-1/2 translate-x-100 text-gray-400 hover:text-white transition"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  )
}
