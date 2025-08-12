import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { 
  Book, 
  Code2, 
  FileCode, 
  GitBranch, 
  Laptop, 
  MessageCircle,
  Rocket,
  Shield,
  Terminal,
  Users,
  Video,
  Zap
} from "lucide-react"

const resources = [
  {
    title: "Quick Start Guide",
    description: "Get up and running in under 5 minutes",
    icon: Rocket,
    link: "#",
    category: "Getting Started",
  },
  {
    title: "API Reference",
    description: "Complete API documentation with examples",
    icon: Book,
    link: "#",
    category: "Documentation",
  },
  {
    title: "SDKs & Libraries",
    description: "Official SDKs for popular languages",
    icon: Code2,
    link: "#",
    category: "Tools",
  },
  {
    title: "Code Examples",
    description: "Sample implementations and recipes",
    icon: FileCode,
    link: "#",
    category: "Examples",
  },
  {
    title: "Postman Collection",
    description: "Pre-built API requests for testing",
    icon: Terminal,
    link: "#",
    category: "Tools",
  },
  {
    title: "Video Tutorials",
    description: "Step-by-step video walkthroughs",
    icon: Video,
    link: "#",
    category: "Learning",
  },
]

const sdks = [
  { name: "Node.js", version: "v3.2.1", downloads: "125K/month" },
  { name: "Python", version: "v3.1.0", downloads: "98K/month" },
  { name: "Java", version: "v2.5.3", downloads: "67K/month" },
  { name: "Ruby", version: "v2.1.0", downloads: "45K/month" },
  { name: ".NET", version: "v3.0.2", downloads: "52K/month" },
  { name: "Go", version: "v1.4.0", downloads: "38K/month" },
]

export function DeveloperResources() {
  return (
    <section id="resources" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Developer Resources
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to integrate our API successfully
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {resources.map((resource, idx) => {
            const Icon = resource.icon
            return (
              <Card key={idx} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Icon className="h-8 w-8 text-[#1e3a5f]" />
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {resource.category}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Official SDKs</CardTitle>
              <CardDescription>
                Native libraries for seamless integration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sdks.map((sdk, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Code2 className="h-5 w-5 text-[#1e3a5f]" />
                      <div>
                        <p className="font-medium">{sdk.name}</p>
                        <p className="text-sm text-gray-600">{sdk.version}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{sdk.downloads}</p>
                      <Button size="sm" variant="outline" className="mt-1">
                        Install
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Developer Community</CardTitle>
              <CardDescription>
                Join thousands of developers building with our API
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-[#1e3a5f]" />
                  <div>
                    <p className="font-medium">Discord Community</p>
                    <p className="text-sm text-gray-600">5,000+ active members</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Join</Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <GitBranch className="h-6 w-6 text-[#1e3a5f]" />
                  <div>
                    <p className="font-medium">GitHub Discussions</p>
                    <p className="text-sm text-gray-600">Open source contributions</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Explore</Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-6 w-6 text-[#1e3a5f]" />
                  <div>
                    <p className="font-medium">Stack Overflow</p>
                    <p className="text-sm text-gray-600">#greysheet-api tag</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Browse</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 bg-gradient-to-r from-[#1e3a5f] to-[#2a4a73] text-white">
          <CardContent className="p-8">
            <div className="grid gap-8 lg:grid-cols-2 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-3">Interactive API Playground</h3>
                <p className="text-gray-200 mb-4">
                  Test API endpoints directly in your browser. No authentication required for sandbox mode.
                </p>
                <div className="flex gap-3">
                  <Button size="lg" className="bg-[#d4af37] text-[#1e3a5f] hover:bg-[#b8941f]">
                    Open Playground
                  </Button>
                  <Button size="lg" variant="outline" className="border-white bg-white/10 text-white hover:bg-white hover:text-[#1e3a5f]">
                    View Examples
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
                  <Laptop className="h-8 w-8 mb-2" />
                  <p className="font-semibold">Live Testing</p>
                  <p className="text-sm text-gray-300">Real API responses</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
                  <Zap className="h-8 w-8 mb-2" />
                  <p className="font-semibold">No Setup</p>
                  <p className="text-sm text-gray-300">Start immediately</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
                  <Shield className="h-8 w-8 mb-2" />
                  <p className="font-semibold">Sandbox Mode</p>
                  <p className="text-sm text-gray-300">Safe environment</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
                  <FileCode className="h-8 w-8 mb-2" />
                  <p className="font-semibold">Code Export</p>
                  <p className="text-sm text-gray-300">Copy to clipboard</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}