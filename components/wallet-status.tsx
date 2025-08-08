"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wallet, LogOut } from "lucide-react"

interface UserProfile {
  walletAddress: string
  role: string
  name?: string
}

interface WalletStatusProps {
  userProfile: UserProfile | null
  onDisconnect: () => void
}

export default function WalletStatus({ userProfile, onDisconnect }: WalletStatusProps) {
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  // Show loading state if userProfile is null
  if (!userProfile) {
    return (
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-700 rounded animate-pulse"></div>
          <div className="w-24 h-4 bg-gray-700 rounded animate-pulse"></div>
          <div className="w-16 h-5 bg-gray-700 rounded animate-pulse"></div>
        </div>
        <div className="w-20 h-8 bg-gray-700 rounded animate-pulse"></div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <div className="hidden sm:flex items-center gap-2">
        <Wallet className="h-4 w-4 text-green-400" />
        <span className="text-sm text-gray-300">
          Connected: <span className="font-mono text-white">{formatAddress(userProfile.walletAddress)}</span>
        </span>
        <Badge variant="secondary" className="text-xs bg-gray-800 text-gray-300 border-gray-700">
          {userProfile.role}
        </Badge>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={onDisconnect}
        className="flex items-center gap-2 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent"
      >
        <LogOut className="h-4 w-4" />
        <span className="hidden sm:inline">Disconnect</span>
      </Button>
    </div>
  )
}
