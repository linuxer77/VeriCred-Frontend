"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { GraduationCap, CheckCircle, AlertCircle, User } from "lucide-react"
import WalletStatus from "@/components/wallet-status"
import UniversitySelector from "@/components/university-selector"
import UniversitySpecificView from "@/components/university-specific-view"
import MintedCredentialsSummary from "@/components/minted-credentials-summary"
import WalletGuard from "@/components/wallet-guard"
import AuthGuard from "@/components/auth/auth-guard"
import { motion } from "framer-motion"
import { getStoredToken, isJwtValid } from "@/components/auth/jwt"
import Logo from "@/components/ui/logo"

interface University {
  ID: number
  MetamaskAddress: string
  AcadEmail: string
  OrgName: string
  OrgType: string
  OrgUrl: string
  OrgDesc: string
  Country: string
  State: string
  City: string
  Address: string
  PostalCode: string
  IsVerified: boolean
  TotalStudents: number
  CreatedAt: string
  UpdatedAt: string
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
  role: string
  first_name?: string
  last_name?: string
  email?: string
  student_id?: string
}

export default function StudentDashboard() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null)
  const [credentials, setCredentials] = useState<Credential[]>([])
  const [mintedCredentials, setMintedCredentials] = useState<Credential[]>([])
  const [loading, setLoading] = useState(true)
  const [profileLoading, setProfileLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  useEffect(() => {
    const init = async () => {
      try {
        const storedWalletRaw = localStorage.getItem("vericred_wallet")
        if (!storedWalletRaw) {
          setProfileLoading(false)
          setLoading(false)
          return
        }
        const walletData = JSON.parse(storedWalletRaw)
        setWalletAddress(walletData?.address || null)

        const localUserRaw = localStorage.getItem("vericred_user")
        if (localUserRaw) {
          const localUser = JSON.parse(localUserRaw)
          setUserProfile({
            role: localUser.role || "Individual",
            first_name: localUser.first_name,
            last_name: localUser.last_name,
            email: localUser.email,
            student_id: localUser.student_id,
          })
          setProfileLoading(false)
          setLoading(false)
          return
        }

        const token = getStoredToken()
        if (isJwtValid(token)) {
          const res = await fetch("http://localhost:8080/home", {
            headers: {
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          })
          if (res.ok) {
            const me = await res.json()
            setUserProfile({
              role: me.role || "Individual",
              first_name: me.first_name,
              last_name: me.last_name,
              email: me.email,
              student_id: me.student_id,
            })
          }
        }
      } catch (err) {
        console.error("Error loading user profile:", err)
        setError("Failed to load profile")
      } finally {
        setProfileLoading(false)
        setLoading(false)
      }
    }

    init()
  }, [])

  useEffect(() => {
    if (!userProfile) return
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
  }, [userProfile])

  const handleUniversitySelect = async (university: University) => {
    setSelectedUniversity(university)
    setLoading(true)
    setError(null)

    try {
      const mockCredentials: Credential[] = [
        {
          id: "3",
          name: "Bachelor of Science in Computer Science",
          issueDate: "2024-05-15",
          universityId: university.ID.toString(),
          universityName: university.OrgName,
          status: "eligible",
          description: "4-year undergraduate degree program",
        },
        {
          id: "4",
          name: "Dean's List Recognition - Fall 2023",
          issueDate: "2023-12-20",
          universityId: university.ID.toString(),
          universityName: university.OrgName,
          status: "pending",
          description: "Academic achievement recognition",
        },
      ]

      setTimeout(() => {
        setCredentials(mockCredentials)
        setLoading(false)
      }, 900)
    } catch (err) {
      setError("Failed to fetch credentials from university")
      setLoading(false)
    }
  }

  const handleDisconnectWallet = () => {
    localStorage.removeItem("vericred_wallet")
    localStorage.removeItem("verifiedUser")
    setUserProfile(null)
    setSelectedUniversity(null)
    setCredentials([])
    setMintedCredentials([])
    window.location.href = "/"
  }

  if (profileLoading) {
    return (
      <AuthGuard>
        <WalletGuard>
          <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-gray-400">Loading your profile...</p>
            </div>
          </div>
        </WalletGuard>
      </AuthGuard>
    )
  }

  if (!userProfile) {
    return (
      <AuthGuard>
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
                <p className="text-center text-sm text-gray-400">Unable to load your profile. Please try reconnecting your wallet.</p>
                <Button onClick={() => (window.location.href = "/")} className="w-full bg-white text-black hover:bg-gray-100">
                  Return to Home
                </Button>
              </CardContent>
            </Card>
          </div>
        </WalletGuard>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard>
      <WalletGuard>
        <div className="relative min-h-screen bg-black text-white overflow-hidden">
          <motion.div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, ease: "easeOut" }} />
          <motion.div aria-hidden="true" className="pointer-events-none absolute -bottom-16 -left-24 h-80 w-80 rounded-full bg-purple-800/20 blur-3xl" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.3, ease: "easeOut", delay: 0.1 }} />

          {/* Header */}
          <header className="bg-gray-900/90 shadow-sm border-b border-gray-800 backdrop-blur supports-[backdrop-filter]:bg-gray-900/70">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <Logo size="md" />
                  <Badge variant="secondary" className="ml-3 bg-purple-900/30 text-purple-300 border-purple-700">
                    Workspace
                  </Badge>
                </div>
                <WalletStatus userProfile={{ walletAddress: walletAddress || "", role: userProfile.role }} onDisconnect={handleDisconnectWallet} />
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-900/20 border border-red-800 rounded-lg flex items-center gap-2 backdrop-blur-sm"
              >
                <AlertCircle className="h-5 w-5 text-red-400" />
                <p className="text-red-300">{error}</p>
              </motion.div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Left Column - University Selection & View */}
              <div className="lg:col-span-2 space-y-6">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
                  <UniversitySelector onUniversitySelect={handleUniversitySelect} selectedUniversity={selectedUniversity} />
                </motion.div>

                {selectedUniversity ? (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.05 }}>
                  <UniversitySpecificView
                    university={selectedUniversity}
                    credentials={credentials}
                    loading={loading}
                    userProfile={userProfile}
                      onMintRequest={(_id) => {
                        setSuccessMessage("Mint request submitted successfully! The university will review your request.")
                        setTimeout(() => setSuccessMessage(null), 4000)
                      }}
                    />
                  </motion.div>
                ) : (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.05 }}>
                  <Card className="bg-gradient-to-br from-gray-900/90 via-black/80 to-purple-900/20 border border-gray-800/60 backdrop-blur-xl shadow-2xl">
                    <CardContent className="py-12 text-center">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <GraduationCap className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                      </motion.div>
                      <h3 className="text-lg font-medium text-white mb-2">Select a University</h3>
                        <p className="text-gray-400">Choose a university above to view your available credentials and request NFT minting.</p>
                    </CardContent>
                  </Card>
                  </motion.div>
                )}
              </div>

              {/* Right Column - Summary */}
              <div className="space-y-6">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.1 }}>
                <MintedCredentialsSummary credentials={mintedCredentials} />
                </motion.div>

                {/* Profile Summary with required fields */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.15 }}>
                <Card className="bg-gradient-to-br from-gray-900/90 via-black/80 to-purple-900/20 border border-gray-800/60 backdrop-blur-xl shadow-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <User className="h-5 w-5 text-purple-400" />
                      </motion.div>
                      Profile Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">First name:</span>
                        <span className="text-sm font-medium text-white">{userProfile.first_name || "—"}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Last name:</span>
                        <span className="text-sm font-medium text-white">{userProfile.last_name || "—"}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Email:</span>
                        <span className="text-sm font-medium text-white">{userProfile.email || "—"}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Student email:</span>
                        <span className="text-sm font-medium text-white">{userProfile.student_id || "—"}</span>
                    </div>
                      <Separator className="bg-gray-800" />
                      <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Role:</span>
                      <Badge variant="outline" className="border-purple-700 text-purple-300">
                          {userProfile.role}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {successMessage && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                    <div className="p-4 bg-green-900/20 border border-green-800 rounded-lg flex items-center gap-2 backdrop-blur-sm">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <p className="text-green-300">{successMessage}</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </main>
        </div>
      </WalletGuard>
    </AuthGuard>
  )
}
