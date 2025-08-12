"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Slider } from "./ui/slider"
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"
import { Check, X } from "lucide-react"

const pricingTiers = {
  basic: {
    name: "Basic",
    basePrice: 0,
    pricePerCall: 0.001,
    features: [
      "Up to 1,000 free API calls/month",
      "Basic coin pricing data",
      "Standard response time",
      "Community support",
      "Basic authentication",
      "JSON response format",
    ],
    limitations: [
      "No historical data",
      "No bulk operations",
      "Rate limit: 10 req/sec",
    ],
  },
  standard: {
    name: "Standard",
    basePrice: 99,
    pricePerCall: 0.003,
    features: [
      "Up to 10,000 free API calls/month",
      "Advanced pricing & grading data",
      "Population reports",
      "Priority response time",
      "Email support",
      "OAuth 2.0 authentication",
      "JSON & CSV formats",
      "5 years historical data",
      "Bulk operations (up to 100)",
      "Rate limit: 100 req/sec",
    ],
    limitations: [
      "No dedicated support",
    ],
  },
  advanced: {
    name: "Advanced",
    basePrice: 399,
    pricePerCall: 0.005,
    features: [
      "Up to 50,000 free API calls/month",
      "Complete pricing & market data",
      "Real-time market indicators",
      "Population & census data",
      "Fastest response time",
      "Priority support with SLA",
      "Advanced authentication",
      "All data formats",
      "Complete historical data",
      "Bulk operations (up to 1000)",
      "Rate limit: 500 req/sec",
      "Custom webhooks",
      "Analytics dashboard",
    ],
    limitations: [],
  },
  enterprise: {
    name: "Enterprise",
    basePrice: null,
    pricePerCall: null,
    features: [
      "Unlimited API calls",
      "Custom data feeds",
      "White-label options",
      "Dedicated infrastructure",
      "24/7 phone support",
      "Custom SLA",
      "On-premise deployment option",
      "Custom integrations",
      "Dedicated account manager",
      "Training & onboarding",
    ],
    limitations: [],
  },
}

export function PricingSection() {
  const [apiCalls, setApiCalls] = useState([10000])
  const [billingCycle, setBillingCycle] = useState("monthly")

  const calculatePrice = (tier: keyof typeof pricingTiers) => {
    const tierData = pricingTiers[tier]
    if (tierData.basePrice === null) return "Custom"
    
    const calls = apiCalls[0]
    const basePrice = tierData.basePrice
    const freeCallsMap = {
      basic: 1000,
      standard: 10000,
      advanced: 50000,
      enterprise: 0,
    }
    
    const freeCalls = freeCallsMap[tier]
    const billableCalls = Math.max(0, calls - freeCalls)
    const usagePrice = billableCalls * tierData.pricePerCall!
    const monthlyTotal = basePrice + usagePrice
    
    if (billingCycle === "annual") {
      return Math.round(monthlyTotal * 12 * 0.85) // 15% discount for annual
    }
    
    return Math.round(monthlyTotal)
  }

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Transparent, Usage-Based Pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Start free and scale as you grow. No hidden fees, no surprises.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-12">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estimated Monthly API Calls: <span className="font-bold text-[#1e3a5f]">{apiCalls[0].toLocaleString()}</span>
              </label>
              <Slider
                value={apiCalls}
                onValueChange={setApiCalls}
                min={0}
                max={200000}
                step={1000}
                className="mb-4"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0</span>
                <span>50K</span>
                <span>100K</span>
                <span>150K</span>
                <span>200K+</span>
              </div>
            </div>

            <Tabs value={billingCycle} onValueChange={setBillingCycle}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="monthly">Monthly Billing</TabsTrigger>
                <TabsTrigger value="annual">Annual Billing (Save 15%)</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          {Object.entries(pricingTiers).map(([key, tier]) => {
            const price = calculatePrice(key as keyof typeof pricingTiers)
            const isPopular = key === "standard"
            
            return (
              <Card key={key} className={`relative ${isPopular ? "border-[#d4af37] border-2" : ""}`}>
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-[#d4af37] text-[#1e3a5f] text-xs font-bold px-3 py-1 rounded-full">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{tier.name}</CardTitle>
                  <CardDescription>
                    {key === "basic" && "Perfect for getting started"}
                    {key === "standard" && "Best for growing applications"}
                    {key === "advanced" && "For high-volume production use"}
                    {key === "enterprise" && "Custom solutions for large teams"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="text-3xl font-bold text-gray-900">
                      {price === "Custom" ? (
                        "Custom"
                      ) : (
                        <>
                          ${price}
                          <span className="text-base font-normal text-gray-600">
                            /{billingCycle === "annual" ? "year" : "month"}
                          </span>
                        </>
                      )}
                    </div>
                    {tier.basePrice !== null && (
                      <p className="text-sm text-gray-600 mt-1">
                        ${tier.basePrice}/mo base + usage
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    {tier.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                    {tier.limitations.map((limitation, idx) => (
                      <div key={idx} className="flex items-start">
                        <X className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-500">{limitation}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className={`w-full ${
                      isPopular 
                        ? "bg-[#d4af37] text-[#1e3a5f] hover:bg-[#b8941f]" 
                        : key === "enterprise"
                        ? "bg-[#1e3a5f] hover:bg-[#2a4a73]"
                        : ""
                    }`}
                    variant={!isPopular && key !== "enterprise" ? "outline" : "default"}
                  >
                    {key === "enterprise" ? "Contact Sales" : "Get Started"}
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            All plans include SSL encryption, 99.9% uptime SLA, and comprehensive API documentation.
          </p>
        </div>
      </div>
    </section>
  )
}