"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Building2, Wallet, Shield, Save, Upload } from "lucide-react"

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

interface UniversitySettingsProps {
  university: University
  setUniversity: (university: University) => void
}

export default function UniversitySettings({ university, setUniversity }: UniversitySettingsProps) {
  const [formData, setFormData] = useState(university)
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    setLoading(true)
    // Mock API call
    setTimeout(() => {
      setUniversity(formData)
      setLoading(false)
    }, 1000)
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">University Settings</h2>
        <p className="text-gray-400">Manage your university profile and platform settings</p>
      </div>

      {/* Profile Settings */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Building2 className="h-5 w-5" />
            Profile Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">University Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Website URL</label>
              <Input
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-gray-800 border-gray-700 text-white"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">University Logo</label>
              <div className="flex items-center gap-4">
                <img
                  src={formData.logo || "/placeholder.svg"}
                  alt="Logo"
                  className="w-16 h-16 rounded-lg bg-gray-800 object-cover"
                />
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload New Logo
                </Button>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Banner Image</label>
              <div className="flex items-center gap-4">
                <img
                  src={formData.banner || "/placeholder.svg"}
                  alt="Banner"
                  className="w-16 h-10 rounded bg-gray-800 object-cover"
                />
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload New Banner
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={loading} className="bg-white text-black hover:bg-gray-100">
              <Save className="h-4 w-4 mr-2" />
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Wallet Management */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Wallet className="h-5 w-5" />
            Wallet Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <div>
              <p className="font-medium text-white">Official Minting Wallet</p>
              <p className="text-sm text-gray-400 font-mono">{university.walletAddress}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-900/30 text-green-300 border-green-800">
                <Shield className="h-3 w-3 mr-1" />
                Verified
              </Badge>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
              >
                Update
              </Button>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            This wallet address is used for minting NFT credentials. Changes require verification.
          </p>
        </CardContent>
      </Card>

      {/* Verification Status */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Shield className="h-5 w-5" />
            Verification Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-green-900/20 border border-green-800 rounded-lg">
            <div>
              <p className="font-medium text-green-300">University Verified</p>
              <p className="text-sm text-green-200">Your university has been verified on the VeriCred platform</p>
            </div>
            <Badge className="bg-green-900/30 text-green-300 border-green-800">
              <Shield className="h-3 w-3 mr-1" />
              Verified
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
