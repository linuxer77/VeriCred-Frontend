export type DecodedJwt = {
  exp?: number
  iat?: number
  [key: string]: unknown
}

// Base64URL decode helper
function b64urlDecode(input: string): string {
  const pad = input.length % 4 === 0 ? "" : "=".repeat(4 - (input.length % 4))
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/") + pad
  if (typeof window !== "undefined" && typeof window.atob === "function") {
    return window.atob(base64)
  }
  // Node fallback
  return Buffer.from(base64, "base64").toString("binary")
}

export function decodeJwtPayload<T extends Record<string, unknown> = DecodedJwt>(token: string): T | null {
  try {
    const [, payload] = token.split(".")
    if (!payload) return null
    const json = b64urlDecode(payload)
    return JSON.parse(json) as T
  } catch {
    return null
  }
}

export function isJwtValid(token: string | null | undefined): boolean {
  if (!token) return false
  const payload = decodeJwtPayload(token)
  if (!payload) return false
  // If an exp claim exists, ensure it's in the future
  if (typeof payload.exp === "number") {
    const now = Math.floor(Date.now() / 1000)
    if (payload.exp <= now) return false
  }
  return true
}

export function getStoredToken(): string | null {
  try {
    const raw = localStorage.getItem("vericred_wallet")
    if (!raw) return null
    const parsed = JSON.parse(raw) as { token?: string }
    return parsed?.token ?? null
  } catch {
    return null
  }
}
