"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

const NewArrivals = () => {
  const router = useRouter();
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
    <section className="py-20 bg-[#EFEFEF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl md:text-4xl font-light text-black tracking-wider mb-4">
            NEW ARRIVALS
          </h2>
        </motion.div>

        {/* Products Container - Horizontal scroll on mobile */}
        <div className="relative">
          {/* Products Grid - Hidden on mobile, shown on tablet and up */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
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

          {/* Horizontal Scroll Container - Visible only on mobile */}
          <div className="sm:hidden overflow-x-auto pb-4 mb-8 -mx-4 px-4 
                [-ms-overflow-style:none] [scrollbar-width:none] 
                [-webkit-overflow-scrolling:touch]">
            <div className="flex space-x-6 min-w-min">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="group cursor-pointer flex-shrink-0 w-64"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Product Image */}
                  <div className="relative mb-4 overflow-hidden bg-white">
                    {/* Product Image Container */}
                    <div className="aspect-square relative bg-gradient-to-br from-amber-100 to-amber-200 w-64">
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
          </div>
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
            onClick={() => router.push('/collections/new-arrivals')}
            className="bg-black text-white px-8 py-3 text-sm font-medium tracking-wider hover:bg-transparent hover:border-black border-2 hover:text-black transition-colors duration-300"
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