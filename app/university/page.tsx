"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, Users, Award, Settings, LogOut, Shield } from "lucide-react"
import UniversityProfile from "@/components/university-profile"
import StudentManagement from "@/components/student-management"
import CredentialManagement from "@/components/credential-management"
import UniversitySettings from "@/components/university-settings"
import MintCredentialModal from "@/components/mint-credential-modal"

// Mock data types
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

interface Student {
  id: string
  name: string
  universityId: string
  walletAddress: string
  eligibilityStatus: "graduated" | "eligible" | "pending_review" | "not_eligible"
  mintingStatus: "none" | "pending" | "minting" | "minted" | "failed"
  joinDate: string
  lastActivity: string
}

interface Credential {
  id: string
  name: string
  type: string
  description: string
  totalIssued: number
  status: "active" | "inactive"
  createdDate: string
}

export default function UniversityDashboard() {
  const [university, setUniversity] = useState<University | null>(null)
  const [students, setStudents] = useState<Student[]>([])
  const [credentials, setCredentials] = useState<Credential[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isMintModalOpen, setIsMintModalOpen] = useState(false)
  const [selectedStudentForMint, setSelectedStudentForMint] = useState<Student | null>(null)

  // Mock university data
  useEffect(() => {
    const mockUniversity: University = {
      id: "mit",
      name: "Massachusetts Institute of Technology",
      logo: "/placeholder.svg?height=80&width=80&text=MIT",
      banner: "/placeholder.svg?height=200&width=800&text=MIT+Campus",
      description:
        "MIT is a world-renowned institution of higher learning known for its cutting-edge research and innovation in science, technology, engineering, and mathematics.",
      website: "https://web.mit.edu",
      walletAddress: "0x1234567890123456789012345678901234567890",
      verified: true,
      adminName: "Dr. Sarah Johnson",
      adminRole: "Registrar",
    }

    const mockStudents: Student[] = [
      {
        id: "1",
        name: "John Smith",
        universityId: "MIT2024001",
        walletAddress: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
        eligibilityStatus: "graduated",
        mintingStatus: "none",
        joinDate: "2024-01-15",
        lastActivity: "2024-01-20",
      },
      {
        id: "2",
        name: "Emily Chen",
        universityId: "MIT2024002",
        walletAddress: "0x8f3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d",
        eligibilityStatus: "eligible",
        mintingStatus: "pending",
        joinDate: "2024-01-10",
        lastActivity: "2024-01-22",
      },
      {
        id: "3",
        name: "Michael Rodriguez",
        universityId: "MIT2024003",
        walletAddress: "0x2e4f6a8b0c2d4e6f8a0b2c4d6e8f0a2b4c6d8e0f",
        eligibilityStatus: "pending_review",
        mintingStatus: "none",
        joinDate: "2024-01-12",
        lastActivity: "2024-01-21",
      },
      {
        id: "4",
        name: "Lisa Wang",
        universityId: "MIT2023045",
        walletAddress: "0x9a1b3c5d7e9f1a3b5c7d9e1f3a5b7c9d1e3f5a7b",
        eligibilityStatus: "graduated",
        mintingStatus: "minted",
        joinDate: "2023-09-01",
        lastActivity: "2024-01-19",
      },
    ]

    const mockCredentials: Credential[] = [
      {
        id: "1",
        name: "Bachelor of Science in Computer Science",
        type: "Undergraduate Degree",
        description: "4-year undergraduate program in computer science",
        totalIssued: 156,
        status: "active",
        createdDate: "2023-01-01",
      },
      {
        id: "2",
        name: "Master of Science in Artificial Intelligence",
        type: "Graduate Degree",
        description: "2-year graduate program specializing in AI",
        totalIssued: 89,
        status: "active",
        createdDate: "2023-01-01",
      },
      {
        id: "3",
        name: "Certificate in Blockchain Technology",
        type: "Certificate",
        description: "Professional certificate program in blockchain",
        totalIssued: 234,
        status: "active",
        createdDate: "2023-06-01",
      },
    ]

    // Simulate API loading
    setTimeout(() => {
      setUniversity(mockUniversity)
      setStudents(mockStudents)
      setCredentials(mockCredentials)
      setLoading(false)
    }, 1000)
  }, [])

  const handleLogout = () => {
    // Clear any stored data and redirect
    window.location.href = "/"
  }

  const handleMintCredential = (student: Student) => {
    setSelectedStudentForMint(student)
    setIsMintModalOpen(true)
  }

  const handleMintSubmit = async (credentialData: any) => {
    setLoading(true)
    // Mock API call to mint credential
    setTimeout(() => {
      // Update student's minting status
      setStudents((prev) =>
        prev.map((student) =>
          student.id === selectedStudentForMint?.id ? { ...student, mintingStatus: "minting" as const } : student,
        ),
      )

      // Simulate minting completion
      setTimeout(() => {
        setStudents((prev) =>
          prev.map((student) =>
            student.id === selectedStudentForMint?.id ? { ...student, mintingStatus: "minted" as const } : student,
          ),
        )
        setLoading(false)
      }, 3000)

      setIsMintModalOpen(false)
      setSelectedStudentForMint(null)
    }, 1000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-400">Loading university dashboard...</p>
        </div>
      </div>
    )
  }

  if (!university) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Card className="w-full max-w-md bg-gray-900 border-gray-800">
          <CardHeader className="text-center">
            <CardTitle className="text-white">Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-400 mb-4">Unable to load university data. Please contact support.</p>
            <Button
              onClick={() => (window.location.href = "/")}
              className="w-full bg-white text-black hover:bg-gray-100"
            >
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
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
                University Admin
              </Badge>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2">
                <Building2 className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-gray-300">{university.name}</span>
                {university.verified && <Shield className="h-4 w-4 text-green-400" />}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Navigation Tabs */}
          <TabsList className="grid w-full grid-cols-4 bg-gray-900 border border-gray-800">
            <TabsTrigger
              value="dashboard"
              className="flex items-center gap-2 data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
            >
              <Building2 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="students"
              className="flex items-center gap-2 data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
            >
              <Users className="h-4 w-4" />
              Students
            </TabsTrigger>
            <TabsTrigger
              value="credentials"
              className="flex items-center gap-2 data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
            >
              <Award className="h-4 w-4" />
              Credentials
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="flex items-center gap-2 data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
            >
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Overview */}
          <TabsContent value="dashboard" className="space-y-6">
            <UniversityProfile university={university} />

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-400">Total Students</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{students.length}</div>
                  <p className="text-xs text-gray-500">Active on platform</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-400">Credentials Issued</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {credentials.reduce((sum, cred) => sum + cred.totalIssued, 0)}
                  </div>
                  <p className="text-xs text-gray-500">Total NFTs minted</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-400">Pending Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {students.filter((s) => s.mintingStatus === "pending").length}
                  </div>
                  <p className="text-xs text-gray-500">Awaiting approval</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {students.slice(0, 3).map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                      <div>
                        <p className="font-medium text-white">{student.name}</p>
                        <p className="text-sm text-gray-400">
                          Status: {student.eligibilityStatus.replace("_", " ")} • Last active:{" "}
                          {new Date(student.lastActivity).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge
                        variant="secondary"
                        className={
                          student.mintingStatus === "minted"
                            ? "bg-green-900/30 text-green-300 border-green-800"
                            : student.mintingStatus === "pending"
                              ? "bg-yellow-900/30 text-yellow-300 border-yellow-800"
                              : "bg-gray-800 text-gray-400 border-gray-700"
                        }
                      >
                        {student.mintingStatus === "none" ? "No requests" : student.mintingStatus}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Students Management */}
          <TabsContent value="students">
            <StudentManagement students={students} setStudents={setStudents} onMintCredential={handleMintCredential} />
          </TabsContent>

          {/* Credentials Management */}
          <TabsContent value="credentials">
            <CredentialManagement credentials={credentials} setCredentials={setCredentials} />
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings">
            <UniversitySettings university={university} setUniversity={setUniversity} />
          </TabsContent>
        </Tabs>
        {/* Mint Credential Modal */}
        <MintCredentialModal
          isOpen={isMintModalOpen}
          onClose={() => {
            setIsMintModalOpen(false)
            setSelectedStudentForMint(null)
          }}
          onSubmit={handleMintSubmit}
          student={selectedStudentForMint}
          university={university}
        />
      </main>
    </div>
  )
}
