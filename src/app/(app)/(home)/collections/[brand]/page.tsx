"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Grid, List, Grid3X3, ChevronDown, ChevronUp } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  flavor: string;
  mrp: number | string;
  size: string;
  type: string;
  category: string;
  images: { id: string; url: string; altText: string }[];
  brand: { name: string; slug: string };
  variants: Array<{ stock: number }>;
}

interface FilterOptions {
  types: string[];
  categories: string[];
  sizes: string[];
}


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

const ProductCard = ({ product, index }: { product: Product; index: number }) => {
  const imageUrl = product.images.length > 0 ? product.images[0].url : "/placeholder.png";
  const isSoldOut = product.variants.every(v => v.stock <= 0);
  const router = useRouter();
  return (
    <motion.div
      key={product.id}
      className="group cursor-pointer"
      onClick={() => router.push(`/product/${product.id}`)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      {/* Product Image */}
      <div className="relative mb-4 overflow-hidden bg-white">
        {/* Sold Out Badge */}
        {/* {isSoldOut && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-gray-800 text-white text-xs font-medium px-2 py-1 tracking-wider">
              SOLD OUT
            </span>
          </div>
        )} */}

        {/* Product Image Container */}
        <div className="aspect-square relative bg-gradient-to-br from-amber-100 to-amber-200">
          <Image
            src={imageUrl}
            alt={product.flavor}
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
        <h3 className="text-sm font-medium text-black tracking-wider mb-2 uppercase">
          {product.flavor}
        </h3>
        <p className="text-sm text-gray-600 font-light">
          INR {typeof product.mrp === 'string' ? parseFloat(product.mrp).toFixed(2) : product.mrp.toFixed(2)}
        </p>
      </div>
    </motion.div>
  );
};

export default function ProductListingPage() {
  const params = useParams();
  const brandName = Array.isArray(params?.brand)
    ? params.brand.join("-")
    : params?.brand || "default-brand";
  
  const [products, setProducts] = useState<Product[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    types: [],
    categories: [],
    sizes: []
  });
  const [viewMode, setViewMode] = useState<"grid3" | "grid4" | "grid5">("grid4");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const [openSections, setOpenSections] = useState({
    availability: true,
    price: true,
    size: true,
    type: true,
    category: true,
  });

  // Fetch products dynamically based on brand slug
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`/api/products?brand=${brandName}`);
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
          
          // Extract filter options from products
          const types = Array.from(new Set(data.map((p: Product) => p.type))).filter(Boolean) as string[];
          const categories = Array.from(new Set(data.map((p: Product) => p.category))).filter(Boolean) as string[];
          const sizes = Array.from(new Set(data.map((p: Product) => p.size))).filter(Boolean) as string[];
          
          setFilterOptions({ types, categories, sizes });
          
          // Set price range based on actual product prices
          if (data.length > 0) {
            const prices = data.map((p: Product) => typeof p.mrp === 'string' ? parseFloat(p.mrp) : p.mrp);
            const minPrice = Math.min(...prices);
            const maxPrice = Math.max(...prices);
            setPriceRange([minPrice, maxPrice]);
          } else {
            // Default range when no products
            setPriceRange([0, 10000]);
          }
        } else {
          setProducts([]);
          setPriceRange([0, 10000]);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setProducts([]);
        setPriceRange([0, 10000]);
      }
    }
    fetchProducts();
  }, [brandName]);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleTypeChange = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const handleSizeChange = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size) 
        : [...prev, size]
    );
  };

  // Get grid class based on view mode
  const getGridClass = () => {
    switch (viewMode) {
      case "grid3":
        return "sm:grid-cols-2 lg:grid-cols-3";
      case "grid4":
        return "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      case "grid5":
        return "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5";
      default:
        return "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
    }
  };

  // Client-side filter
  const filteredProducts = products
    .filter((p) => {
      const price = typeof p.mrp === 'string' ? parseFloat(p.mrp) : p.mrp;
      const isInStock = p.variants.some(v => v.stock > 0);
      
      if (inStockOnly && !isInStock) return false;
      if (price < priceRange[0] || price > priceRange[1]) return false;
      if (selectedTypes.length > 0 && !selectedTypes.includes(p.type)) return false;
      if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) return false;
      if (selectedSizes.length > 0 && !selectedSizes.includes(p.size)) return false;
      
      return true;
    })
    .sort((a, b) => {
      const priceA = typeof a.mrp === 'string' ? parseFloat(a.mrp) : a.mrp;
      const priceB = typeof b.mrp === 'string' ? parseFloat(b.mrp) : b.mrp;
      
      switch (sortBy) {
        case "price-low":
          return priceA - priceB;
        case "price-high":
          return priceB - priceA;
        case "name":
          return a.flavor.localeCompare(b.flavor);
        default: // "featured"
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-[#EFEFEF]">
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
          className="absolute uppercase inset-0 flex items-center  justify-center text-white text-3xl md:text-5xl font-extralight tracking-extra "
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
                variant={viewMode === "grid3" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid3")}
                className="p-2"
                title="3 products per row"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "grid4" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid4")}
                className="p-2"
                title="4 products per row"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "grid5" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid5")}
                className="p-2"
                title="5 products per row"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            <FilterSection
              title="PRICE"
              isOpen={openSections.price}
              onToggle={() => toggleSection("price")}
            >
              <div className="space-y-4">
                <Slider
                  value={priceRange}
                  onValueChange={(value) => setPriceRange([value[0], value[1]])}
                  max={priceRange[1]}
                  min={priceRange[0]}
                  step={100}
                  className="w-full"
                  disabled={products.length === 0}
                />
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">₹{priceRange[0]}</span>
                  <span className="text-gray-400">to</span>
                  <span className="text-sm text-gray-600">₹{priceRange[1]}</span>
                </div>
              </div>
            </FilterSection>

            <FilterSection
              title="TYPE"
              isOpen={openSections.type}
              onToggle={() => toggleSection("type")}
            >
              <div className="space-y-2">
                {filterOptions.types.map(type => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`type-${type}`} 
                      checked={selectedTypes.includes(type)}
                      onCheckedChange={() => handleTypeChange(type)}
                      disabled={products.length === 0}
                    />
                    <Label htmlFor={`type-${type}`} className="text-sm font-normal capitalize">
                      {type.replace(/_/g, ' ')}
                    </Label>
                  </div>
                ))}
              </div>
            </FilterSection>

            <FilterSection
              title="CATEGORY"
              isOpen={openSections.category}
              onToggle={() => toggleSection("category")}
            >
              <div className="space-y-2">
                {filterOptions.categories.map(category => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`category-${category}`} 
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => handleCategoryChange(category)}
                      disabled={products.length === 0}
                    />
                    <Label htmlFor={`category-${category}`} className="text-sm font-normal capitalize">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </FilterSection>

            <FilterSection
              title="SIZE"
              isOpen={openSections.size}
              onToggle={() => toggleSection("size")}
            >
              <div className="space-y-2">
                {filterOptions.sizes.map(size => (
                  <div key={size} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`size-${size}`} 
                      checked={selectedSizes.includes(size)}
                      onCheckedChange={() => handleSizeChange(size)}
                      disabled={products.length === 0}
                    />
                    <Label htmlFor={`size-${size}`} className="text-sm font-normal">
                      {size}ml
                    </Label>
                  </div>
                ))}
              </div>
            </FilterSection>
          </div>
        </aside>

        {/* Products */}
        <main className="flex-1">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
            <h1 className="text-sm font-medium text-gray-600 tracking-wider">
              {filteredProducts.length} PRODUCTS
            </h1>
            <Select value={sortBy} onValueChange={setSortBy} disabled={products.length === 0}>
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

          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-500 text-lg py-10">
              {products.length === 0 ? "No products found for this brand" : "No products match your filters"}
            </p>
          ) : (
            <div className={`grid gap-8 ${getGridClass()}`}>
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}