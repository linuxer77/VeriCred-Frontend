"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Building2, Shield } from "lucide-react"

interface University {
  id: string
  name: string
  logo: string
  walletAddress: string
  verified: boolean
}

interface UniversitySelectorProps {
  onUniversitySelect: (university: University) => void
  selectedUniversity: University | null
}

export default function UniversitySelector({ onUniversitySelect, selectedUniversity }: UniversitySelectorProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [walletAddress, setWalletAddress] = useState("")
  const [universities, setUniversities] = useState<University[]>([])
  const [filteredUniversities, setFilteredUniversities] = useState<University[]>([])
  const [loading, setLoading] = useState(false)

  // Mock universities data
  useEffect(() => {
    const mockUniversities: University[] = [
      {
        id: "mit",
        name: "Massachusetts Institute of Technology",
        logo: "/placeholder.svg?height=40&width=40",
        walletAddress: "0x1234567890123456789012345678901234567890",
        verified: true,
      },
      {
        id: "stanford",
        name: "Stanford University",
        logo: "/placeholder.svg?height=40&width=40",
        walletAddress: "0x2345678901234567890123456789012345678901",
        verified: true,
      },
      {
        id: "harvard",
        name: "Harvard University",
        logo: "/placeholder.svg?height=40&width=40",
        walletAddress: "0x3456789012345678901234567890123456789012",
        verified: true,
      },
      {
        id: "berkeley",
        name: "University of California, Berkeley",
        logo: "/placeholder.svg?height=40&width=40",
        walletAddress: "0x4567890123456789012345678901234567890123",
        verified: true,
      },
    ]

    setUniversities(mockUniversities)
    setFilteredUniversities(mockUniversities)
  }, [])

  // Filter universities based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUniversities(universities)
    } else {
      const filtered = universities.filter((uni) => uni.name.toLowerCase().includes(searchTerm.toLowerCase()))
      setFilteredUniversities(filtered)
    }
  }, [searchTerm, universities])

  const handleWalletAddressSubmit = async () => {
    if (!walletAddress.trim()) return

    setLoading(true)

    // Mock API call to validate wallet address
    setTimeout(() => {
      const foundUniversity = universities.find(
        (uni) => uni.walletAddress.toLowerCase() === walletAddress.toLowerCase(),
      )

      if (foundUniversity) {
        onUniversitySelect(foundUniversity)
      } else {
        alert("University not found or not verified in our registry")
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Building2 className="h-5 w-5" />
          University Selection
        </CardTitle>
        <CardDescription className="text-gray-400">
          Find your university to view available credentials and request NFT minting
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search Universities */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search universities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-gray-600"
            />
          </div>

          {/* University List */}
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {filteredUniversities.map((university) => (
              <div
                key={university.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors hover:bg-gray-800 ${
                  selectedUniversity?.id === university.id ? "border-white bg-gray-800" : "border-gray-700"
                }`}
                onClick={() => onUniversitySelect(university)}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={university.logo || "/placeholder.svg"}
                    alt={`${university.name} logo`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-sm text-white">{university.name}</h4>
                      {university.verified && <Shield className="h-4 w-4 text-green-400" />}
                    </div>
                    <p className="text-xs text-gray-500 font-mono">
                      {university.walletAddress.slice(0, 10)}...{university.walletAddress.slice(-8)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredUniversities.length === 0 && searchTerm && (
            <p className="text-center text-gray-500 py-4">No universities found matching "{searchTerm}"</p>
          )}
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-900 text-gray-500">or</span>
          </div>
        </div>

        {/* Wallet Address Input */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-300">Enter University's Official Wallet Address</label>
          <div className="flex gap-2">
            <Input
              placeholder="0x..."
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="font-mono text-sm bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-gray-600"
            />
            <Button
              onClick={handleWalletAddressSubmit}
              disabled={!walletAddress.trim() || loading}
              className="bg-white text-black hover:bg-gray-100"
            >
              {loading ? "Validating..." : "Go to Portal"}
            </Button>
          </div>
          <p className="text-xs text-gray-500">
            Paste the official wallet address of your university to access their credential portal
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
