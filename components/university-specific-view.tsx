"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Award, Clock, CheckCircle, AlertCircle, Calendar, FileText, Shield, Eye, Settings } from "lucide-react"

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

interface Credential {
  id: string
  name: string
  issueDate: string
  universityId: string
  universityName: string
  status: "eligible" | "pending" | "minted" | "rejected"
  description?: string
}

interface UniversitySpecificViewProps {
  university: University
  credentials: Credential[]
  loading: boolean
  userProfile: UserProfile | null
  onMintRequest: (credentialId: string) => void
}

interface UserProfile {
  role: string
  first_name?: string
  last_name?: string
  email?: string
  student_id?: string
}

export default function UniversitySpecificView({
  university,
  credentials,
  loading,
  userProfile,
  onMintRequest,
}: UniversitySpecificViewProps) {
  const eligibleCredentials = credentials.filter((cred) => cred.status === "eligible")
  const pendingCredentials = credentials.filter((cred) => cred.status === "pending")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "eligible":
        return <Award className="h-4 w-4 text-green-400" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-400" />
      case "minted":
        return <CheckCircle className="h-4 w-4 text-blue-400" />
      case "rejected":
        return <AlertCircle className="h-4 w-4 text-red-400" />
      default:
        return <FileText className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "eligible":
        return (
          <Badge variant="secondary" className="bg-green-900/30 text-green-300 border-green-800">
            Ready to Mint
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-900/30 text-yellow-300 border-yellow-800">
            Pending Approval
          </Badge>
        )
      case "minted":
        return (
          <Badge variant="secondary" className="bg-blue-900/30 text-blue-300 border-blue-800">
            Minted
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="secondary" className="bg-red-900/30 text-red-300 border-red-800">
            Rejected
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="border-gray-700 text-gray-400">
            Unknown
          </Badge>
        )
    }
  }

  if (loading) {
    return (
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-700 rounded-full animate-pulse"></div>
            <div>
              <div className="h-6 w-48 bg-gray-700 rounded animate-pulse mb-2"></div>
              <div className="h-4 w-32 bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 border border-gray-700 rounded-lg">
                <div className="h-5 w-3/4 bg-gray-700 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-1/2 bg-gray-700 rounded animate-pulse mb-3"></div>
                <div className="h-10 w-32 bg-gray-700 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <CardTitle className="flex items-center gap-2 text-white">
              {university.org_name}
              {university.is_verified && <Shield className="h-5 w-5 text-green-400" />}
            </CardTitle>
            <CardDescription className="font-mono text-xs text-gray-500">
              {university.metamask_address.slice(0, 10)}...{university.metamask_address.slice(-8)}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Eligible Credentials */}
        {eligibleCredentials.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
              <Award className="h-5 w-5 text-green-400" />
              {university.org_name} Credentials Available for You
            </h3>
            <div className="space-y-3">
              {eligibleCredentials.map((credential) => (
                <div
                  key={credential.id}
                  className="p-4 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusIcon(credential.status)}
                        <h4 className="font-medium text-white">{credential.name}</h4>
                        {getStatusBadge(credential.status)}
                      </div>
                      {credential.description && <p className="text-sm text-gray-400 mb-2">{credential.description}</p>}
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Issue Date: {new Date(credential.issueDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {credential.status === "eligible" && (
                        <Button
                          onClick={() => onMintRequest(credential.id)}
                          disabled={loading}
                          className="ml-4 bg-white text-black hover:bg-gray-100"
                        >
                          Request NFT Mint
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pending Requests */}
        {pendingCredentials.length > 0 && (
          <>
            {eligibleCredentials.length > 0 && <Separator className="bg-gray-800" />}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
                <Clock className="h-5 w-5 text-yellow-400" />
                Pending Requests
              </h3>
              <div className="space-y-3">
                {pendingCredentials.map((credential) => (
                  <div key={credential.id} className="p-4 border border-yellow-800 rounded-lg bg-yellow-900/10">
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusIcon(credential.status)}
                      <h4 className="font-medium text-white">{credential.name}</h4>
                      {getStatusBadge(credential.status)}
                    </div>
                    <p className="text-sm text-gray-400">
                      Your mint request has been submitted and is awaiting university approval.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Empty State */}
        {credentials.length === 0 && (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No Credentials Available</h3>
            <p className="text-gray-400">
              You don't have any eligible credentials from {university.org_name} at this time.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
