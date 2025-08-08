"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Eye } from "lucide-react"

interface Credential {
  id: string
  name: string
  issueDate: string
  universityId: string
  universityName: string
  status: "eligible" | "pending" | "minted" | "rejected"
}

interface MintedCredentialsSummaryProps {
  credentials: Credential[]
}

export default function MintedCredentialsSummary({ credentials }: MintedCredentialsSummaryProps) {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Award className="h-5 w-5" />
          My Minted Credentials
        </CardTitle>
        <CardDescription className="text-gray-400">Your verified digital credentials</CardDescription>
      </CardHeader>
      <CardContent>
        {credentials.length > 0 ? (
          <div className="space-y-4">
            <div className="space-y-3">
              {credentials.slice(0, 3).map((credential) => (
                <div key={credential.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div>
                    <h4 className="font-medium text-sm text-white">{credential.name}</h4>
                    <p className="text-xs text-gray-400">{credential.universityName}</p>
                    <p className="text-xs text-gray-500">{new Date(credential.issueDate).toLocaleDateString()}</p>
                  </div>
                  <Badge variant="secondary" className="bg-blue-900/30 text-blue-300 border-blue-800">
                    Minted
                  </Badge>
                </div>
              ))}
            </div>

            {credentials.length > 3 && (
              <p className="text-sm text-gray-400 text-center">+{credentials.length - 3} more credentials</p>
            )}

            <Button
              variant="outline"
              className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent"
              size="sm"
            >
              <Eye className="h-4 w-4 mr-2" />
              View All My Credentials
            </Button>
          </div>
        ) : (
          <div className="text-center py-6">
            <Award className="h-8 w-8 text-gray-600 mx-auto mb-3" />
            <p className="text-sm text-gray-400 mb-3">No minted credentials yet</p>
            <p className="text-xs text-gray-500">Request credentials from universities to get started</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
