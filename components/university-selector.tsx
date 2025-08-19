"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Building2, Shield, RefreshCw, Copy } from "lucide-react"

interface University {
  id: number
  metamask_address: string
  acad_email: string
  org_name: string
  org_type: string
  org_url: string
  org_desc: string
  country: string
  state: string
  city: string
  address: string
  postal_code: string
  is_verified: boolean
  total_students: number
  created_at: string
  updated_at: string
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
  const [refreshing, setRefreshing] = useState(false)

  // Fetch universities from API
  const fetchUniversities = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true)
    } else {
      setLoading(true)
    }
    
    try {
      // Get token from localStorage
      const storedWallet = localStorage.getItem("vericred_wallet")
      if (!storedWallet) {
        console.error("No wallet session found")
        return
      }

      const walletData = JSON.parse(storedWallet)
      const token = walletData.token

      if (!token) {
        console.error("No authentication token found")
        return
      }

      const response = await fetch("http://localhost:8080/universities", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      console.log("response: " + response)
      if (!response.ok) {
        throw new Error(`Failed to fetch universities: ${response.status}`)
      }

      const data = await response.json()
      // For debugging: print the data in a readable format      
      // Backend returns array directly, not wrapped in object
      if (Array.isArray(data)) {
        setUniversities(data)
        setFilteredUniversities(data)
      } else if (data.universities && Array.isArray(data.universities)) {
        // Fallback for wrapped format
        setUniversities(data.universities)
        setFilteredUniversities(data.universities)
      } else {
        console.error("Invalid universities data format:", data)
        setUniversities([])
        setFilteredUniversities([])
      }
    } catch (error) {
      console.error("Error fetching universities:", error)
      // Fallback to empty array if API fails
      setUniversities([])
      setFilteredUniversities([])
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchUniversities()
  }, [])

  // Filter universities based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUniversities(universities)
    } else {
      const filtered = universities.filter((uni) => uni.org_name.toLowerCase().includes(searchTerm.toLowerCase()))
      setFilteredUniversities(filtered)
    }
  }, [searchTerm, universities])

  const handleWalletAddressSubmit = async () => {
    if (!walletAddress.trim()) return

    setLoading(true)

    try {
      // Find university by wallet address in the fetched list
      const foundUniversity = universities.find(
        (uni) => uni.metamask_address.toLowerCase() === walletAddress.toLowerCase(),
      )

      if (foundUniversity) {
        onUniversitySelect(foundUniversity)
      } else {
        alert("University not found or not verified in our registry")
      }
    } catch (error) {
      console.error("Error validating wallet address:", error)
      alert("Error validating wallet address")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          University Selection
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => fetchUniversities(true)}
            disabled={refreshing}
            className="text-gray-400 hover:text-white"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          </Button>
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
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                <p className="text-gray-400 text-sm">Loading universities...</p>
              </div>
            ) : filteredUniversities.length > 0 ? (
              filteredUniversities.map((university) => (
              <div
                  key={university.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-800 ${
                    selectedUniversity?.id === university.id ? "border-purple-500 bg-gray-800" : "border-gray-700"
                }`}
                onClick={() => onUniversitySelect(university)}
              >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm text-white truncate">{university.org_name}</h4>
                        {university.is_verified && <Shield className="h-4 w-4 text-green-400 flex-shrink-0" />}
                      </div>
                      {university.org_desc && (
                        <p className="text-xs text-gray-400 mb-1 line-clamp-2">{university.org_desc}</p>
                      )}
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                          <span className="font-mono">
                            {university.metamask_address.slice(0, 8)}...{university.metamask_address.slice(-6)}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              navigator.clipboard.writeText(university.metamask_address)
                            }}
                            className="text-purple-400 hover:text-purple-300 transition-colors"
                            title="Copy address"
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                        </div>
                        {university.org_url && (
                          <a 
                            href={university.org_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-purple-400 hover:text-purple-300 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Website
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400 text-sm">No universities available</p>
              </div>
            )}
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
