// app/contact/page.tsx
"use client";

import { useState } from "react";
import { Gift } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

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
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Message sent successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          country: "",
          city: "",
          source: "",
          subject: "",
          message: "",
        });
      } else {
        alert("Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting form.");
    }
  };

  return (
    <div className="w-full">
      <section className="relative h-[80vh] bg-black overflow-hidden">
        <Image
          src="/assets/images/aboutImage.jpg"
          alt="About Us Background"
          fill
          priority
          className="object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-black/50" />
        <motion.h1
          className="absolute inset-0 flex items-center justify-center text-white text-4xl md:text-6xl font-light tracking-wider"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          CONTACT US
        </motion.h1>
      </section>

      <section className="bg-gray-100 py-16">
        <div className="max-w-2xl mx-auto px-4">
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
                Please write your inquiry*
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                required
                className="w-full border rounded px-3 py-2 text-black"
              />
            </div>

          

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </section>

      <section className="bg-gray-100 py-12 border-t">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            "FREE DELIVERY ABOVE 100 AED",
            "SATISFIED OR REFUNDED",
            "TOP-NOTCH SUPPORT",
            "SECURE PAYMENTS",
          ].map((text, i) => (
            <div
              key={i}
              className="flex flex-col items-center space-y-2 text-black"
            >
              <Gift size={22} className="text-black" />
              <p className="text-xs tracking-widest uppercase">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
