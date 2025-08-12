import Link from "next/link"
import { Button } from "./ui/button"
import { ArrowRight, Shield, Zap, Database } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1e3a5f] via-[#2a4a73] to-[#1e3a5f] text-white">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20"></div>
      <div className="container relative mx-auto px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Pay-As-You-Go Coin Data APIs
            <span className="block text-[#d4af37]">No Subscriptions. Just Results.</span>
          </h1>
          <p className="mb-10 text-lg text-gray-200 sm:text-xl">
            Access real-time pricing, population reports, and market analytics with transparent per-request pricing.
            Start free with generous limits on every API. Scale seamlessly with automatic volume discounts.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="bg-[#d4af37] text-[#1e3a5f] hover:bg-[#b8941f]">
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="border-white bg-white/10 text-white hover:bg-white hover:text-[#1e3a5f]">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#d4af37]/20">
              <Zap className="h-6 w-6 text-[#d4af37]" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Lightning Fast</h3>
            <p className="text-sm text-gray-300">Sub-50ms response times with 99.9% uptime SLA</p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#d4af37]/20">
              <Database className="h-6 w-6 text-[#d4af37]" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Comprehensive Data</h3>
            <p className="text-sm text-gray-300">500K+ coins, 50+ years of pricing history</p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#d4af37]/20">
              <Shield className="h-6 w-6 text-[#d4af37]" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Enterprise Security</h3>
            <p className="text-sm text-gray-300">SOC 2 Type II certified, end-to-end encryption</p>
          </div>
        </div>
      </div>
    </section>
  )
}