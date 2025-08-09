"use client"

import { useEffect, useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Copy, Search, University, User, Waypoints } from "lucide-react"
import { motion } from "framer-motion"

type ResultType = "user" | "university"

type Result = {
  type: ResultType
  address: string
  name: string
  verified: boolean
}

export default function AddressSearch() {
  const [query, setQuery] = useState("")
  const [debounced, setDebounced] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<Result[]>([])

  // debounce
  useEffect(() => {
    const t = setTimeout(() => setDebounced(query.trim()), 300)
    return () => clearTimeout(t)
  }, [query])

  useEffect(() => {
    if (!debounced) {
      setResults([])
      return
    }
    setLoading(true)
    // Mock: classify address based on last hex nibble
    setTimeout(() => {
      const mock: Result[] = [
        {
          type: "user",
          address: debounced,
          name: "0x User",
          verified: Math.random() > 0.4,
        },
        {
          type: "university",
          address: "0x1234567890abcdef1234567890abcdef12345678",
          name: "Example University",
          verified: true,
        },
      ]
      setResults(mock)
      setLoading(false)
    }, 500)
  }, [debounced])

  const isLikelyAddress = useMemo(() => /^0x[a-fA-F0-9]{6,}$/.test(query.trim()), [query])

  function copy(value: string) {
    navigator.clipboard.writeText(value)
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-white flex items-center gap-2">
          <Search className="h-4 w-4" />
          Search by Address
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="0x…"
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
          />
          <Button
            disabled={!isLikelyAddress || loading}
            className="bg-white text-black hover:bg-gray-100"
            onClick={() => setDebounced(query.trim())}
          >
            {loading ? "Searching…" : "Search"}
          </Button>
        </div>
        {!isLikelyAddress && query && <p className="text-xs text-gray-500">Enter a valid address starting with 0x</p>}

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {loading && (
            <>
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="h-24 rounded-md bg-gray-800 animate-pulse" />
              ))}
            </>
          )}
          {!loading &&
            results.map((r, i) => (
              <motion.div
                key={r.type + i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Card className="bg-gray-900/70 border-gray-800 hover:border-gray-700 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/40 to-purple-300/20 flex items-center justify-center">
                          {r.type === "user" ? (
                            <User className="h-5 w-5 text-purple-200" />
                          ) : (
                            <University className="h-5 w-5 text-purple-200" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-white font-medium">
                              {r.type === "user" ? "User" : "University"} • {r.name}
                            </p>
                            <Badge
                              className={
                                r.verified
                                  ? "bg-green-900/30 text-green-300 border-green-800"
                                  : "bg-gray-800 text-gray-400 border-gray-700"
                              }
                            >
                              {r.verified ? "Verified" : "Unverified"}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-400 font-mono mt-1">{r.address}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                          onClick={() => copy(r.address)}
                          title="Copy address"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                          onClick={() =>
                            alert(`${r.type === "user" ? "User" : "University"} profile is not implemented yet.`)
                          }
                        >
                          <Waypoints className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
        </div>
      </CardContent>
    </Card>
  )
}
