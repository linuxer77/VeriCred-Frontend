"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Sparkles, Globe2, FolderKanban, Share2, Shield } from 'lucide-react'

const features = [
  {
    icon: Award,
    title: "Credentials as NFTs",
    text:
      "Credentials are minted as ERC-721 tokens on Polygon. Ownership resides in the recipient’s wallet.",
  },
  {
    icon: Shield,
    title: "Issuer Registry",
    text:
      "Verified institutions are recorded on-chain to prevent spoofing and enable trustless verification.",
  },
  {
    icon: Globe2,
    title: "Instant Verification",
    text:
      "Third parties validate authenticity in real time by checking on-chain data and metadata.",
  },
  {
    icon: FolderKanban,
    title: "Portfolio & Collections",
    text:
      "Group credentials into collections and showcase them publicly or privately.",
  },
  {
    icon: Share2,
    title: "Portability",
    text:
      "Share links or QR codes for verifiable viewing—no centralized gatekeepers.",
  },
  {
    icon: Sparkles,
    title: "Revocation & Updates",
    text:
      "Revocation registry ensures invalidated credentials are transparently visible to verifiers.",
  },
]

export default function ExploreSection() {
  return (
    <section id="explore" className="relative py-20 border-t border-gray-800/80">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -bottom-20 left-10 h-48 w-48 rounded-full bg-purple-700/10 blur-3xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-800/60 bg-gray-900/40 px-3 py-1 text-xs text-gray-300">
            <Sparkles className="h-3.5 w-3.5 text-purple-400" />
            Explore
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">
            Build with the VeriCred stack
          </h2>
          <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
            Polygon + Solidity contracts, a Golang backend, and a Next.js frontend. Store metadata on IPFS / Pinata.
            Connect via MetaMask or WalletConnect for secure, seamless experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {features.map((f, idx) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 * idx }}
            >
              <Card className="border-gray-800 bg-gradient-to-b from-gray-950 to-gray-900 h-full hover:shadow-[0_0_0_1px_rgba(168,85,247,0.25)] transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <f.icon className="h-4 w-4 text-purple-400" />
                    {f.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-300">
                  <p>{f.text}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-gray-900 border border-gray-800 text-gray-300">
                      Polygon
                    </Badge>
                    <Badge variant="secondary" className="bg-gray-900 border border-gray-800 text-gray-300">
                      ERC-721
                    </Badge>
                    <Badge variant="secondary" className="bg-gray-900 border border-gray-800 text-gray-300">
                      IPFS
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Card className="border-gray-800 bg-gradient-to-b from-gray-950 to-gray-900">
            <CardHeader>
              <CardTitle>Sample Overview</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-300 leading-relaxed">
              VeriCred: Decentralized Digital Credentials. It leverages NFTs on Polygon for secure and instantly
              verifiable records of achievements, empowering individuals and streamlining processes for institutions
              and verifiers.
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gradient-to-b from-gray-950 to-gray-900">
            <CardHeader>
              <CardTitle>Tech Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-300 leading-relaxed">
              Blockchain: Polygon. Smart Contracts: Solidity (ERC-721, IssuerRegistry, RevocationRegistry). Backend:
              Golang. Frontend: React / Next.js. Database: PostgreSQL. Storage: IPFS / Pinata. Wallets: MetaMask,
              WalletConnect.
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
