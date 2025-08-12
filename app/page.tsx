import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { PricingSection } from "@/components/pricing-section"
import { ApiModelsSection } from "@/components/api-models-section"
import { DeveloperResources } from "@/components/developer-resources"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <ApiModelsSection />
      <PricingSection />
      <DeveloperResources />
      <Footer />
    </div>
  )
}