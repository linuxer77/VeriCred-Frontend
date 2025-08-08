"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { GraduationCap, CheckCircle, AlertCircle, User, Shield } from "lucide-react"
import WalletStatus from "@/components/wallet-status"
import UniversitySelector from "@/components/university-selector"
import UniversitySpecificView from "@/components/university-specific-view"
import MintedCredentialsSummary from "@/components/minted-credentials-summary"
import QuickActions from "@/components/quick-actions"
import WalletGuard from "@/components/wallet-guard"
import ProfileVerification from "@/components/profile-verification"

// Mock data types
interface University {
  id: string
  name: string
  logo: string
  walletAddress: string
  verified: boolean
}

interface Credential {
  id: string
  name: string
  issueDate: string
  universityId: string
  universityName: string
  status: "eligible" | "pending" | "minted" | "rejected"
  description?: string
}

interface UserProfile {
  walletAddress: string
  role: string
  name?: string
  email?: string
  isVerified: boolean
  verificationStatus: "unverified" | "pending" | "verified" | "rejected"
}

export default function StudentDashboard() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null)
  const [credentials, setCredentials] = useState<Credential[]>([])
  const [mintedCredentials, setMintedCredentials] = useState<Credential[]>([])
  const [loading, setLoading] = useState(true)
  const [profileLoading, setProfileLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Load user profile from stored wallet data
  useEffect(() => {
    const loadUserProfile = () => {
      try {
        const storedWallet = localStorage.getItem("vericred_wallet")
        if (!storedWallet) {
          setProfileLoading(false)
          return
        }

        const walletData = JSON.parse(storedWallet)

        const mockUserProfile: UserProfile = {
          walletAddress: walletData.address,
          role: "Individual",
          name: "John Doe",
          email: "john.doe@email.com",
          isVerified: false,
          verificationStatus: "unverified",
        }

        // Simulate API call delay
        setTimeout(() => {
          setUserProfile(mockUserProfile)
          setProfileLoading(false)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error loading user profile:", error)
        setProfileLoading(false)
        setLoading(false)
      }
    }

    loadUserProfile()
  }, [])

  // Mock minted credentials
  useEffect(() => {
    if (userProfile) {
      const mockMintedCredentials: Credential[] = [
        {
          id: "1",
          name: "High School Diploma",
          issueDate: "2020-06-15",
          universityId: "hs1",
          universityName: "Lincoln High School",
          status: "minted",
        },
        {
          id: "2",
          name: "Certificate in Web Development",
          issueDate: "2022-03-20",
          universityId: "cert1",
          universityName: "Tech Academy",
          status: "minted",
        },
      ]

      setMintedCredentials(mockMintedCredentials)
    }
  }, [userProfile])

  const handleUniversitySelect = async (university: University) => {
    setSelectedUniversity(university)
    setLoading(true)
    setError(null)

    try {
      // Mock API call to fetch eligible credentials
      const mockCredentials: Credential[] = [
        {
          id: "3",
          name: "Bachelor of Science in Computer Science",
          issueDate: "2024-05-15",
          universityId: university.id,
          universityName: university.name,
          status: "eligible",
          description: "4-year undergraduate degree program",
        },
        {
          id: "4",
          name: "Dean's List Recognition - Fall 2023",
          issueDate: "2023-12-20",
          universityId: university.id,
          universityName: university.name,
          status: "pending",
          description: "Academic achievement recognition",
        },
      ]

      setTimeout(() => {
        setCredentials(mockCredentials)
        setLoading(false)
      }, 1500)
    } catch (err) {
      setError("Failed to fetch credentials from university")
      setLoading(false)
    }
  }

  const handleMintRequest = async (credentialId: string) => {
    setLoading(true)
    setError(null)

    try {
      // Mock API call to request mint
      setTimeout(() => {
        setCredentials((prev) =>
          prev.map((cred) => (cred.id === credentialId ? { ...cred, status: "pending" as const } : cred)),
        )
        setSuccessMessage("Mint request submitted successfully! The university will review your request.")
        setLoading(false)

        // Clear success message after 5 seconds
        setTimeout(() => setSuccessMessage(null), 5000)
      }, 1000)
    } catch (err) {
      setError("Failed to submit mint request")
      setLoading(false)
    }
  }

  const handleDisconnectWallet = () => {
    // Clear stored wallet data
    localStorage.removeItem("vericred_wallet")

    // Reset state
    setUserProfile(null)
    setSelectedUniversity(null)
    setCredentials([])
    setMintedCredentials([])

    // Redirect to home
    window.location.href = "/"
  }

  const handleStartVerification = () => {
    setUserProfile((prev) => (prev ? { ...prev, verificationStatus: "pending" } : null))
    // Mock verification process
    setTimeout(() => {
      setUserProfile((prev) => (prev ? { ...prev, verificationStatus: "verified", isVerified: true } : null))
      setSuccessMessage("Profile verification completed successfully!")
      setTimeout(() => setSuccessMessage(null), 5000)
    }, 3000)
  }

  // Show loading state while profile is being loaded
  if (profileLoading) {
    return (
      <WalletGuard>
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-gray-400">Loading your profile...</p>
          </div>
        </div>
      </WalletGuard>
    )
  }

  // Show error state if profile failed to load
  if (!userProfile) {
    return (
      <WalletGuard>
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <Card className="w-full max-w-md bg-gray-900 border-gray-800">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-white">
                <AlertCircle className="h-5 w-5 text-red-400" />
                Profile Load Error
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-sm text-gray-400">
                Unable to load your profile. Please try reconnecting your wallet.
              </p>
              <Button
                onClick={() => (window.location.href = "/")}
                className="w-full bg-white text-black hover:bg-gray-100"
              >
                Return to Home
              </Button>
            </CardContent>
          </Card>
        </div>
      </WalletGuard>
    )
  }

  return (
    <WalletGuard>
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <header className="bg-gray-900 shadow-sm border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-white">
                  Veri<span className="text-gray-400">Cred</span>
                </h1>
                <Badge variant="secondary" className="ml-3 bg-gray-800 text-gray-300 border-gray-700">
                  Student Dashboard
                </Badge>
              </div>
              <WalletStatus userProfile={userProfile} onDisconnect={handleDisconnectWallet} />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-900/20 border border-green-800 rounded-lg flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <p className="text-green-300">{successMessage}</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-800 rounded-lg flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <p className="text-red-300">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - University Selection & Specific View */}
            <div className="lg:col-span-2 space-y-6">
              {/* University Selector */}
              <UniversitySelector onUniversitySelect={handleUniversitySelect} selectedUniversity={selectedUniversity} />

              {/* University Specific View */}
              {selectedUniversity && (
                <UniversitySpecificView
                  university={selectedUniversity}
                  credentials={credentials}
                  loading={loading}
                  userProfile={userProfile}
                  onMintRequest={handleMintRequest}
                />
              )}

              {/* Empty State */}
              {!selectedUniversity && (
                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="py-12 text-center">
                    <GraduationCap className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">Select a University</h3>
                    <p className="text-gray-400">
                      Choose a university above to view your available credentials and request NFT minting.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column - Summary & Quick Actions */}
            <div className="space-y-6">
              {/* Minted Credentials Summary */}
              <MintedCredentialsSummary credentials={mintedCredentials} />

              {/* Profile Verification */}
              <ProfileVerification userProfile={userProfile} onStartVerification={handleStartVerification} />

              {/* Quick Actions */}
              <QuickActions />

              {/* Profile Summary */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <User className="h-5 w-5" />
                    Profile Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Name:</span>
                    <span className="text-sm font-medium text-white">{userProfile?.name || "Not set"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Role:</span>
                    <Badge variant="outline" className="border-gray-700 text-gray-300">
                      {userProfile?.role || "Unknown"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Credentials:</span>
                    <span className="text-sm font-medium text-white">{mintedCredentials.length} minted</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Verification:</span>
                    {userProfile?.isVerified ? (
                      <Badge className="bg-green-900/30 text-green-300 border-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge className="bg-gray-800 text-gray-400 border-gray-700">
                        <Shield className="h-3 w-3 mr-1" />
                        Unverified
                      </Badge>
                    )}
                  </div>
                  <Separator className="bg-gray-800" />
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </WalletGuard>
  )
}
