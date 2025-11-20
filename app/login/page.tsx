"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // TODO: Integrate with actual authentication API
      // For now, simulate login
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Store user session (would be JWT token in production)
      localStorage.setItem("userToken", "mock-token")
      router.push("/my-orders")
    } catch (err) {
      setError("Invalid email or password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 sm:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.25)]">
        <div className="mb-2 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#003262] mb-2">Welcome Back</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 placeholder:text-sm sm:placeholder:text-base"
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 placeholder:text-sm sm:placeholder:text-base"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div className="flex items-center justify-between text-sm">
            <Link href="/forgot-password" className="text-[#003262] hover:underline">
              Forgot Password?
            </Link>
          </div>

          <Button type="submit" className="w-full bg-[#003262] hover:bg-[#003262] active:bg-[#003262]" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="mt-2 text-center text-sm">
          <p className="text-gray-700">
            Don't have an account?{" "}
            <Link href="/signup" className="text-[#003262] hover:underline font-semibold">
              Sign Up
            </Link>
          </p>
        </div>

        <div className="mt-2">
          <Link href="/" className="text-[#003262] hover:underline text-sm flex items-center justify-center">
            ← Back to Home
          </Link>
        </div>
      </Card>
    </div>
  )
}
