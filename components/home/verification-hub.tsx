"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { University, GraduationCap } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

export default function VerificationHub() {
  const { toast } = useToast()
  const [pendingRole, setPendingRole] = useState<"university" | "student" | null>(null)

  const requestVerification = async (role: "university" | "student") => {
    setPendingRole(role)
    // Hook to backend verification request here
    await new Promise((r) => setTimeout(r, 900))
    toast({
      title: "Verification requested",
      description:
        role === "university"
          ? "Your university verification request has been submitted."
          : "Your student verification request has been submitted.",
    })
    setPendingRole(null)
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Card className="border-gray-800 bg-gradient-to-b from-gray-950 to-gray-900 h-full">
          <CardHeader className="space-y-2">
            <CardTitle className="flex items-center gap-2">
              <University className="h-5 w-5 text-purple-400" />
              Verify as University
            </CardTitle>
            <Badge variant="secondary" className="bg-gray-900 border border-gray-800 text-gray-300 w-fit">
              Issuer account
            </Badge>
          </CardHeader>
          <CardContent className="text-sm text-gray-300 space-y-3">
            <p>
              Request issuer verification to mint official credentials. We’ll ask for institution details and proof
              of authority.
            </p>
            <Button
              onClick={() => requestVerification("university")}
              disabled={pendingRole === "university"}
              className="bg-white text-black hover:bg-gray-100"
            >
              {pendingRole === "university" ? "Submitting..." : "Start verification"}
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Card className="border-gray-800 bg-gradient-to-b from-gray-950 to-gray-900 h-full">
          <CardHeader className="space-y-2">
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-purple-400" />
              Verify as Student
            </CardTitle>
            <Badge variant="secondary" className="bg-gray-900 border border-gray-800 text-gray-300 w-fit">
              Holder account
            </Badge>
          </CardHeader>
          <CardContent className="text-sm text-gray-300 space-y-3">
            <p>
              Verify your identity to claim credentials from verified institutions and manage your portfolio.
            </p>
            <Button
              onClick={() => requestVerification("student")}
              disabled={pendingRole === "student"}
              className="bg-white text-black hover:bg-gray-100"
            >
              {pendingRole === "student" ? "Submitting..." : "Start verification"}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  )
}
