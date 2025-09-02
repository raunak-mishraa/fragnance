"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const brands = [
  {
    name: "Brand 1",
    brandImage: "/assets/test/test_1.webp", // big image (multiple products shown together)
    products: [
      {
        id: 1,
        name: "OMBRE OUD",
        price: "DHS. 175.00",
        soldOut: true,
        image: "/assets/test/test_1_0.webp",
        hotspot: { top: "40%", left: "35%" }, // dot position on brand image
      },
      {
        id: 2,
        name: "FAVOURITE",
        price: "DHS. 150.00",
        soldOut: false,
        image: "/favourite.png",
        hotspot: { top: "40%", left: "50%" },
      },
      {
        id: 3,
        name: "LEGACY",
        price: "DHS. 160.00",
        soldOut: false,
        image: "/legacy.png",
        hotspot: { top: "40%", left: "65%" },
      },
    ],
  },
  {
    name: "Brand 2",
    brandImage: "/assets/test/test_2.jpg",
    products: [
      {
        id: 1,
        name: "ROYAL WOOD",
        price: "DHS. 200.00",
        soldOut: false,
        image: "/assets/test/test_3.jpg",
        hotspot: { top: "50%", left: "40%" },
      },
    ],
  },
];

export default function ShopTheLook() {
  const [brandIndex, setBrandIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(brands[0].products[0]);

  const handleNext = () => {
    const newIndex = (brandIndex + 1) % brands.length;
    setBrandIndex(newIndex);
    setSelectedProduct(brands[newIndex].products[0]); // reset to first product
  };

  const handlePrev = () => {
    const newIndex = (brandIndex - 1 + brands.length) % brands.length;
    setBrandIndex(newIndex);
    setSelectedProduct(brands[newIndex].products[0]);
  };

  const currentBrand = brands[brandIndex];

  return (
    <section className="bg-gray-100 py-12">
      <h2 className="text-center text-xl tracking-widest mb-8">SHOP THE LOOK</h2>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 relative">
        {/* Left - Brand Image with Hotspots */}
        <div className="relative w-[400px] h-[500px]">
          <Image
            src={currentBrand.brandImage}
            alt={currentBrand.name}
            fill
            className="object-cover"
          />
          {currentBrand.products.map((product) => (
            <button
              key={product.id}
              className="absolute w-6 h-6 bg-white border-2 border-gray-800 rounded-full flex items-center justify-center shadow"
              style={{ top: product.hotspot.top, left: product.hotspot.left }}
              onClick={() => setSelectedProduct(product)}
            >
              <span className="w-2 h-2 bg-gray-800 rounded-full"></span>
            </button>
          ))}
        </div>

        {/* Right - Product Details */}
        <div className="w-[250px] text-center">
          <div className="relative w-full h-[300px]">
            <Image
              src={selectedProduct.image}
              alt={selectedProduct.name}
              fill
              className="object-contain"
            />
          </div>
          {selectedProduct.soldOut && (
            <p className="text-sm uppercase text-gray-500 mt-2">Sold Out</p>
          )}
          <h3 className="mt-2 text-lg font-medium">{selectedProduct.name}</h3>
          <p className="text-gray-600">{selectedProduct.price}</p>
          <button className="mt-4 bg-black text-white px-6 py-2">
            View Product
          </button>
        </div>

        {/* Left & Right Arrows */}
        <button
          className="absolute left-0 md:left-[-50px] bg-white p-3 rounded-full shadow"
          onClick={handlePrev}
        >
          <ChevronLeft />
        </button>
        <button
          className="absolute right-0 md:right-[-50px] bg-white p-3 rounded-full shadow"
          onClick={handleNext}
        >
          <ChevronRight />
        </button>
      </div>
    </section>
  );
}
