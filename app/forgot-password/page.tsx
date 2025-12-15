"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      alert("Please enter your email.");
      return;
   }
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
   }

    setLoading(true)
    try {
      // Construct the local request body
      const requestBody = { email };

      // Example API call to send reset code
      const response = await fetch("https://staging.oxygen.siskusserver.com/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        throw new Error("Failed to send reset code")
      }
      // Navigate to verification page after successful request
       router.push(`/verify?email=${encodeURIComponent(email)}`)
    } catch (err: any) {
      alert(err.message || "Failed to send reset code. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  /*if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-6 sm:p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-[#003262] mb-2">Check Your Phone</h1>
            <p className="text-gray-600">
              We've sent a 6-digit reset code to <strong>{email}</strong>
            </p>
          </div>

          <Link href="/login">
            <Button className="w-full bg-[#003262] hover:bg-[#003262]">Back to Login</Button>
          </Link>
        </Card>
      </div>
    )
  }*/

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 sm:p-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#003262] mb-2">Forgot Password?</h1>
          <p className="text-gray-600">Enter your email address to reset your password</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email Address</Label>
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

          <Button type="submit" className="w-full bg-[#003262] hover:bg-[#003262]" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Code"}
          </Button>
        </form>

        <div className="mt-6">
          <Link href="/login" className="text-[#003262] hover:underline text-sm flex items-center justify-center">
            ← Back to Login
          </Link>
        </div>
      </Card>
    </div>
  )
}
