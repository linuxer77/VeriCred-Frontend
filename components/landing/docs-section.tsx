"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Layers, ShieldCheck, Code2, Cpu, GitBranch, Compass } from 'lucide-react'

export default function DocsSection() {
return (
  <section id="docs" className="relative py-20 border-t border-gray-800/80">
    <div className="absolute inset-0 pointer-events-none">
      <motion.div
        className="absolute -top-24 right-10 h-40 w-40 rounded-full bg-purple-600/10 blur-3xl"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
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
          <BookOpen className="h-3.5 w-3.5 text-purple-400" />
          Documentation
        </span>
        <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">
          Learn how VeriCred works
        </h2>
        <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
          Dive into the core concepts, features, and technology stack powering decentralized digital credentials.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overview Card */}
        <motion.div
          className="col-span-1"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-gray-800 bg-gradient-to-b from-gray-950 to-gray-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-purple-400" />
                Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-300 leading-relaxed">
              <p>
                VeriCred is a cutting-edge platform revolutionizing academic and professional credentialing.
                It leverages blockchain technology (NFTs on Polygon) for secure, transparent, and instantly
                verifiable digital records of achievements, empowering individuals and streamlining processes
                for institutions and verifiers.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Benefits Card */}
        <motion.div
          className="col-span-1"
          initial={{ opacity: 0, y: 18, delay: 0.1 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <Card className="border-gray-800 bg-gradient-to-b from-gray-950 to-gray-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-purple-400" />
                Key Features & Benefits
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-300 leading-relaxed space-y-2">
              <ul className="list-disc list-inside space-y-1">
                <li>Forgery-Proof Credentials: NFTs signed by verified issuers.</li>
                <li>Instant & Global Verification: Real-time validation via blockchain.</li>
                <li>Individual Ownership: Credentials managed in personal digital wallets.</li>
                <li>Reduced Admin Burden: Streamlined issuance for institutions.</li>
                <li>Enhanced Portability: Easy sharing of digital achievements.</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tech Stack Card */}
        <motion.div
          className="col-span-1"
          initial={{ opacity: 0, y: 18, delay: 0.2 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="border-gray-800 bg-gradient-to-b from-gray-950 to-gray-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="h-5 w-5 text-purple-400" />
                Technology Stack
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-300 leading-relaxed space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                <div>
                  <span className="text-gray-400">Blockchain:</span> Polygon
                </div>
                <div>
                  <span className="text-gray-400">Smart Contracts:</span> Solidity (ERC-721, IssuerRegistry, RevocationRegistry)
                </div>
                <div>
                  <span className="text-gray-400">Backend:</span> Golang
                </div>
                <div>
                  <span className="text-gray-400">Frontend:</span> React / Next.js
                </div>
                <div>
                  <span className="text-gray-400">Database:</span> PostgreSQL
                </div>
                <div>
                  <span className="text-gray-400">Storage:</span> IPFS / Pinata
                </div>
                <div className="sm:col-span-2">
                  <span className="text-gray-400">Wallets:</span> MetaMask, WalletConnect
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Accordion for deeper docs */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left">What makes credentials forgery-proof?</AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Each credential is minted as an ERC-721 NFT by a verified issuer. The issuer&apos;s address and the token&apos;s
              immutable metadata allow independent verification against the blockchain ledger.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left">How does verification work?</AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Verifiers can inspect on-chain ownership, token metadata, and issuer registry entries to validate authenticity
              and revocation status in real time.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left">How do institutions integrate?</AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Institutions integrate via our backend APIs and smart contract interfaces, enabling batch issuance, revocation,
              and audit trails. Explore our SDKs and reference implementations.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>

      <motion.div
        className="mt-10 flex items-center justify-center gap-4"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <a
          href="#explore"
          className="inline-flex items-center gap-2 rounded-md border border-gray-800 bg-gray-900/50 px-4 py-2 text-sm hover:bg-gray-900 transition-colors"
        >
          <Compass className="h-4 w-4 text-purple-400" />
          Explore
        </a>
        <a
          href="#support"
          className="inline-flex items-center gap-2 rounded-md border border-gray-800 bg-gray-900/50 px-4 py-2 text-sm hover:bg-gray-900 transition-colors"
        >
          <Code2 className="h-4 w-4 text-purple-400" />
          Get Support
        </a>
        <a
          href="#docs"
          className="inline-flex items-center gap-2 rounded-md border border-gray-800 bg-gray-900/50 px-4 py-2 text-sm hover:bg-gray-900 transition-colors"
        >
          <GitBranch className="h-4 w-4 text-purple-400" />
          API & Quickstart
        </a>
      </motion.div>
    </div>
  </section>
)
}
