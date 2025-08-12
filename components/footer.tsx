import Link from "next/link"
import { Coins, Twitter, Github, Linkedin, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#1e3a5f] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Coins className="h-6 w-6 text-[#d4af37]" />
              <span className="text-lg font-bold">Greysheet API</span>
            </div>
            <p className="text-sm text-gray-300">
              The industry standard for rare coin pricing and valuation data. Trusted by dealers, 
              collectors, and platforms worldwide since 1963.
            </p>
            <div className="flex space-x-3 mt-4">
              <a href="#" className="text-gray-400 hover:text-[#d4af37]">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#d4af37]">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#d4af37]">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#d4af37]">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-[#d4af37]">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white">
                  Pricing API
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white">
                  Catalog API
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white">
                  Market Analytics
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white">
                  Enterprise Solutions
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white">
                  Mobile SDKs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-[#d4af37]">Developers</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white">
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white">
                  SDKs & Libraries
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white">
                  API Playground
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white">
                  Status Page
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-[#d4af37]">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white">
                  Partners
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © 2024 Greysheet API. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-sm text-gray-400 hover:text-white">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-white">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-white">
                SLA
              </Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-white">
                Security
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}