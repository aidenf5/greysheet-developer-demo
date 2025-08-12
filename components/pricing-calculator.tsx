"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Slider } from "./ui/slider"
import { Badge } from "./ui/badge"
import { Calculator, Info, ChevronDown, ChevronUp } from "lucide-react"

interface UsageTier {
  min: number
  max: number | null
  pricePerRequest: number
  label: string
}

const usageTiers: UsageTier[] = [
  { min: 0, max: 5000, pricePerRequest: 0, label: "First 5K free" },
  { min: 5001, max: 50000, pricePerRequest: 0.0001, label: "$0.10 per 1K" },
  { min: 50001, max: 250000, pricePerRequest: 0.00008, label: "$0.08 per 1K" },
  { min: 250001, max: 1000000, pricePerRequest: 0.00006, label: "$0.06 per 1K" },
  { min: 1000001, max: null, pricePerRequest: 0.00004, label: "$0.04 per 1K" }
]

const modelMultipliers = {
  "base": 1,
  "valuation": 3,
  "population": 2,
  "analytics": 4,
  "historical": 3.5,
  "enterprise": 5
}

export function PricingCalculator() {
  const [requests, setRequests] = useState([100000])
  const [modelMix, setModelMix] = useState({
    base: 50,
    valuation: 20,
    population: 10,
    analytics: 10,
    historical: 10,
    enterprise: 0
  })
  const [showDetails, setShowDetails] = useState(false)
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly")

  const calculateCost = useMemo(() => {
    const totalRequests = requests[0]
    let totalCost = 0
    const tierBreakdown = []

    for (const tier of usageTiers) {
      const tierMin = tier.min
      const tierMax = tier.max || Infinity
      
      if (totalRequests > tierMin) {
        const requestsInTier = Math.min(totalRequests - tierMin + 1, tierMax - tierMin + 1)
        const tierCost = requestsInTier * tier.pricePerRequest
        
        if (requestsInTier > 0) {
          tierBreakdown.push({
            ...tier,
            requests: requestsInTier,
            cost: tierCost
          })
        }
        
        totalCost += tierCost
      }
    }

    let weightedMultiplier = 0
    let totalPercentage = 0
    
    for (const [model, percentage] of Object.entries(modelMix)) {
      if (percentage > 0) {
        weightedMultiplier += (percentage / 100) * modelMultipliers[model as keyof typeof modelMultipliers]
        totalPercentage += percentage
      }
    }

    if (totalPercentage !== 100) {
      const scale = 100 / totalPercentage
      weightedMultiplier *= scale
    }

    const adjustedCost = totalCost * weightedMultiplier

    const monthlyCost = adjustedCost
    const annualCost = monthlyCost * 12 * 0.85
    const finalCost = billingPeriod === "annual" ? annualCost : monthlyCost

    return {
      baseCost: totalCost,
      weightedMultiplier,
      adjustedCost,
      monthlyCost,
      annualCost,
      finalCost,
      tierBreakdown,
      effectivePerRequest: finalCost / totalRequests
    }
  }, [requests, modelMix, billingPeriod])

  const updateModelPercentage = (model: string, value: number) => {
    const newMix = { ...modelMix, [model]: value }
    
    const total = Object.values(newMix).reduce((sum, val) => sum + val, 0)
    
    if (total <= 100) {
      setModelMix(newMix)
    } else {
      const scale = 100 / total
      const scaledMix = Object.fromEntries(
        Object.entries(newMix).map(([key, val]) => [key, Math.round(val * scale)])
      )
      setModelMix(scaledMix as typeof modelMix)
    }
  }

  const formatRequests = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`
    return num.toString()
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 border-[#1e3a5f]">
        <CardHeader className="bg-gradient-to-r from-[#1e3a5f] to-[#2a4a73] text-white">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Calculator className="h-6 w-6" />
                Pricing Calculator
              </CardTitle>
              <CardDescription className="text-blue-100">
                Estimate your costs based on usage and API mix
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">
                ${calculateCost.finalCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}
              </div>
              <div className="text-sm text-blue-100">
                per {billingPeriod === "annual" ? "year" : "month"}
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-gray-700">
                Monthly API Requests
              </label>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="font-mono">
                  {formatRequests(requests[0])}
                </Badge>
                <span className="text-xs text-gray-500">
                  (${calculateCost.effectivePerRequest.toFixed(5)}/request)
                </span>
              </div>
            </div>
            <Slider
              value={requests}
              onValueChange={setRequests}
              min={0}
              max={5000000}
              step={5000}
              className="mb-3"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0</span>
              <span>1M</span>
              <span>2M</span>
              <span>3M</span>
              <span>4M</span>
              <span>5M</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-gray-700">
                Billing Period
              </label>
              <Badge className="bg-green-100 text-green-800">
                {billingPeriod === "annual" ? "Save 15%" : "Standard pricing"}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={billingPeriod === "monthly" ? "default" : "outline"}
                onClick={() => setBillingPeriod("monthly")}
                className={billingPeriod === "monthly" ? "bg-[#1e3a5f]" : ""}
              >
                Monthly
              </Button>
              <Button
                variant={billingPeriod === "annual" ? "default" : "outline"}
                onClick={() => setBillingPeriod("annual")}
                className={billingPeriod === "annual" ? "bg-[#1e3a5f]" : ""}
              >
                Annual (15% off)
              </Button>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-gray-700">
                API Model Mix
              </label>
              <Badge variant="outline">
                {calculateCost.weightedMultiplier.toFixed(2)}x multiplier
              </Badge>
            </div>
            
            <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
              {Object.entries(modelMix).map(([model, percentage]) => (
                <div key={model}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm capitalize font-medium">
                      {model === "base" ? "Base Data API" : 
                       model === "valuation" ? "Advanced Valuation" :
                       model === "population" ? "Population Census" :
                       model === "analytics" ? "Market Analytics" :
                       model === "historical" ? "Historical Data" :
                       "Enterprise Feed"}
                    </span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {modelMultipliers[model as keyof typeof modelMultipliers]}x
                      </Badge>
                      <span className="text-sm font-mono w-12 text-right">
                        {percentage}%
                      </span>
                    </div>
                  </div>
                  <Slider
                    value={[percentage]}
                    onValueChange={([val]) => updateModelPercentage(model, val)}
                    min={0}
                    max={100}
                    step={5}
                    className="h-2"
                  />
                </div>
              ))}
              
              <div className="pt-3 border-t mt-3">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">Total Usage</span>
                  <span className={`font-mono ${
                    Object.values(modelMix).reduce((a, b) => a + b, 0) === 100 
                      ? "text-green-600" 
                      : "text-amber-600"
                  }`}>
                    {Object.values(modelMix).reduce((a, b) => a + b, 0)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? (
              <>
                <ChevronUp className="h-4 w-4 mr-2" />
                Hide Pricing Breakdown
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-2" />
                Show Pricing Breakdown
              </>
            )}
          </Button>

          {showDetails && (
            <div className="space-y-4 pt-4 border-t">
              <div>
                <h4 className="text-sm font-semibold mb-3">Volume Tier Breakdown</h4>
                <div className="space-y-2">
                  {calculateCost.tierBreakdown.map((tier, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <div className="flex-1">
                        <span className="text-sm font-medium">{tier.label}</span>
                        <span className="text-xs text-gray-500 ml-2">
                          ({formatRequests(tier.requests)} requests)
                        </span>
                      </div>
                      <span className="font-mono text-sm">
                        ${tier.cost.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Base Cost</div>
                  <div className="font-mono font-semibold">
                    ${calculateCost.baseCost.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Model Multiplier</div>
                  <div className="font-mono font-semibold">
                    {calculateCost.weightedMultiplier.toFixed(2)}x
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Monthly Total</div>
                  <div className="font-mono font-semibold">
                    ${calculateCost.monthlyCost.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Annual Total</div>
                  <div className="font-mono font-semibold text-green-600">
                    ${calculateCost.annualCost.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start">
            <Info className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">How pricing works:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>First 5,000 requests are always free</li>
                <li>Volume discounts apply automatically as usage increases</li>
                <li>Different API models consume credits at different rates</li>
                <li>Annual billing provides 15% discount on all usage</li>
                <li>Enterprise customers can negotiate custom rates</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}