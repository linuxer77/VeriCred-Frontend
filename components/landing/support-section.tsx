"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { LifeBuoy } from 'lucide-react'

export default function SupportSection() {
  const { toast } = useToast()
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [pending, setPending] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setPending(true)
    // In a real app, POST to your backend support endpoint.
    await new Promise((r) => setTimeout(r, 700))
    setPending(false)
    toast({
      title: "Support request sent",
      description: "We’ll get back to you via email shortly.",
    })
    setForm({ name: "", email: "", message: "" })
  }

  return (
    <section id="support" className="relative py-20 border-t border-gray-800/80">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-10 right-10 h-48 w-48 rounded-full bg-purple-600/10 blur-3xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-800/60 bg-gray-900/40 px-3 py-1 text-xs text-gray-300">
            <LifeBuoy className="h-3.5 w-3.5 text-purple-400" />
            Support
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">We’re here to help</h2>
          <p className="mt-3 text-gray-400">
            Have a question about integration, verification, or credentials? Drop us a message.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="border-gray-800 bg-gradient-to-b from-gray-950 to-gray-900">
            <CardHeader>
              <CardTitle>Contact support</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm text-gray-300 mb-1">Name</label>
                    <Input
                      id="name"
                      placeholder="Jane Doe"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="bg-black border-gray-800"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm text-gray-300 mb-1">Email</label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="jane@example.com"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className="bg-black border-gray-800"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm text-gray-300 mb-1">Message</label>
                  <Textarea
                    id="message"
                    placeholder="How can we help?"
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="bg-black border-gray-800 min-h-[140px]"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={pending}
                    className="bg-white text-black hover:bg-gray-100"
                  >
                    {pending ? "Sending..." : "Send message"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
