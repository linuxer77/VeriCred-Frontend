"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, CircleHelp } from 'lucide-react'
import { motion } from "framer-motion"

type Result = {
  type: "user" | "university"
  address: string
  name?: string
}

export default function AddressSearch() {
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<Result[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function onSearch(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResults(null)

    try {
      // If you have a backend, you can wire it here:
      // const res = await fetch(`http://localhost:8080/search?address=${encodeURIComponent(query)}`)
      // const data = await res.json()

      // Demo: if it looks like an address, show sample results
      const looksLikeAddress = /^0x[a-fA-F0-9]{40}$/.test(query.trim())
      await new Promise((r) => setTimeout(r, 600))
      if (looksLikeAddress) {
        setResults([
          { type: "user", address: query.trim(), name: "Sample Student" },
          { type: "university", address: "0x1234567890abcdef1234567890abcdef12345678", name: "Sample University" },
        ])
      } else {
        setResults([])
      }
    } catch (err: any) {
      setError(err?.message ?? "Search failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="space-y-4">
      <form onSubmit={onSearch} className="flex flex-col sm:flex-row gap-3">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by wallet address (0x...)"
          className="bg-black border-gray-800 text-white placeholder:text-gray-600"
          required
        />
        <Button type="submit" disabled={loading} className="bg-white text-black hover:bg-gray-100">
          <Search className="h-4 w-4 mr-2" />
          {loading ? "Searching..." : "Search"}
        </Button>
      </form>

      <Card className="border-gray-800 bg-gradient-to-b from-gray-950 to-gray-900">
        <CardHeader>
          <CardTitle>Results</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-gray-300">
          {error && <div className="text-red-400">{error}</div>}
          {!error && results === null && (
            <div className="flex items-center gap-2 text-gray-400">
              <CircleHelp className="h-4 w-4" />
              Enter a wallet address to look up a user or university.
            </div>
          )}
          {!error && results && results.length === 0 && (
            <div className="text-gray-400">No results found.</div>
          )}
          {!error && results && results.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {results.map((r, idx) => (
                <motion.div
                  key={`${r.address}-${idx}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * idx }}
                  className="rounded-md border border-gray-800 bg-gray-950 p-3"
                >
                  <div className="text-gray-400 uppercase text-xs tracking-wide">{r.type}</div>
                  <div className="font-medium text-white">{r.name ?? "—"}</div>
                  <div className="text-xs text-gray-500 break-all">{r.address}</div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  )
}
