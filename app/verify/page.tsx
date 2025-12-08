"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function ResetCodeVerificationPage() {
  const router = useRouter()
  const params = useSearchParams()

  // Retrieve email from forgot password redirect
  const email = params.get("email") || ""

  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Your backend returns a 6-digit password
    if (!/^\d{6}$/.test(code)) {
      setError("Please enter the 6-digit code sent to your email.")
      return
    }

    // Store the temporary password for next step
    localStorage.setItem("tempResetCode", code)
    localStorage.setItem("resetEmail", email)

    router.push(`/reset-password?email=${encodeURIComponent(email)}`);
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <Card className="w-full max-w-sm p-5 shadow-[0_15px_40px_rgba(0,0,0,0.25)]">
        
        <div className="mb-6">
  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
  </div>
 <div className="flex flex-col items-center gap-1">
  <h1 className="text-2xl font-bold text-[#003262]">Check Your Email</h1>
  <p className="text-gray-600 text-center">
    We've sent a 6-digit reset code to <strong>{email}</strong>
  </p>
</div>

</div>


        <form onSubmit={handleSubmit} className="space-y-3 mt-3">
          <div>
            <Label htmlFor="code">Reset Code</Label>
            <Input
              id="code"
              name="code"
              type="text"
              maxLength={6}
              placeholder="••••••"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="mt-1 text-center tracking-widest text-lg"
              required
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#003262] hover:bg-[#003262]"
          >
            Continue
          </Button>
        </form>

        <div className="mt-3 text-center text-sm">
          <Link href="/forgot-password" className="text-[#003262] hover:underline">
            Resend Code
          </Link>
        </div>

        <div className="mt-2">
          <Link
            href="/login"
            className="text-[#003262] hover:underline text-sm flex items-center justify-center"
          >
            ← Back to Login
          </Link>
        </div>

      </Card>
    </div>
  )
}
