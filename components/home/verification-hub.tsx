"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, ShieldCheck, UserCheck, Loader2, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"

type Status = "idle" | "pending" | "verified"

export default function VerificationHub() {
  const [uniStatus, setUniStatus] = useState<Status>("idle")
  const [studentStatus, setStudentStatus] = useState<Status>("idle")

  function simulate(setter: (s: Status) => void) {
    setter("pending")
    setTimeout(() => setter("verified"), 1500 + Math.random() * 1000)
  }

  const CardStatus = ({ status }: { status: Status }) => {
    if (status === "pending") {
      return (
        <Badge className="bg-yellow-900/30 text-yellow-300 border-yellow-800 inline-flex items-center gap-1">
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Pending
        </Badge>
      )
    }
    if (status === "verified") {
      return (
        <Badge className="bg-green-900/30 text-green-300 border-green-800 inline-flex items-center gap-1">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Verified
        </Badge>
      )
    }
    return (
      <Badge className="bg-gray-800 text-gray-400 border-gray-700 inline-flex items-center gap-1">
        <ShieldCheck className="h-3.5 w-3.5" />
        Unverified
      </Badge>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-white">Verification Hub</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-lg border border-gray-800 bg-gray-900/60 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-purple-400" />
                  <p className="text-white font-medium">Verify as University</p>
                </div>
                <CardStatus status={uniStatus} />
              </div>
              <p className="text-xs text-gray-400 mt-2">Submit institutional details to become an authorized issuer.</p>
              <div className="mt-3">
                <Button
                  className="bg-white text-black hover:bg-gray-100"
                  disabled={uniStatus === "pending" || uniStatus === "verified"}
                  onClick={() => simulate(setUniStatus)}
                >
                  Start verification
                </Button>
              </div>
            </div>

            <div className="rounded-lg border border-gray-800 bg-gray-900/60 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-purple-400" />
                  <p className="text-white font-medium">Verify as Student</p>
                </div>
                <CardStatus status={studentStatus} />
              </div>
              <p className="text-xs text-gray-400 mt-2">Verify your identity to connect credentials to your wallet.</p>
              <div className="mt-3">
                <Button
                  className="bg-white text-black hover:bg-gray-100"
                  disabled={studentStatus === "pending" || studentStatus === "verified"}
                  onClick={() => simulate(setStudentStatus)}
                >
                  Start verification
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
