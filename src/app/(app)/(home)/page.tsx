import HeroSection from "@/components/HeroSection"
import NewArrivals from "@/components/NewArrivals"
import Bestseller from "@/components/Bestseller"
import ShopTheLook from "@/components/Shopthelook"
import ProductSection from "@/components/ProductSection"
import InfiniteScrollProducts from "@/components/InfiniteScrollProducts"
import ServiceHighlights from "@/components/ServiceHighlights"
import Marquee from "@/components/Marquee"
// import AnnouncementBar from "@/components/AnnouncementBar"
// import Header from "@/components/Header"
// import DiscountPopup from "@/components/DiscountPopup"
// import SpecialBrand from "@/components/SpecialBrand"
export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <NewArrivals /> 
      <Bestseller />
      {/* <DiscountPopup /> */}
      {/* <ShopTheLook />  */}
      {/* <SpecialBrand /> */}
      <ProductSection />
      {/* <InfiniteScrollProducts /> */}
      <Marquee />
      <ServiceHighlights />
    </main>
  )
}
