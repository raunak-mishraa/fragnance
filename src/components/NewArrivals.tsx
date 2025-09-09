"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const NewArrivals = () => {
  const products = [
    {
      id: 1,
      name: "FAVOURITE",
      price: "6999.00",
      currency: "₹",
      image: "/assets/images/new-arrivals/product-1.webp",
      soldOut: true,
    },
    {
      id: 2,
      name: "LEGACY",
      price: "6999.00",
      currency: "₹",
      image: "/assets/images/new-arrivals/product-2.webp",
      soldOut: true,
    },
    {
      id: 3,
      name: "OMGOT OUD",
      price: "6999.00",
      currency: "₹",
      image: "/assets/images/new-arrivals/product-3.webp",
      soldOut: true,
    },
    {
      id: 4,
      name: "MASHAM CLASSIC",
      price: "4899.00",
      currency: "₹",
      image: "/assets/images/new-arrivals/product-4.webp",
      soldOut: true,
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-light text-black tracking-wider mb-4">
            NEW ARRIVALS
          </h2>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {/* Product Image */}
              <div className="relative mb-4 overflow-hidden bg-white">
                {/* Sold Out Badge */}
                {product.soldOut && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-gray-800 text-white text-xs font-medium px-2 py-1 tracking-wider">
                      SOLD OUT
                    </span>
                  </div>
                )}

                {/* Product Image Container */}
                <div className="aspect-square relative bg-gradient-to-br from-amber-100 to-amber-200">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover object-center transition-opacity duration-300 group-hover:opacity-90"
                  />
                  {/* Hover Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="text-center">
                <h3 className="text-sm font-medium text-black tracking-wider mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 font-light">
                  {product.currency} {product.price}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="bg-black text-white px-8 py-3 text-sm font-medium tracking-wider hover:bg-gray-800 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            VIEW ALL
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default NewArrivals;