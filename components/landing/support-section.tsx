"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { LifeBuoy, Send } from "lucide-react"
import { useState } from "react"

export default function SupportSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API
    await new Promise((r) => setTimeout(r, 1000))
    setIsSubmitting(false)
    ;(e.currentTarget as HTMLFormElement).reset()
    alert("Support request sent! We’ll get back to you shortly.")
  }

  return (
    <section id="support" className="relative py-16 md:py-24 border-t border-gray-800/80">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 left-10 h-56 w-56 rounded-full bg-purple-700/10 blur-3xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-800/60 bg-gray-900/40 px-3 py-1 text-xs text-gray-300 mb-4">
            <LifeBuoy className="h-4 w-4 text-purple-400" />
            Support
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">We’re here to help</h2>
          <p className="text-gray-400 mt-4">
            Reach out to our team. Check our FAQs or send us a message — we typically respond within 1–2 business days.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* FAQs */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-gray-900/70 border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-white">FAQs</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="a1" className="border-b border-gray-800">
                    <AccordionTrigger className="text-gray-200">How do I verify my university?</AccordionTrigger>
                    <AccordionContent className="text-gray-400">
                      Use the Verification Hub on /home to start a verification request as a university. Submit required
                      details and await review.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="a2" className="border-b border-gray-800">
                    <AccordionTrigger className="text-gray-200">What chains do you support?</AccordionTrigger>
                    <AccordionContent className="text-gray-400">
                      Credentials are minted as ERC-721 NFTs on Polygon for low-cost and fast confirmations.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="a3">
                    <AccordionTrigger className="text-gray-200">Can I revoke a credential?</AccordionTrigger>
                    <AccordionContent className="text-gray-400">
                      Authorized issuers can revoke via the RevocationRegistry smart contract. Revocations are
                      immutable, transparent on-chain events.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gray-900/70 border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-white">Contact Support</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-400">Name</label>
                    <Input className="mt-1 bg-gray-800 border-gray-700 text-white" placeholder="Jane Doe" required />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400">Email</label>
                    <Input
                      className="mt-1 bg-gray-800 border-gray-700 text-white"
                      type="email"
                      placeholder="jane@example.com"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs text-gray-400">Message</label>
                    <Textarea
                      className="mt-1 bg-gray-800 border-gray-700 text-white"
                      rows={5}
                      placeholder="Tell us how we can help…"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Button type="submit" disabled={isSubmitting} className="bg-white text-black hover:bg-gray-100">
                      <Send className="h-4 w-4 mr-2" />
                      {isSubmitting ? "Sending…" : "Send message"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
