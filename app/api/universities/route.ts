import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    
    // In a real application, you would:
    // 1. Verify the JWT token
    // 2. Query your database for all universities
    // 3. Return the university data

    // Fetch universities from your actual backend
    try {
      const backendResponse = await fetch('http://localhost:8080/universities', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      if (!backendResponse.ok) {
        console.error('Backend responded with status:', backendResponse.status)
        return NextResponse.json({ error: "Failed to fetch from backend" }, { status: backendResponse.status })
      }

      const universities = await backendResponse.json()
      console.log(universities)
      return NextResponse.json({ universities })
    } catch (backendError) {
      console.error("Error calling backend:", backendError)
      return NextResponse.json({ error: "Failed to connect to backend" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error fetching universities:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 