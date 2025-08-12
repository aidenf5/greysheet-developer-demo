"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import { Coins, Menu, X } from "lucide-react"
import { useState } from "react"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Coins className="h-8 w-8 text-[#1e3a5f]" />
              <span className="text-xl font-bold text-[#1e3a5f]">Greysheet API</span>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link href="/pricing" className="text-sm font-medium text-gray-700 hover:text-[#1e3a5f]">
              Pricing
            </Link>
            <Link href="/#models" className="text-sm font-medium text-gray-700 hover:text-[#1e3a5f]">
              API Models
            </Link>
            <Link href="/#docs" className="text-sm font-medium text-gray-700 hover:text-[#1e3a5f]">
              Documentation
            </Link>
            <Link href="/#resources" className="text-sm font-medium text-gray-700 hover:text-[#1e3a5f]">
              Resources
            </Link>
            <Link href="/#enterprise" className="text-sm font-medium text-gray-700 hover:text-[#1e3a5f]">
              Enterprise
            </Link>
            <Button variant="outline" size="sm" className="ml-2">
              Sign In
            </Button>
            <Button size="sm" className="bg-[#1e3a5f] hover:bg-[#2a4a73]">
              Get Started
            </Button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-[#1e3a5f]"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-2 pb-4 pt-2">
              <Link href="/pricing" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#1e3a5f]">
                Pricing
              </Link>
              <Link href="/#models" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#1e3a5f]">
                API Models
              </Link>
              <Link href="/#docs" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#1e3a5f]">
                Documentation
              </Link>
              <Link href="/#resources" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#1e3a5f]">
                Resources
              </Link>
              <Link href="/#enterprise" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#1e3a5f]">
                Enterprise
              </Link>
              <div className="flex space-x-2 px-3 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Sign In
                </Button>
                <Button size="sm" className="flex-1 bg-[#1e3a5f] hover:bg-[#2a4a73]">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}