"use client"

import { useState } from "react"
import { ChevronDown, Gift } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    country: "",
    city: "",
    source: "",
    subject: "",
    message: "",
    file: null as File | null,
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({ ...prev, file: e.target.files![0] }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted", formData)
    // send formData via API / email service here
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section
        className="relative h-[60vh] bg-cover bg-center flex items-end justify-center"
        style={{ backgroundImage: "url('/contact-hero.jpg')" }} // replace with your image
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute bottom-6 bg-white rounded-full shadow-md p-2 cursor-pointer animate-bounce">
          <ChevronDown className="text-black" size={22} />
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-2xl mx-auto px-4"> {/* ⬅️ decreased width from 4xl to 2xl */}
          <h2 className="text-center text-xl font-semibold tracking-[0.3em] mb-10 uppercase text-black">
            Contact Us
          </h2>

          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-lg p-8 space-y-6 text-black"
          >
            {/* Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-1 text-black">
                  First Name*
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2 text-black"
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-black">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 text-black"
                />
              </div>
            </div>

            {/* Phone + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-1 text-black">
                  Phone Number*
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2 text-black"
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-black">Email*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2 text-black"
                />
              </div>
            </div>

            {/* Country + City */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-1 text-black">Country*</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2 text-black"
                >
                  <option value="">Please Select</option>
                  <option value="UAE">UAE</option>
                  <option value="USA">USA</option>
                  <option value="India">India</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1 text-black">City*</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2 text-black"
                />
              </div>
            </div>

            {/* Source */}
            <div>
              <label className="block text-sm mb-1 text-black">
                How did you come to know about us?*
              </label>
              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2 text-black"
              >
                <option value="">Please Select</option>
                <option value="social">Social Media</option>
                <option value="friend">Friend</option>
                <option value="ads">Advertisement</option>
              </select>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm mb-1 text-black">
                Inquiry Subject*
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2 text-black"
              >
                <option value="">Please Select</option>
                <option value="order">Order</option>
                <option value="support">Support</option>
                <option value="general">General</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm mb-1 text-black">
                Please write your inquiry**
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full border rounded px-3 py-2 text-black"
              />
            </div>

            {/* File Upload */}
            <div>
              <input
                type="file"
                onChange={handleFileChange}
                className="block text-sm text-black"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </section>

      {/* Bottom Features */}
      <section className="bg-gray-100 py-12 border-t">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            "FREE DELIVERY ABOVE 100 AED",
            "SATISFIED OR REFUNDED",
            "TOP-NOTCH SUPPORT",
            "SECURE PAYMENTS",
          ].map((text, i) => (
            <div key={i} className="flex flex-col items-center space-y-2 text-black">
              <Gift size={22} className="text-black" />
              <p className="text-xs tracking-widest uppercase">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
