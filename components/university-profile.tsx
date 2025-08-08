"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Globe, Wallet, Edit } from "lucide-react"

interface University {
  id: string
  name: string
  logo: string
  banner: string
  description: string
  website: string
  walletAddress: string
  verified: boolean
  adminName: string
  adminRole: string
}

interface UniversityProfileProps {
  university: University
}

export default function UniversityProfile({ university }: UniversityProfileProps) {
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <Card className="bg-gray-900 border-gray-800 overflow-hidden">
      {/* Banner */}
      <div className="relative h-48 bg-gradient-to-r from-gray-800 to-gray-700">
        <img
          src={university.banner || "/placeholder.svg"}
          alt="University banner"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute top-4 right-4">
          <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-black/50">
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Profile Content */}
      <CardContent className="relative -mt-16 pb-6">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src={university.logo || "/placeholder.svg"}
              alt={`${university.name} logo`}
              className="w-32 h-32 rounded-lg border-4 border-gray-900 bg-gray-800 object-cover"
            />
          </div>

          {/* University Info */}
          <div className="flex-1 space-y-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-white">{university.name}</h1>
                {university.verified && (
                  <Badge className="bg-green-900/30 text-green-300 border-green-800">
                    <Shield className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              <p className="text-gray-400 leading-relaxed">{university.description}</p>
            </div>

            {/* University Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-gray-500" />
                <a
                  href={university.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  {university.website}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4 text-gray-500" />
                <span className="text-gray-300 text-sm font-mono">{formatAddress(university.walletAddress)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
