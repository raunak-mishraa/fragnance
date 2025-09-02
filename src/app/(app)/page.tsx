import HeroSection from "@/app/components/HeroSection"
import NewArrivals from "@/app/components/NewArrivals"
import Bestseller from "@/app/components/Bestseller"
import DiscountPopup from "@/app/components/DiscountPopup"
import ShopTheLook from "@/app/components/Shopthelook"
import SpecialBrand from "@/app/components/SpecialBrand"
import ProductSection from "@/app/components/ProductSection"
import InfiniteScrollProducts from "@/app/components/InfiniteScrollProducts"
import ServiceHighlights from "@/app/components/ServiceHighlights"
import Header from "@/app/components/Header"

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <HeroSection />
      <NewArrivals />
      <Bestseller />
      {/* <DiscountPopup /> */}
      <ShopTheLook /> 
      {/* <SpecialBrand /> */}
      <ProductSection />
      <InfiniteScrollProducts />
      <ServiceHighlights />
    </main>
  )
}
