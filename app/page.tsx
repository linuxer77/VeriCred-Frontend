"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Wallet, Menu, X } from "lucide-react"
import { ethers } from "ethers"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)

  const handleMetaMaskConnect = async () => {
    setIsConnecting(true)

    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        alert("MetaMask is not installed. Please install MetaMask to continue.")
        setIsConnecting(false)
        return
      }

      // Initialize ethers provider
      const provider = new ethers.BrowserProvider(window.ethereum)
      await provider.send("eth_requestAccounts", [])
      const signer = await provider.getSigner()
      const address = await signer.getAddress()

      // 🔥 Step 1 — get nonce
      const nonceRes = await fetch("/api/get-nonce", {
        method: "POST",
        body: JSON.stringify({ metamask_address: address }),
        headers: { "Content-Type": "application/json" },
      })

      if (!nonceRes.ok) {
        throw new Error("Failed to get nonce")
      }

      const { nonce } = await nonceRes.json()

      // 🔐 Step 2 — sign the nonce
      const signature = await signer.signMessage(nonce)

      // 🔑 Step 3 — login with signature
      const loginRes = await fetch("/api/login-metamask", {
        method: "POST",
        body: JSON.stringify({
          metamask_address: address,
          signature: signature,
        }),
        headers: { "Content-Type": "application/json" },
      })

      if (!loginRes.ok) {
        throw new Error("Login failed")
      }

      const token = await loginRes.text() // ← your JWT here

      // Store wallet data and token
      const walletData = {
        address: address,
        chainId: await provider.getNetwork().then((network) => `0x${network.chainId.toString(16)}`),
        isConnected: true,
        timestamp: Date.now(),
        token: token,
      }

      localStorage.setItem("vericred_wallet", JSON.stringify(walletData))

      // Show success message
      alert("MetaMask connected and authenticated successfully!")

      // Redirect to role selection
      window.location.href = "/role-selection"
    } catch (error) {
      console.error("Failed to connect wallet:", error)

      // Handle specific error types
      if (error.code === 4001) {
        alert("MetaMask connection was rejected by user.")
      } else if (error.code === -32002) {
        alert("MetaMask connection request is already pending. Please check MetaMask.")
      } else {
        alert(`Failed to connect MetaMask: ${error.message}`)
      }
    } finally {
      setIsConnecting(false)
    }
  }

  const navItems = ["Home", "Docs", "Explore", "DAO", "Support"]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="relative z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="text-2xl font-bold tracking-tight">
                Veri<span className="text-gray-400">Cred</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-gray-800 rounded-md"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-400 hover:text-white"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black">
              {navItems.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium hover:bg-gray-800 rounded-md transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-[calc(100vh-64px)]">
        {/* Left Section - Login */}
        <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4 animate-fade-in">
                Welcome to
                <br />
                <span className="text-gray-400">VeriCred</span>
              </h1>
              <p className="text-gray-400 text-lg mb-8 animate-fade-in-delay">
                The decentralized platform for verified credentials and digital identity
              </p>
            </div>

            <div className="space-y-4 animate-fade-in-delay-2">
              <Button
                onClick={handleMetaMaskConnect}
                disabled={isConnecting}
                className="w-full h-14 bg-white text-black hover:bg-gray-100 font-semibold text-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100"
              >
                <Wallet className="mr-3 h-5 w-5" />
                {isConnecting ? "Connecting..." : "Login with MetaMask"}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                Connect your wallet to access the decentralized platform
              </p>
            </div>

            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 animate-fade-in-delay-3">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Secure
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                Decentralized
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                Verified
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Static Animated Background */}
        <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-gray-900 to-black">
          {/* Static geometric shapes with CSS animations */}
          <div className="absolute inset-0">
            <div className="absolute w-12 h-12 border border-gray-700 left-[15%] top-[20%] animate-spin-slow"></div>
            <div className="absolute w-8 h-8 border border-gray-600 left-[70%] top-[15%] animate-spin-reverse"></div>
            <div className="absolute w-14 h-14 border border-gray-700 left-[25%] top-[60%] animate-spin-slow"></div>
            <div className="absolute w-10 h-10 border border-gray-600 left-[80%] top-[70%] animate-spin-reverse"></div>
            <div className="absolute w-6 h-6 border border-gray-700 left-[50%] top-[40%] animate-spin-slow"></div>
            <div className="absolute w-12 h-12 border border-gray-600 left-[10%] top-[80%] animate-spin-reverse"></div>
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black/40"></div>

          {/* Pulsing circles */}
          <div className="absolute inset-0">
            <div className="absolute w-48 h-48 border border-gray-600 rounded-full left-1/2 top-1/2 -ml-24 -mt-24 animate-pulse-slow"></div>
            <div className="absolute w-72 h-72 border border-gray-700 rounded-full left-1/2 top-1/2 -ml-36 -mt-36 animate-pulse-slower"></div>
            <div className="absolute w-96 h-96 border border-gray-800 rounded-full left-1/2 top-1/2 -ml-48 -mt-48 animate-pulse-slowest"></div>
          </div>

          {/* Central rotating element */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-32 h-32 border-2 border-gray-600 transform rotate-45 animate-spin-very-slow"></div>
          </div>

          {/* Static particles */}
          <div className="absolute inset-0">
            <div className="absolute w-1 h-1 bg-white rounded-full left-[20%] top-[30%] opacity-60"></div>
            <div className="absolute w-1 h-1 bg-white rounded-full left-[80%] top-[20%] opacity-40"></div>
            <div className="absolute w-1 h-1 bg-white rounded-full left-[60%] top-[70%] opacity-50"></div>
            <div className="absolute w-1 h-1 bg-white rounded-full left-[30%] top-[80%] opacity-30"></div>
            <div className="absolute w-1 h-1 bg-white rounded-full left-[70%] top-[50%] opacity-70"></div>
            <div className="absolute w-1 h-1 bg-white rounded-full left-[40%] top-[25%] opacity-45"></div>
            <div className="absolute w-1 h-1 bg-white rounded-full left-[85%] top-[60%] opacity-55"></div>
            <div className="absolute w-1 h-1 bg-white rounded-full left-[15%] top-[70%] opacity-35"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
