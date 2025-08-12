"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Slider } from "./ui/slider"
import { Badge } from "./ui/badge"
import { Check, Info, Calculator, TrendingUp, History, Database, Shield, Zap, DollarSign } from "lucide-react"

const apiProducts = [
  {
    id: "base-data",
    name: "Base Data API",
    icon: Database,
    description: "Essential coin pricing and catalog data",
    freeRequests: 10000,
    tiers: [
      { min: 0, max: 10000, price: 0, label: "First 10K free" },
      { min: 10001, max: 100000, price: 0.0001, label: "$0.10 per 1K" },
      { min: 100001, max: 500000, price: 0.00008, label: "$0.08 per 1K" },
      { min: 500001, max: null, price: 0.00005, label: "$0.05 per 1K" }
    ],
    features: [
      "Current market prices",
      "Basic coin information",
      "Grade-based pricing",
      "Standard catalog navigation",
      "99.9% uptime SLA"
    ],
    endpoints: [
      "/api/pricing/{gsId}",
      "/api/nodes",
      "/api/collectibles/{gsId}",
      "/api/collectibles/search"
    ]
  },
  {
    id: "advanced-valuation",
    name: "Advanced Valuation Model",
    icon: Calculator,
    description: "AI-powered pricing predictions and market analysis",
    freeRequests: 1000,
    multiplier: 3,
    tiers: [
      { min: 0, max: 1000, price: 0, label: "First 1K free" },
      { min: 1001, max: 50000, price: 0.0003, label: "$0.30 per 1K" },
      { min: 50001, max: 200000, price: 0.00025, label: "$0.25 per 1K" },
      { min: 200001, max: null, price: 0.0002, label: "$0.20 per 1K" }
    ],
    features: [
      "Machine learning price predictions",
      "Market trend analysis",
      "Price volatility indicators",
      "Liquidity scoring",
      "CAC premium analysis"
    ],
    endpoints: [
      "/api/valuation/predict",
      "/api/valuation/trends",
      "/api/valuation/volatility",
      "/api/valuation/liquidity"
    ]
  },
  {
    id: "population-census",
    name: "Population & Census Data",
    icon: TrendingUp,
    description: "Comprehensive population reports and census analytics",
    freeRequests: 2500,
    multiplier: 2,
    tiers: [
      { min: 0, max: 2500, price: 0, label: "First 2.5K free" },
      { min: 2501, max: 75000, price: 0.0002, label: "$0.20 per 1K" },
      { min: 75001, max: 300000, price: 0.00015, label: "$0.15 per 1K" },
      { min: 300001, max: null, price: 0.0001, label: "$0.10 per 1K" }
    ],
    features: [
      "PCGS population data",
      "NGC census reports",
      "CAC approval rates",
      "Grade distribution analytics",
      "Monthly updates"
    ],
    endpoints: [
      "/api/population/{gsId}",
      "/api/census/distribution",
      "/api/population/survival",
      "/api/population/cac-rates"
    ]
  },
  {
    id: "market-analytics",
    name: "Market Analytics Suite",
    icon: TrendingUp,
    description: "Professional trading metrics and market intelligence",
    freeRequests: 500,
    multiplier: 4,
    tiers: [
      { min: 0, max: 500, price: 0, label: "First 500 free" },
      { min: 501, max: 25000, price: 0.0004, label: "$0.40 per 1K" },
      { min: 25001, max: 100000, price: 0.00035, label: "$0.35 per 1K" },
      { min: 100001, max: null, price: 0.0003, label: "$0.30 per 1K" }
    ],
    features: [
      "Real-time market indices",
      "Category performance metrics",
      "Top movers & shakers",
      "Market depth analysis",
      "Custom alerts & webhooks"
    ],
    endpoints: [
      "/api/market/indices",
      "/api/market/depth",
      "/api/market/movers",
      "/api/market/volume"
    ]
  },
  {
    id: "historical-data",
    name: "Historical Data Archive",
    icon: History,
    description: "Complete historical pricing and market data",
    freeRequests: 1000,
    multiplier: 3.5,
    tiers: [
      { min: 0, max: 1000, price: 0, label: "First 1K free" },
      { min: 1001, max: 40000, price: 0.00035, label: "$0.35 per 1K" },
      { min: 40001, max: 150000, price: 0.0003, label: "$0.30 per 1K" },
      { min: 150001, max: null, price: 0.00025, label: "$0.25 per 1K" }
    ],
    features: [
      "10+ years of price history",
      "Auction archives",
      "Historical population changes",
      "Market cycle analysis",
      "Batch processing"
    ],
    endpoints: [
      "/api/history/prices",
      "/api/history/auctions",
      "/api/history/population",
      "/api/history/trends"
    ]
  },
  {
    id: "enterprise-feed",
    name: "Enterprise Data Feed",
    icon: Zap,
    description: "Real-time streaming data for institutional clients",
    freeRequests: 0,
    isEnterprise: true,
    features: [
      "WebSocket streaming",
      "Sub-second updates",
      "Dedicated infrastructure",
      "Custom data schemas",
      "24/7 dedicated support"
    ],
    endpoints: [
      "WebSocket connections",
      "FIX protocol",
      "Direct SQL access",
      "Custom REST endpoints"
    ]
  }
]

export function MapboxStylePricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")
  const [apiUsage, setApiUsage] = useState<Record<string, number>>({
    "base-data": 50000,
    "advanced-valuation": 10000,
    "population-census": 15000,
    "market-analytics": 5000,
    "historical-data": 8000,
    "enterprise-feed": 0
  })
  const [expandedProduct, setExpandedProduct] = useState<string | null>("base-data")

  const calculateProductCost = (productId: string) => {
    const product = apiProducts.find(p => p.id === productId)
    if (!product || product.isEnterprise) return null
    
    const usage = apiUsage[productId] || 0
    let cost = 0
    
    for (const tier of product.tiers || []) {
      const tierMin = tier.min
      const tierMax = tier.max || Infinity
      
      if (usage > tierMin) {
        const billableInTier = Math.min(usage, tierMax) - tierMin + 1
        cost += billableInTier * tier.price
      }
    }
    
    const monthlyCost = cost
    const finalCost = billingCycle === "annual" ? monthlyCost * 12 * 0.85 : monthlyCost
    
    return {
      monthly: monthlyCost,
      annual: monthlyCost * 12 * 0.85,
      final: finalCost,
      perRequest: usage > 0 ? finalCost / usage : 0
    }
  }

  const calculateTotalCost = () => {
    let total = 0
    for (const product of apiProducts) {
      if (!product.isEnterprise) {
        const cost = calculateProductCost(product.id)
        if (cost) {
          total += cost.final
        }
      }
    }
    return total
  }

  const formatRequests = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`
    return num.toString()
  }

  const getCurrentTier = (productId: string) => {
    const product = apiProducts.find(p => p.id === productId)
    const usage = apiUsage[productId] || 0
    
    if (!product || !product.tiers) return null
    
    for (const tier of product.tiers) {
      const tierMax = tier.max || Infinity
      if (usage <= tierMax) {
        return tier
      }
    }
    
    return product.tiers[product.tiers.length - 1]
  }

  return (
    <div className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-[#d4af37] text-[#1e3a5f] font-semibold">
            PAY-AS-YOU-GO PRICING
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
            Simple, Transparent API Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            No subscriptions. No commitments. Pay only for what you use with volume discounts that scale automatically.
          </p>
        </div>

        <div className="mb-8">
          <Card className="bg-gradient-to-r from-[#1e3a5f] to-[#2a4a73] text-white">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Total Monthly Estimate</h3>
                  <p className="text-blue-100">Based on your API usage below</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold">
                    ${calculateTotalCost().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="text-sm text-blue-100">
                    per {billingCycle === "annual" ? "month (billed annually)" : "month"}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex gap-2">
                <Button
                  onClick={() => setBillingCycle("monthly")}
                  className={billingCycle === "monthly" 
                    ? "bg-white text-[#1e3a5f] hover:bg-gray-100 font-semibold" 
                    : "bg-white/20 text-white border border-white/50 hover:bg-white hover:text-[#1e3a5f]"}
                >
                  Monthly Billing
                </Button>
                <Button
                  onClick={() => setBillingCycle("annual")}
                  className={billingCycle === "annual" 
                    ? "bg-white text-[#1e3a5f] hover:bg-gray-100 font-semibold" 
                    : "bg-white/20 text-white border border-white/50 hover:bg-white hover:text-[#1e3a5f]"}
                >
                  <span>Annual Billing</span>
                  <Badge className="ml-2 bg-green-500 text-white border-0 font-bold">
                    Save 15%
                  </Badge>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {apiProducts.map((product) => {
            const Icon = product.icon
            const cost = calculateProductCost(product.id)
            const currentTier = getCurrentTier(product.id)
            const isExpanded = expandedProduct === product.id
            const usage = apiUsage[product.id] || 0
            
            return (
              <Card 
                key={product.id}
                className={`transition-all ${isExpanded ? "shadow-lg border-[#1e3a5f]" : ""}`}
              >
                <CardHeader 
                  className="cursor-pointer"
                  onClick={() => setExpandedProduct(isExpanded ? null : product.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Icon className="h-6 w-6 text-[#1e3a5f]" />
                      </div>
                      <div>
                        <CardTitle className="text-xl mb-1">
                          {product.name}
                          {product.multiplier && (
                            <Badge variant="outline" className="ml-2 text-xs font-normal">
                              {product.multiplier}x credit multiplier
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription>{product.description}</CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      {product.isEnterprise ? (
                        <div>
                          <div className="text-2xl font-bold text-gray-900">Custom</div>
                          <Button size="sm" className="mt-2 bg-[#1e3a5f] hover:bg-[#2a4a73]">
                            Contact Sales
                          </Button>
                        </div>
                      ) : (
                        <>
                          <div className="text-2xl font-bold text-gray-900">
                            ${cost?.final.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            <span className="text-sm font-normal text-gray-600">
                              /{billingCycle === "annual" ? "mo" : "month"}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            {formatRequests(usage)} requests
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                {!product.isEnterprise && (
                  <CardContent className="pt-0 pb-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-sm font-medium text-gray-700">
                            Monthly Requests
                          </label>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="font-mono bg-white">
                              {formatRequests(usage)}
                            </Badge>
                            {currentTier && (
                              <Badge className="bg-blue-100 text-blue-800 border-0">
                                {currentTier.label}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Slider
                          value={[usage]}
                          onValueChange={([val]) => setApiUsage(prev => ({ ...prev, [product.id]: val }))}
                          min={0}
                          max={product.id === "base-data" ? 1000000 : 
                               product.id === "market-analytics" ? 100000 : 
                               500000}
                          step={product.id === "market-analytics" ? 100 : 1000}
                          className="mb-2"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>0</span>
                          <span>{formatRequests(product.freeRequests)}</span>
                          <span>
                            {product.id === "base-data" ? "500K" : 
                             product.id === "market-analytics" ? "50K" : 
                             "250K"}
                          </span>
                          <span>
                            {product.id === "base-data" ? "1M" : 
                             product.id === "market-analytics" ? "100K" : 
                             "500K"}
                          </span>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="pt-4 border-t space-y-4">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold mb-3 text-sm">Volume Pricing Tiers</h4>
                              <div className="space-y-2">
                                {product.tiers?.map((tier, idx) => (
                                  <div 
                                    key={idx} 
                                    className={`flex justify-between items-center p-2 rounded text-sm ${
                                      usage >= tier.min && (tier.max === null || usage <= tier.max)
                                        ? "bg-blue-50 border border-blue-200"
                                        : "bg-gray-50"
                                    }`}
                                  >
                                    <span>
                                      {formatRequests(tier.min)} - {tier.max ? formatRequests(tier.max) : "∞"}
                                    </span>
                                    <span className="font-mono font-medium">
                                      {tier.label}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold mb-3 text-sm">Features Included</h4>
                              <ul className="space-y-1">
                                {product.features.map((feature, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-gray-700">{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-3 text-sm">Available Endpoints</h4>
                            <div className="flex flex-wrap gap-2">
                              {product.endpoints.map((endpoint, idx) => (
                                <code key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                                  {endpoint}
                                </code>
                              ))}
                            </div>
                          </div>

                          {cost && (
                            <div className="bg-gray-50 rounded-lg p-4">
                              <div className="grid grid-cols-3 gap-4 text-sm">
                                <div>
                                  <div className="text-gray-500 mb-1">Per request</div>
                                  <div className="font-mono font-semibold">
                                    ${cost.perRequest.toFixed(6)}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-gray-500 mb-1">Monthly cost</div>
                                  <div className="font-mono font-semibold">
                                    ${cost.monthly.toFixed(2)}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-gray-500 mb-1">Annual cost</div>
                                  <div className="font-mono font-semibold text-green-600">
                                    ${(cost.annual * 12).toFixed(2)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                )}
              </Card>
            )
          })}
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">How Pricing Works</h4>
                  <ul className="space-y-1 text-sm text-blue-800">
                    <li>• Each API has its own free tier to get started</li>
                    <li>• Volume discounts apply automatically as usage grows</li>
                    <li>• No minimum commitments or setup fees</li>
                    <li>• Annual billing provides 15% discount on all usage</li>
                    <li>• Credits are consumed based on API complexity</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-start">
                <DollarSign className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-green-900 mb-2">Cost Optimization Tips</h4>
                  <ul className="space-y-1 text-sm text-green-800">
                    <li>• Use batch endpoints to reduce request count</li>
                    <li>• Cache frequently accessed data</li>
                    <li>• Start with Base Data API for most use cases</li>
                    <li>• Monitor usage with our analytics dashboard</li>
                    <li>• Set up usage alerts to avoid surprises</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 bg-gradient-to-r from-[#1e3a5f] to-[#2a4a73] rounded-2xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <Shield className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Enterprise-Grade Infrastructure</h3>
            <p className="mb-6 text-blue-100">
              All APIs include SSL encryption, 99.9% uptime SLA, comprehensive documentation,
              and access to our developer community. Scale confidently with automatic rate limiting
              and DDoS protection.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge className="bg-white/20 text-white border-white/30 px-3 py-1">
                99.9% Uptime SLA
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 px-3 py-1">
                SSL Encryption
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 px-3 py-1">
                Rate Limiting
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 px-3 py-1">
                DDoS Protection
              </Badge>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Ready to get started? Create your free account and get instant API access.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" size="lg">
              View Documentation
            </Button>
            <Button size="lg" className="bg-[#1e3a5f] hover:bg-[#2a4a73]">
              Start Free Trial
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}