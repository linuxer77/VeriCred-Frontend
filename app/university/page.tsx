"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, Users, Award, Settings, LogOut, Shield, TrendingUp, Activity, Zap, Plus, BarChart3, Clock, CheckCircle } from "lucide-react"
import UniversityProfile from "@/components/university-profile"
import StudentManagement from "@/components/student-management"
import CredentialManagement from "@/components/credential-management"
import UniversitySettings from "@/components/university-settings"
import MintCredentialModal from "@/components/mint-credential-modal"
import AuthGuard from "@/components/auth/auth-guard"
import { motion } from "framer-motion"
import Logo from "@/components/ui/logo"
import { getStoredToken } from "@/components/auth/jwt"

// Mock data types
interface University {
  id: string
  name: string
  description: string
  website: string
  walletAddress: string
  verified: boolean
  adminName: string
  adminRole: string
  logo: string
  banner: string
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
  const [animatedStats, setAnimatedStats] = useState({
    students: 0,
    credentials: 0,
    pending: 0
  })
  const [recentActivities, setRecentActivities] = useState<any[]>([])
  const [quickActions] = useState([
    { id: 'add-student', label: 'Add Student', icon: Plus, action: () => console.log('Add student') },
    { id: 'create-credential', label: 'Create Credential', icon: Award, action: () => console.log('Create credential') },
    { id: 'bulk-import', label: 'Bulk Import', icon: Users, action: () => console.log('Bulk import') },
    { id: 'analytics', label: 'View Analytics', icon: BarChart3, action: () => console.log('View analytics') }
  ])
  const [isClient, setIsClient] = useState(false)

  // Set client state after mount
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Load university data - check for first-time user or returning user
  useEffect(() => {
    if (!isClient) return // Don't load data until client is ready
    
    const loadUniversityData = async () => {
      try {
        // Check if this is a first-time user (has user data in localStorage)
        // Only access localStorage on the client side
        const storedUser = typeof window !== 'undefined' ? localStorage.getItem("vericred_user") : null
        const token = typeof window !== 'undefined' ? getStoredToken() : null
        
        if (storedUser && token) {
          // First-time user - use data from signup
          const userData = JSON.parse(storedUser)
          
          // Create university object from signup data
          const newUniversity: University = {
            id: userData.id || "new-org",
            name: userData.OrgName || "New Organization",
            description: userData.OrgDesc || "Organization description",
            website: userData.OrgUrl || "https://example.com",
            walletAddress: userData.walletAddress || "0x0000000000000000000000000000000000000000",
            verified: false, // New organizations start as unverified
            adminName: `${userData.firstName} ${userData.lastName}`,
            adminRole: "Administrator",
            logo: "https://example.com/logo.png",
            banner: "https://example.com/banner.jpg",
          }
          
          // Create initial data for new organization
          const initialStudents: Student[] = []
          const initialCredentials: Credential[] = []
          const initialActivities = [
            { id: 1, type: 'org_created', student: 'System', credential: 'Organization Created', time: 'Just now', status: 'completed' }
          ]
          
          setUniversity(newUniversity)
          setStudents(initialStudents)
          setCredentials(initialCredentials)
          setRecentActivities(initialActivities)
          setLoading(false)
          
          // Set initial stats
          setAnimatedStats({
            students: 0,
            credentials: 0,
            pending: 0
          })
          
        } else if (token) {
          // Returning user - fetch data from API
          const response = await fetch("http://localhost:8080/api/university", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          
          if (response.ok) {
            const data = await response.json()
            setUniversity(data.university)
            setStudents(data.students || [])
            setCredentials(data.credentials || [])
            setRecentActivities(data.activities || [])
            
            // Set stats from API data
            setAnimatedStats({
              students: data.students?.length || 0,
              credentials: data.credentials?.reduce((sum: number, cred: any) => sum + (cred.totalIssued || 0), 0) || 0,
              pending: data.students?.filter((s: any) => s.mintingStatus === "pending").length || 0
            })
          } else {
            // Fallback to mock data if API fails
            loadMockData()
          }
          setLoading(false)
        } else {
          // No token - fallback to mock data
          loadMockData()
        }
      } catch (error) {
        console.error("Error loading university data:", error)
        loadMockData()
      }
    }
    
    const loadMockData = () => {
      const mockUniversity: University = {
        id: "mit",
        name: "Massachusetts Institute of Technology",
        description:
          "MIT is a world-renowned institution of higher learning known for its cutting-edge research and innovation in science, technology, engineering, and mathematics.",
        website: "https://web.mit.edu",
        walletAddress: "0x1234567890123456789012345678901234567890",
        verified: true,
        adminName: "Dr. Sarah Johnson",
        adminRole: "Registrar",
        logo: "https://web.mit.edu/favicon.ico",
        banner: "https://web.mit.edu/images/mit-campus.jpg",
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

      const mockActivities = [
        { id: 1, type: 'credential_minted', student: 'John Smith', credential: 'BS Computer Science', time: '2 hours ago', status: 'completed' },
        { id: 2, type: 'student_added', student: 'Emily Chen', credential: 'New student registration', time: '1 day ago', status: 'completed' },
        { id: 3, type: 'credential_pending', student: 'Michael Rodriguez', credential: 'MS AI', time: '2 days ago', status: 'pending' },
        { id: 4, type: 'verification_completed', student: 'Lisa Wang', credential: 'Blockchain Certificate', time: '3 days ago', status: 'completed' }
      ]

      setUniversity(mockUniversity)
      setStudents(mockStudents)
      setCredentials(mockCredentials)
      setRecentActivities(mockActivities)
      setLoading(false)
      
      // Set initial stats
      setAnimatedStats({
        students: mockStudents.length,
        credentials: mockCredentials.reduce((sum, cred) => sum + cred.totalIssued, 0),
        pending: mockStudents.filter((s) => s.mintingStatus === "pending").length
      })
    }

    loadUniversityData()
  }, [isClient])

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

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'credential_minted':
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case 'student_added':
        return <Users className="h-4 w-4 text-blue-400" />
      case 'credential_pending':
        return <Clock className="h-4 w-4 text-yellow-400" />
      case 'verification_completed':
        return <Shield className="h-4 w-4 text-purple-400" />
      default:
        return <Activity className="h-4 w-4 text-gray-400" />
    }
  }

  const getActivityStatus = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-900/30 text-green-300 border-green-800">Completed</Badge>
      case 'pending':
        return <Badge className="bg-yellow-900/30 text-yellow-300 border-yellow-800">Pending</Badge>
      default:
        return <Badge className="bg-gray-800 text-gray-400 border-gray-700">Unknown</Badge>
    }
  }





  if (!isClient || loading) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
          {/* Animated background */}
          <motion.div 
            className="absolute inset-0 opacity-20"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
            style={{
              background: "radial-gradient(circle at 20% 80%, rgba(147, 51, 234, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)"
            }}
          />
          
          <motion.div 
            className="text-center relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="relative"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 mx-auto mb-6 flex items-center justify-center">
                <Building2 className="h-10 w-10 text-white" />
              </div>
            </motion.div>
            
            <motion.p 
              className="text-gray-300 text-lg mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {!isClient ? "Initializing..." : "Loading Issuer Hub..."}
            </motion.p>
            
            <motion.div 
              className="flex justify-center gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-purple-500 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </AuthGuard>
    )
  }

  if (!university) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="w-full max-w-md bg-gray-900/90 border-gray-800 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-white">Access Denied</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-400 mb-4">Unable to load university data. Please contact support.</p>
                <Button
                  onClick={() => (window.location.href = "/")}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 transition-all duration-200 transform hover:scale-105"
                >
                  Return to Home
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </AuthGuard>
    )
  }

  // Don't render anything until client is ready
  if (!isClient) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-gray-400">Initializing...</p>
          </div>
        </div>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard>
      <div className="relative min-h-screen bg-black text-white overflow-hidden">
        {/* Simple background animations */}
        <motion.div 
          aria-hidden="true" 
          className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl" 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 1.1, ease: "easeOut" }} 
        />
        <motion.div 
          aria-hidden="true" 
          className="pointer-events-none absolute -bottom-16 -left-24 h-80 w-80 rounded-full bg-purple-800/20 blur-3xl" 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 1.3, ease: "easeOut", delay: 0.1 }} 
        />
        
        {/* Enhanced Header */}
        <motion.header 
          className="bg-gray-900/90 shadow-lg border-b border-gray-800 backdrop-blur supports-[backdrop-filter]:bg-gray-900/70 sticky top-0 z-50"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Logo size="md" />
                <Badge variant="secondary" className="ml-3 bg-purple-900/30 text-purple-300 border-purple-700">
                  Issuer Hub
                </Badge>
              </motion.div>
              <div className="flex items-center gap-4">
                                  {university && (
                    <motion.div 
                      className="hidden sm:flex items-center gap-2 p-2 rounded-lg bg-gray-800/50 backdrop-blur-sm"
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(55, 65, 81, 0.8)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <Building2 className="h-4 w-4 text-purple-400" />
                      <span className="text-sm text-gray-300">{university.name}</span>
                      {university.verified && <Shield className="h-4 w-4 text-green-400" />}
                    </motion.div>
                  )}
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="flex items-center gap-2 border-purple-700 text-purple-300 hover:bg-purple-900/20 hover:text-purple-200 bg-transparent transition-all duration-200"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden sm:inline">Logout</span>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {university && (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            {/* Navigation Tabs */}
            <TabsList className="grid w-full grid-cols-4 bg-gray-900/80 border border-gray-800 backdrop-blur-sm p-1">
              <TabsTrigger
                value="dashboard"
                className="flex items-center gap-2 data-[state=active]:bg-purple-900/30 data-[state=active]:text-purple-300 data-[state=active]:border-purple-700 text-gray-400 transition-all duration-200 hover:text-white"
              >
                <Building2 className="h-4 w-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger
                value="students"
                className="flex items-center gap-2 data-[state=active]:bg-purple-900/30 data-[state=active]:text-purple-300 data-[state=active]:border-purple-700 text-gray-400 transition-all duration-200 hover:text-white"
              >
                <Users className="h-4 w-4" />
                Students
              </TabsTrigger>
              <TabsTrigger
                value="credentials"
                className="flex items-center gap-2 data-[state=active]:bg-purple-900/30 data-[state=active]:text-purple-300 data-[state=active]:border-purple-700 text-gray-400 transition-all duration-200 hover:text-white"
              >
                <Award className="h-4 w-4" />
                Credentials
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="flex items-center gap-2 data-[state=active]:bg-purple-900/30 data-[state=active]:text-purple-300 data-[state=active]:border-purple-700 text-gray-400 transition-all duration-200 hover:text-white"
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
                <Card className="bg-gradient-to-br from-gray-900/90 via-black/80 to-purple-900/20 border border-gray-800/60 backdrop-blur-xl shadow-2xl">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
                      <Users className="h-4 w-4 text-purple-400" />
                      Total Students
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold text-white mb-1">
                      {animatedStats.students}
                    </div>
                    <p className="text-xs text-gray-500">Active on platform</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-gray-900/90 via-black/80 to-purple-900/20 border border-gray-800/60 backdrop-blur-xl shadow-2xl">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
                      <Award className="h-4 w-4 text-purple-400" />
                      Credentials Issued
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold text-white mb-1">
                      {animatedStats.credentials}
                    </div>
                    <p className="text-xs text-gray-500">Total NFTs minted</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-gray-900/90 via-black/80 to-purple-900/20 border border-gray-800/60 backdrop-blur-xl shadow-2xl">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
                      <Activity className="h-4 w-4 text-purple-400" />
                      Pending Requests
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold text-white mb-1">
                      {animatedStats.pending}
                    </div>
                    <p className="text-xs text-gray-500">Awaiting approval</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card className="bg-gradient-to-br from-gray-900/90 via-black/80 to-purple-900/20 border border-gray-800/60 backdrop-blur-xl shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-purple-400" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-purple-700/50 transition-all duration-200 hover:bg-gray-800/70 cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center">
                            {getActivityIcon(activity.type)}
                          </div>
                          <div>
                            <p className="font-medium text-white">{activity.student}</p>
                            <p className="text-sm text-gray-400">
                              {activity.credential} • {activity.time}
                            </p>
                          </div>
                        </div>
                        {getActivityStatus(activity.status)}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Students Management */}
            <TabsContent value="students">
              <StudentManagement
                students={students}
                setStudents={setStudents}
                onMintCredential={handleMintCredential}
              />
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
          )}
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
    </AuthGuard>
  )
}
