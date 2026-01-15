"use client"


export const dynamic = "force-dynamic"


import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"


export default function ResetPasswordPage() {
  const router = useRouter()
  const params = useSearchParams()


  // We get the email passed from the verification screen
  const email = params.get("email") || ""


  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")


    if (password.length < 6) {
      setError("Password must be at least 6 characters.")
      return
    }


    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }


    setLoading(true)


    try {
      const requestBody = {
        email,
        password
      }


      const response = await fetch(
        "https://staging.oxygen.siskusserver.com/api/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      )


      if (!response.ok) {
        throw new Error("Password reset failed")
      }


      router.push("/login?reset=success")
    } catch (err: any) {
      setError(err.message || "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <Card className="w-full max-w-sm p-5 shadow-[0_15px_40px_rgba(0,0,0,0.25)]">
       
        <h1 className="text-xl sm:text-2xl font-bold text-[#003262] mb-2 text-center">
          Create New Password
        </h1>
        <p className="text-sm text-gray-600 text-center mb-4">
          Updating password for <strong>{email || "your account"}</strong>
        </p>


        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
          <Label htmlFor="password">New Password</Label>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
  <button
    type="button"
    className="absolute right-2 top-1/2 -translate-y-[45%] text-gray-500"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
  </button>
</div>




<div className="relative">
  <Label htmlFor="confirmPassword">Confirm Password</Label>
  <Input
    id="confirmPassword"
    type={showConfirmPassword ? "text" : "password"}
    placeholder="Repeat new password"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    required
  />
  <button
    type="button"
    className="absolute right-2 top-1/2 -translate-y-[45%] text-gray-500"
    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
  >
    {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
  </button>
</div>




          {error && <p className="text-red-600 text-sm">{error}</p>}


          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#003262] hover:bg-[#003262]"
          >
            {loading ? "Saving..." : "Save New Password"}
          </Button>
        </form>


        <div className="mt-4 text-center">
          <Link href="/login" className="text-[#003262] hover:underline text-sm">
            ← Back to Login
          </Link>
        </div>


      </Card>
    </div>
  )
}
