import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { MapboxStylePricing } from "@/components/mapbox-style-pricing"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <MapboxStylePricing />
      <Footer />
    </div>
  )
}