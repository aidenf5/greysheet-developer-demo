"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Coins, TrendingUp, Globe, Calculator, Info } from "lucide-react"

const apiModels = {
  catalog: {
    name: "Catalog Navigation",
    icon: Globe,
    description: "Hierarchical catalog structure with nodes and collectibles",
    endpoints: [
      { method: "GET", path: "/api/nodes", description: "Get catalog nodes hierarchy" },
      { method: "GET", path: "/api/nodes/{nodeId}", description: "Get specific node details" },
      { method: "GET", path: "/api/nodes/{nodeId}/children", description: "Get child nodes" },
      { method: "GET", path: "/api/nodes/{nodeId}/collectibles", description: "Get collectibles in node" },
    ],
    sampleResponse: `{
  "nodeId": "us-coins-morgan-dollars",
  "name": "Morgan Dollars",
  "parentId": "us-coins-dollars",
  "hasChildren": false,
  "hasCollectibles": true,
  "collectiblesCount": 96,
  "path": "US Coins > Dollars > Morgan Dollars",
  "metadata": {
    "yearRange": "1878-1921",
    "mintMarks": ["", "CC", "D", "O", "S"],
    "designer": "George T. Morgan"
  }
}`,
  },
  pricing: {
    name: "Pricing Data",
    icon: Coins,
    description: "Comprehensive pricing from CPG, Grey Sheet, PCGS, and NGC",
    endpoints: [
      { method: "GET", path: "/api/pricing/{gsId}", description: "Get pricing by GS ID" },
      { method: "POST", path: "/api/pricing/bulk", description: "Bulk pricing lookup" },
      { method: "GET", path: "/api/pricing/cac/{gsId}", description: "CAC premium pricing" },
      { method: "GET", path: "/api/pricing/updates", description: "Recent price updates" },
    ],
    sampleResponse: `{
  "gsId": "GS-1921-S-MS65",
  "name": "1921-S Morgan Dollar",
  "sortingPosition": 85,
  "isType": false,
  "isSet": false,
  "pricingData": [
    {
      "grade": "MS65",
      "gradeLabel": "Gem Uncirculated",
      "cacStatus": false,
      "cpgPrice": 425,
      "greySheetBid": 385,
      "greySheetAsk": 435,
      "pcgsPrice": 450,
      "ngcPrice": 440,
      "lastUpdated": "2024-01-15T10:30:00Z"
    },
    {
      "grade": "MS65",
      "gradeLabel": "Gem Uncirculated",
      "cacStatus": true,
      "cpgPrice": 525,
      "greySheetBid": 485,
      "greySheetAsk": 535,
      "pcgsPrice": 550,
      "ngcPrice": 540,
      "lastUpdated": "2024-01-15T10:30:00Z"
    }
  ]
}`,
  },
  collectibles: {
    name: "Collectibles Data",
    icon: TrendingUp,
    description: "Detailed information about individual coins and collectibles",
    endpoints: [
      { method: "GET", path: "/api/collectibles/{gsId}", description: "Get collectible details" },
      { method: "GET", path: "/api/collectibles/search", description: "Search collectibles" },
      { method: "GET", path: "/api/collectibles/{gsId}/grades", description: "Available grades" },
      { method: "GET", path: "/api/collectibles/{gsId}/history", description: "Price history" },
    ],
    sampleResponse: `{
  "gsId": "GS-1916-D-DIME",
  "name": "1916-D Mercury Dime",
  "nodeId": "us-coins-dimes-mercury",
  "series": "Mercury Dimes",
  "year": 1916,
  "mintMark": "D",
  "mintage": 264000,
  "keyDate": true,
  "availableGrades": [
    "AG3", "G4", "G6", "VG8", "VG10", 
    "F12", "F15", "VF20", "VF25", "VF30", 
    "VF35", "XF40", "XF45", "AU50", "AU53", 
    "AU55", "AU58", "MS60", "MS61", "MS62", 
    "MS63", "MS64", "MS65", "MS66", "MS67"
  ],
  "designer": "Adolph A. Weinman",
  "composition": "90% Silver, 10% Copper",
  "weight": "2.5 grams",
  "diameter": "17.9 mm"
}`,
  },
  market: {
    name: "Market Analytics",
    icon: Calculator,
    description: "Market trends, indices, and advanced analytics",
    endpoints: [
      { method: "GET", path: "/api/market/indices", description: "Market performance indices" },
      { method: "GET", path: "/api/market/trends/{category}", description: "Category trends" },
      { method: "GET", path: "/api/market/movers", description: "Top gainers and losers" },
      { method: "GET", path: "/api/market/liquidity", description: "Market liquidity metrics" },
    ],
    sampleResponse: `{
  "indexName": "CPG Rare Coin Index",
  "indexValue": 156.42,
  "change24h": 1.23,
  "change7d": 3.45,
  "change30d": -2.11,
  "change1y": 12.34,
  "categories": {
    "keyDates": { 
      "value": 189.23, 
      "change": 4.56,
      "topMover": "1916-D Mercury Dime"
    },
    "morganDollars": { 
      "value": 142.78, 
      "change": 2.34,
      "topMover": "1893-S Morgan Dollar"
    },
    "goldCoins": { 
      "value": 201.45, 
      "change": 5.67,
      "topMover": "1907 High Relief Double Eagle"
    }
  },
  "marketCap": 4567890000,
  "volume24h": 12345678,
  "timestamp": "2024-01-15T10:30:00Z"
}`,
  },
}

export function ApiModelsSection() {
  const [activeModel, setActiveModel] = useState("pricing")
  const [showCode, setShowCode] = useState(true)

  return (
    <section id="models" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Powerful API Models
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Access comprehensive coin data through our specialized API models, each optimized for specific use cases.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {Object.entries(apiModels).map(([key, model]) => {
            const Icon = model.icon
            return (
              <Card 
                key={key}
                className={`cursor-pointer transition-all ${
                  activeModel === key 
                    ? "border-[#1e3a5f] shadow-lg" 
                    : "hover:shadow-md"
                }`}
                onClick={() => setActiveModel(key)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Icon className="h-8 w-8 text-[#1e3a5f]" />
                    {activeModel === key && (
                      <Badge className="bg-[#d4af37] text-[#1e3a5f]">Active</Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{model.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{model.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Card className="overflow-hidden">
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex items-center justify-between">
              <CardTitle>
                {apiModels[activeModel as keyof typeof apiModels].name} Details
              </CardTitle>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowCode(false)}
                  className={`px-3 py-1 text-sm rounded ${
                    !showCode 
                      ? "bg-[#1e3a5f] text-white" 
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  Endpoints
                </button>
                <button
                  onClick={() => setShowCode(true)}
                  className={`px-3 py-1 text-sm rounded ${
                    showCode 
                      ? "bg-[#1e3a5f] text-white" 
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  Sample Response
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {!showCode ? (
              <div className="p-6">
                <h4 className="font-semibold mb-4">Available Endpoints</h4>
                <div className="space-y-3">
                  {apiModels[activeModel as keyof typeof apiModels].endpoints.map((endpoint, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <Badge 
                        className={`${
                          endpoint.method === "GET" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {endpoint.method}
                      </Badge>
                      <div className="flex-1">
                        <code className="text-sm font-mono text-[#1e3a5f]">{endpoint.path}</code>
                        <p className="text-sm text-gray-600 mt-1">{endpoint.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="relative">
                <div className="absolute top-3 right-3 z-10">
                  <Badge variant="outline" className="bg-white">JSON</Badge>
                </div>
                <pre className="p-6 bg-gray-950 text-gray-100 overflow-x-auto">
                  <code className="text-sm">
                    {apiModels[activeModel as keyof typeof apiModels].sampleResponse}
                  </code>
                </pre>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start">
            <Info className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">Rate Limits by Model</h4>
              <p className="text-sm text-blue-800">
                Each API model has specific rate limits based on your subscription tier. 
                Basic tier: 1 credit per call, Standard tier: 3 credits per call, Advanced tier: 5 credits per call.
                Enterprise customers can negotiate custom credit allocations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}