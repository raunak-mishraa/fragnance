"use client"

import { useState } from "react"
import { X } from "lucide-react"

export default function DiscountPopup() {
  const [isOpen, setIsOpen] = useState(true)

  if (!isOpen) return null

  return (
    <div className="fixed bottom-8 right-8 max-w-sm bg-black text-white p-6 rounded-lg shadow-2xl z-50 animate-fadeIn">
      {/* Close */}
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-3 right-3 text-gray-300 hover:text-white"
      >
        <X size={18} />
      </button>

      <h2 className="text-lg font-semibold mb-2">ENJOY 10% OFF ON YOUR FIRST PURCHASE</h2>
      <p className="text-sm text-gray-300 mb-4">
        Using code <span className="font-bold">NEWUSER10</span>
      </p>
      <p className="text-sm text-gray-400 mb-4">
        Sign up to join the House of Perfumes family! We’ll keep you updated on our latest
        products & promotions.
      </p>

      <form className="space-y-3">
        <input
          type="email"
          placeholder="E-mail"
          className="w-full px-3 py-2 rounded-md bg-transparent border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
        />
        <button
          type="submit"
          className="w-full bg-white text-black py-2 rounded-md font-medium hover:bg-gray-200 transition"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  )
}
