"use client"

import AuthGuard from "@/components/auth/auth-guard"
import AddressSearch from "@/components/home/address-search"
import VerificationHub from "@/components/home/verification-hub"
import WalletStatus from "@/components/wallet-status"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Logo from "@/components/ui/logo"

type VerificationStatus = "unverified" | "pending" | "verified"
interface UserProfile {
  walletAddress: string
  role: string
  name?: string
  email?: string
  isVerified: boolean
  verificationStatus: VerificationStatus
}

export default function HomePage() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem("vericred_wallet")
      if (!raw) return
      const w = JSON.parse(raw)
      const profile: UserProfile = {
        walletAddress: w.address,
        role: "Individual",
        name: "Anonymous",
        email: "",
        isVerified: false,
        verificationStatus: "unverified",
      }
      setUserProfile(profile)
    } catch {
      // ignore
    }
  }, [])

  function disconnect() {
    localStorage.removeItem("vericred_wallet")
    window.location.href = "/"
  }

  return (
    <AuthGuard>
      <div className="relative min-h-screen bg-black text-white overflow-hidden">
        <motion.div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, ease: "easeOut" }} />
        <motion.div aria-hidden="true" className="pointer-events-none absolute -bottom-16 -left-24 h-80 w-80 rounded-full bg-purple-800/20 blur-3xl" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.3, ease: "easeOut", delay: 0.1 }} />
        {/* Header */}
        <header className="bg-gray-900/90 border-b border-gray-800 sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-gray-900/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Logo size="md" />
              <Badge variant="secondary" className="ml-1 bg-purple-900/30 text-purple-300 border-purple-700">
                User Hub
              </Badge>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
              <WalletStatus userProfile={userProfile} onDisconnect={disconnect} />
            </motion.div>
          </div>
        </header>

        {/* Main */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <motion.section
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between gap-4 flex-wrap"
          >
            <div>
              <h2 className="text-xl font-semibold">Welcome back</h2>
              <p className="text-gray-400 text-sm">Search users or universities by address and manage verification.</p>
            </div>
            <div className="flex items-center gap-2" />
          </motion.section>

          <AddressSearch />
          <VerificationHub />
        </main>
      </div>
    </AuthGuard>
  )
}
