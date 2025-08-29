import HeroSection from "@/app/components/HeroSection"
import NewArrivals from "@/app/components/NewArrivals"
import Bestseller from "@/app/components/Bestseller"
import DiscountPopup from "@/app/components/DiscountPopup"

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <NewArrivals />
      <Bestseller />
      {/* <DiscountPopup /> */}
    </main>
  )
}
