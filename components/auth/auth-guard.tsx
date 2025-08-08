"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { getStoredToken, isJwtValid } from "./jwt"

type AuthGuardProps = {
  children: React.ReactNode
}

/**
 * Client-side guard that ensures a valid JWT is available, otherwise redirects to "/".
 * Use this to protect authenticated pages like "/home".
 */
export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter()

  useEffect(() => {
    const token = getStoredToken()
    if (!isJwtValid(token)) {
      router.replace("/")
    }
  }, [router])

  return <>{children}</>
}
