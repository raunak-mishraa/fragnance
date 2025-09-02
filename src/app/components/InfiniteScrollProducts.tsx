"use client";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const products = [
  { name: "Mashair Original", img: "/mashair.png" },
  { name: "Natura", img: "/natura.png" },
  { name: "Oud Ambari", img: "/oud-ambari.png" },
  { name: "Qasida Bronze", img: "/qasida.png" },
  { name: "Favourite Legacy", img: "/legacy.png" },
  { name: "Suger Rose", img: "/suger-rose.png" },
  { name: "X Bond Gold Gift Set", img: "/x-bond-gold.png" },
  { name: "Inspired Pink", img: "/inspired-pink.png" },
  { name: "X Bond Blue", img: "/x-bond-blue.png" },
  { name: "Dark Rose", img: "/dark-rose.png" },
];

export default function InfiniteScrollProducts() {
  return (
    <div className="w-full bg-gray-50 py-6">
      <Marquee pauseOnHover speed={50} gradient={false}>
        {products.map((product, index) => (
          <div
            key={index}
            className="flex flex-col items-center min-w-[140px] mx-6"
          >
            <div className="relative w-12 h-16 mb-2">
              <Image
                src={product.img}
                alt={product.name}
                fill
                className="object-contain"
              />
            </div>
            <p className="text-sm font-medium text-gray-800 whitespace-nowrap">
              {product.name}
            </p>
          </div>
        ))}
      </Marquee>
    </div>
  );
}
