"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { AppDispatch } from "@/store/store";
import { addToCart } from "@/slices/cartSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
interface ProductPageProps {
  product: {
    id: string;
    flavor: string;
    mrp: string;
    size: string;
    type: string;
    category: string;
    description: string;
    brand: { name: string; slug: string };
    images: { id: string; url: string; altText: string }[];
    fragrance?: { topNotes?: string; middleNotes?: string; baseNotes?: string };
  };
}

export default function ProductPage({ product }: ProductPageProps) {
  const [selectedImage, setSelectedImage] = useState(product.images[0]?.url);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  // console.log("User in ProductPage:", user);
  const router = useRouter();
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !isZoomed) return;

    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomPosition({ x, y });
  };

  const handleAddToCart = () => {
    if (!user.id) {
      router.push("/login");
      return;
    }
    dispatch(addToCart({ perfumeId: product.id, quantity: 1 }));
    alert("Added to cart!");
  }
  const handleBuyNow = () => console.log("Buy now:", product);

  return (
    <div className=" px-4 sm:px-6 md:px-34 py-20 grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8 bg-[var(--main-color)]">
      {/* LEFT: Images (60%) */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Thumbnails */}
        <div className="flex lg:flex-col gap-3 order-2 lg:order-1 overflow-x-auto lg:overflow-y-auto py-1 lg:max-h-[500px]">
          {product.images.map((img) => (
            <button
              key={img.id}
              className={`flex-shrink-0 border-2 transition-all duration-200 ${
                selectedImage === img.url
                  ? "border-black/70 shadow-sm"
                  : "border-gray-100 hover:border-gray-300"
              }`}
              onClick={() => setSelectedImage(img.url)}
            >
              <Image
                src={img.url}
                alt={img.altText}
                width={64}
                height={64}
                className="object-cover w-16 h-16"
              />
            </button>
          ))}
        </div>

        {/* Main Image */}
        <div
          ref={imageRef}
          className="relative overflow-hidden rounded-lg order-1 lg:order-2 flex-1 h-80 sm:h-96 lg:h-[500px]"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
        >
          <Image
            src={selectedImage || "/placeholder.jpg"}
            alt={product.flavor}
            fill
            className="object-contain cursor-zoom-in"
            style={{
              transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
              transform: isZoomed ? "scale(2.5)" : "scale(1)",
              transition: "transform 0.2s ease-out"
            }}
          />
        </div>
      </div>

      {/* RIGHT: Product Details (40%) - Sticky */}
      <div className="lg:sticky lg:top-24 lg:self-start flex flex-col space-y-6 h-fit">
        {/* Title + Brand */}
        <div>
          <p className="uppercase tracking-wide text-gray-500 text-sm font-medium mb-1">
            {product.brand.name}
          </p>
          <h1 className="text-2xl md:text-3xl font-light my-3 uppercase tracking-wide text-gray-900">
            {product.flavor}
          </h1>
          <p className="text-xl text-gray-800 font-medium">DHS. {product.mrp}</p>
        </div>

        {/* Meta Info */}
        <div className="text-sm text-gray-800 space-y-3 py-2 border-t border-b border-gray-100 flex flex-col gap-2.5">
          <p>
            <span className="font-light text-gray-600 tracking-extra uppercase">Category:</span>{" "}
            <span className="uppercase">{product.category}</span>
          </p>
          <p>
            <span className="font-light tracking-extra uppercase">Size:</span> {product.size} ML
          </p>
          <p>
            <span className="font-light tracking-extra uppercase">Type:</span> {product.type}
          </p>
        </div>

        {product.description && (
          <div className="text-gray-600 text-sm leading-relaxed">
            {product.description}
          </div>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={handleAddToCart}
            className={`border border-black py-3 px-6 text-sm uppercase tracking-wider font-medium flex-1`}
          >
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            className="bg-black text-white py-3 px-6 text-sm uppercase tracking-wider font-medium flex-1"
          >
            Buy Now
          </button>
        </div>

        {/* Fragrance Notes */}
        {product.fragrance && (
          <div className="pt-6 border-t border-gray-100 space-y-3">
            <h2 className="font-semibold uppercase text-gray-900 text-sm tracking-wide">
              Fragrance Notes
            </h2>
            {product.fragrance.topNotes && (
              <p className="text-sm">
                <span className="font-medium text-gray-600">Top Notes:</span>{" "}
                {product.fragrance.topNotes}
              </p>
            )}
            {product.fragrance.middleNotes && (
              <p className="text-sm">
                <span className="font-medium text-gray-600">Middle Notes:</span>{" "}
                {product.fragrance.middleNotes}
              </p>
            )}
            {product.fragrance.baseNotes && (
              <p className="text-sm">
                <span className="font-medium text-gray-600">Base Notes:</span>{" "}
                {product.fragrance.baseNotes}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}