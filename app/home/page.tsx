"use client"

import AuthGuard from "@/components/auth/auth-guard"
import AddressSearch from "@/components/home/address-search"
import VerificationHub from "@/components/home/verification-hub"
import { motion } from "framer-motion"

export default function HomePage() {
  return (
    <AuthGuard>
      <main className="min-h-screen bg-black text-white">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <motion.h1
            className="text-3xl sm:text-4xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome home
          </motion.h1>
          <motion.p
            className="text-gray-400 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Search addresses and manage your verification status.
          </motion.p>

          <div className="mt-8 grid grid-cols-1 gap-8">
            <AddressSearch />
            <VerificationHub />
          </div>
        </section>
      </main>
    </AuthGuard>
  )
}
