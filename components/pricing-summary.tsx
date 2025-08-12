"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Check, ArrowRight, Calculator, Database, TrendingUp, History, Zap, DollarSign } from "lucide-react"

const apiProducts = [
  {
    id: "base-data",
    name: "Base Data API",
    icon: Database,
    description: "Essential pricing & catalog data",
    freeRequests: "10K/mo free",
    startingPrice: "$0.10 per 1K",
    features: [
      "Current market prices",
      "Coin information",
      "Grade-based pricing"
    ]
  },
  {
    id: "advanced-valuation",
    name: "Advanced Valuation",
    icon: Calculator,
    description: "AI-powered price predictions",
    freeRequests: "1K/mo free",
    startingPrice: "$0.30 per 1K",
    multiplier: "3x",
    features: [
      "ML price predictions",
      "Market trends",
      "Volatility indicators"
    ]
  },
  {
    id: "population-census",
    name: "Population & Census",
    icon: TrendingUp,
    description: "PCGS/NGC population reports",
    freeRequests: "2.5K/mo free",
    startingPrice: "$0.20 per 1K",
    multiplier: "2x",
    features: [
      "Population data",
      "Census reports",
      "CAC approval rates"
    ]
  },
  {
    id: "market-analytics",
    name: "Market Analytics",
    icon: TrendingUp,
    description: "Trading metrics & intelligence",
    freeRequests: "500/mo free",
    startingPrice: "$0.40 per 1K",
    multiplier: "4x",
    features: [
      "Market indices",
      "Top movers",
      "Depth analysis"
    ]
  },
  {
    id: "historical-data",
    name: "Historical Archive",
    icon: History,
    description: "10+ years of pricing history",
    freeRequests: "1K/mo free",
    startingPrice: "$0.35 per 1K",
    multiplier: "3.5x",
    features: [
      "Price history",
      "Auction archives",
      "Market cycles"
    ]
  },
  {
    id: "enterprise-feed",
    name: "Enterprise Feed",
    icon: Zap,
    description: "Real-time streaming data",
    freeRequests: "Custom",
    startingPrice: "Contact Sales",
    features: [
      "WebSocket streaming",
      "Custom schemas",
      "Dedicated support"
    ]
  }
]

export function PricingSummary() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-[#d4af37] text-[#1e3a5f] font-semibold">
            TRANSPARENT PRICING
          </Badge>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Pay Only for What You Use
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            No subscriptions, no commitments. Each API has its own free tier to get started.
            Volume discounts apply automatically as your usage grows.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/pricing">
              <Button size="lg" className="bg-[#1e3a5f] hover:bg-[#2a4a73]">
                View Full Pricing
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline">
                <Calculator className="mr-2 h-4 w-4" />
                Pricing Calculator
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {apiProducts.map((product) => {
            const Icon = product.icon
            const isHovered = hoveredCard === product.id
            
            return (
              <Card 
                key={product.id}
                className={`relative transition-all cursor-pointer ${
                  isHovered ? "shadow-lg scale-105 border-[#1e3a5f]" : "hover:shadow-md"
                }`}
                onMouseEnter={() => setHoveredCard(product.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {product.multiplier && (
                  <Badge 
                    className="absolute -top-2 -right-2 bg-blue-500 text-white border-0"
                  >
                    {product.multiplier} credits
                  </Badge>
                )}
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Icon className="h-6 w-6 text-[#1e3a5f]" />
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {product.freeRequests}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <p className="text-2xl font-bold text-gray-900">
                      {product.startingPrice}
                    </p>
                    <p className="text-xs text-gray-500">after free tier</p>
                  </div>
                  <ul className="space-y-2">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-12 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-8">
          <div className="max-w-3xl mx-auto text-center">
            <DollarSign className="h-12 w-12 mx-auto mb-4 text-green-600" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Save 15% with Annual Billing
            </h3>
            <p className="text-gray-600 mb-6">
              Commit to annual billing and save 15% on all API usage. 
              Perfect for production applications with predictable workloads.
            </p>
            <Link href="/pricing">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Calculate Your Savings
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}