"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Eye, Award, Settings, CheckCircle, Clock, AlertCircle } from "lucide-react"

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

interface StudentManagementProps {
  students: Student[]
  setStudents: (students: Student[]) => void
  onMintCredential: (student: Student) => void
}

export default function StudentManagement({ students, setStudents, onMintCredential }: StudentManagementProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [loading, setLoading] = useState(false)

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.universityId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.walletAddress.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = statusFilter === "all" || student.eligibilityStatus === statusFilter

    return matchesSearch && matchesFilter
  })

  const handleMintRequest = async (studentId: string) => {
    setLoading(true)
    // Mock API call
    setTimeout(() => {
      setStudents(
        students.map((student) =>
          student.id === studentId ? { ...student, mintingStatus: "pending" as const } : student,
        ),
      )
      setLoading(false)
    }, 1000)
  }

  const handleStatusUpdate = async (studentId: string, newStatus: Student["eligibilityStatus"]) => {
    setLoading(true)
    // Mock API call
    setTimeout(() => {
      setStudents(
        students.map((student) => (student.id === studentId ? { ...student, eligibilityStatus: newStatus } : student)),
      )
      setLoading(false)
    }, 1000)
  }

  const getEligibilityBadge = (status: Student["eligibilityStatus"]) => {
    switch (status) {
      case "graduated":
        return <Badge className="bg-green-900/30 text-green-300 border-green-800">Graduated</Badge>
      case "eligible":
        return <Badge className="bg-blue-900/30 text-blue-300 border-blue-800">Eligible</Badge>
      case "pending_review":
        return <Badge className="bg-yellow-900/30 text-yellow-300 border-yellow-800">Pending Review</Badge>
      case "not_eligible":
        return <Badge className="bg-red-900/30 text-red-300 border-red-800">Not Eligible</Badge>
    }
  }

  const getMintingStatusIcon = (status: Student["mintingStatus"]) => {
    switch (status) {
      case "minted":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "pending":
      case "minting":
        return <Clock className="h-4 w-4 text-yellow-400" />
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-400" />
      default:
        return null
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Students & Credential Issuance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search by name, ID, or wallet address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-500"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48 bg-gray-800 border-gray-700 text-white">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all" className="text-white">
                  All Students
                </SelectItem>
                <SelectItem value="graduated" className="text-white">
                  Graduated
                </SelectItem>
                <SelectItem value="eligible" className="text-white">
                  Eligible
                </SelectItem>
                <SelectItem value="pending_review" className="text-white">
                  Pending Review
                </SelectItem>
                <SelectItem value="not_eligible" className="text-white">
                  Not Eligible
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Students Table */}
          <div className="border border-gray-700 rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700 hover:bg-gray-800">
                  <TableHead className="text-gray-300">Student</TableHead>
                  <TableHead className="text-gray-300">University ID</TableHead>
                  <TableHead className="text-gray-300">Wallet Address</TableHead>
                  <TableHead className="text-gray-300">Eligibility</TableHead>
                  <TableHead className="text-gray-300">Minting Status</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id} className="border-gray-700 hover:bg-gray-800">
                    <TableCell>
                      <div>
                        <p className="font-medium text-white">{student.name}</p>
                        <p className="text-sm text-gray-400">
                          Joined: {new Date(student.joinDate).toLocaleDateString()}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300 font-mono">{student.universityId}</TableCell>
                    <TableCell className="text-gray-300 font-mono">{formatAddress(student.walletAddress)}</TableCell>
                    <TableCell>{getEligibilityBadge(student.eligibilityStatus)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getMintingStatusIcon(student.mintingStatus)}
                        <span className="text-gray-300 capitalize">
                          {student.mintingStatus === "none" ? "No requests" : student.mintingStatus}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {student.eligibilityStatus === "graduated" && student.mintingStatus === "none" && (
                          <Button
                            size="sm"
                            onClick={() => onMintCredential(student)}
                            disabled={loading}
                            className="bg-white text-black hover:bg-gray-100"
                          >
                            <Award className="h-4 w-4 mr-1" />
                            Mint
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                        >
                          <Settings className="h-4 w-4 mr-1" />
                          Manage
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400">No students found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
