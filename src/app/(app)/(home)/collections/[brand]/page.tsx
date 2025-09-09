"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Grid, List, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  soldOut: boolean;
  color: string;
}

// Default products in INR
const defaultProducts: Product[] = [
  { id: 1, name: "NERO", price: "4999", image: "/api/placeholder/200/300", soldOut: true, color: "bg-gray-900" },
  { id: 2, name: "OUD", price: "5999", image: "/api/placeholder/200/300", soldOut: true, color: "bg-red-800" },
  { id: 3, name: "VERDE", price: "4499", image: "/api/placeholder/200/300", soldOut: true, color: "bg-green-800" },
  { id: 4, name: "BLU", price: "5299", image: "/api/placeholder/200/300", soldOut: true, color: "bg-blue-800" },
  { id: 5, name: "AZZURRO", price: "4799", image: "/api/placeholder/200/300", soldOut: true, color: "bg-cyan-400" },
  { id: 6, name: "ROSA", price: "5499", image: "/api/placeholder/200/300", soldOut: true, color: "bg-pink-500" },
  { id: 7, name: "LIME", price: "4599", image: "/api/placeholder/200/300", soldOut: true, color: "bg-lime-500" },
  { id: 8, name: "ROSSO", price: "5799", image: "/api/placeholder/200/300", soldOut: true, color: "bg-red-600" },
];

const FilterSection = ({
  title,
  children,
  isOpen,
  onToggle,
}: {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <div className="border-b border-gray-200 pb-4 mb-4">
    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full text-left font-medium text-gray-900 hover:text-gray-700 transition-colors"
    >
      {title}
      {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
    </button>
    {isOpen && <div className="mt-3">{children}</div>}
  </div>
);

const ProductCard = ({ product }: { product: Product }) => (
  <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 relative overflow-hidden">
    {product.soldOut && (
      <Badge variant="secondary" className="absolute top-2 left-2 z-10 bg-gray-100 text-gray-600">
        SOLD OUT
      </Badge>
    )}
    <CardContent className="p-0">
      <div className="aspect-[3/4] relative overflow-hidden bg-gray-50">
        <div className={`absolute inset-0 ${product.color} opacity-20`}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-24 h-32 rounded-full ${product.color} shadow-xl relative`}>
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-6 h-8 bg-gray-800 rounded-sm"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
        {product.soldOut && <div className="absolute inset-0 bg-white bg-opacity-40"></div>}
      </div>
      <div className="p-4 text-center">
        <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
        <p className="text-gray-600">₹{product.price}</p>
      </div>
    </CardContent>
  </Card>
);

export default function ProductListingPage() {
  const params = useParams();
  const brandName = Array.isArray(params?.brand) ? params.brand.join("-") : params?.brand || "default-brand";

  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([1000, 10000]);
  const [openSections, setOpenSections] = useState({
    availability: true,
    price: true,
    size: true,
    type: true,
    brand: true,
    category: true,
  });

  // Fetch products dynamically based on brandName
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`/api/products/${brandName}`);
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        } else {
          // Fallback to default products if API fails or no products found
          setProducts(defaultProducts);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setProducts(defaultProducts);
      }
    }
    fetchProducts();
  }, [brandName]);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Filter products client-side
  const filteredProducts = products.filter((p) => {
    const price = parseFloat(p.price);
    if (inStockOnly && p.soldOut) return false;
    if (price < priceRange[0] || price > priceRange[1]) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] bg-black overflow-hidden">
        <Image
          src="/assets/images/aboutImage.jpg"
          alt="Brand Background"
          fill
          priority
          className="object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-black/50" />
        <motion.a
          href={`/collections/${brandName}`}
          className="absolute inset-0 flex items-center justify-center text-white text-3xl md:text-5xl font-light tracking-wider capitalize"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {brandName.replace(/-/g, " ")}
        </motion.a>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-80 flex-shrink-0">
          <div className="sticky top-4">
            {/* View Options */}
            <div className="flex items-center gap-2 mb-6">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="p-2"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="p-2"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            <FilterSection title="AVAILABILITY" isOpen={openSections.availability} onToggle={() => toggleSection("availability")}>
              <div className="flex items-center space-x-2">
                <Switch id="in-stock" checked={inStockOnly} onCheckedChange={setInStockOnly} />
                <label htmlFor="in-stock" className="text-sm font-medium text-gray-700">In stock only</label>
              </div>
            </FilterSection>

            <FilterSection title="PRICE" isOpen={openSections.price} onToggle={() => toggleSection("price")}>
              <div className="space-y-4">
                <Slider
                  value={priceRange}
                  onValueChange={(value) => setPriceRange([value[0], value[1]])}
                  max={10000}
                  min={1000}
                  step={100}
                  className="w-full"
                />
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">₹</span>
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 1000, priceRange[1]])}
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                  <span className="text-gray-400">to</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">₹</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 10000])}
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>
              </div>
            </FilterSection>

            <FilterSection title="SIZE" isOpen={openSections.size} onToggle={() => toggleSection("size")}>
              <div className="text-sm text-gray-700">100 ML (8)</div>
            </FilterSection>

            <FilterSection title="TYPE" isOpen={openSections.type} onToggle={() => toggleSection("type")}>
              <div className="text-sm text-gray-700">EDP (8)</div>
            </FilterSection>

            <FilterSection title="BRAND" isOpen={openSections.brand} onToggle={() => toggleSection("brand")}>
              <div className="text-sm text-gray-700">{brandName.replace(/-/g, " ")} ({products.length})</div>
            </FilterSection>

            <FilterSection title="CATEGORY" isOpen={openSections.category} onToggle={() => toggleSection("category")}>
              <div className="text-sm text-gray-700">MEN (4)</div>
            </FilterSection>
          </div>
        </aside>

        {/* Products */}
        <main className="flex-1">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
            <h1 className="text-sm font-medium text-gray-600 tracking-wider">{filteredProducts.length} PRODUCTS</h1>
            <Select defaultValue="featured">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="SORT BY" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name: A to Z</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className={`grid gap-6 ${viewMode === "grid" ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}