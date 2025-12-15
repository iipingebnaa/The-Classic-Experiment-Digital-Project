"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const baseUrl = "https://staging.oxygen.siskusserver.com/api"; // staging URL

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate required fields
    if (!username || !password) {
      setError("Please fill in all required fields.")
      return
    }

    setLoading(true)

    try {
    // API call
    const baseUrl = "https://staging.oxygen.siskusserver.com/api"; // staging URL
    const response = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username.trim(),  // API expects "username"
        password: password.trim()
      }),
    });

    const data = await response.json();

    if (!data.success) {
    setError(data.message || "Username or password is incorrect");
    return;
  }

  
    //document.cookie = `userToken=${data.token}; path=/; secure; samesite=strict`; //secure cookie storage
    // TEMPORARY: Mobile testing only — remove secure flag
    document.cookie = `userToken=${data.token}; path=/; samesite=strict`;


   // router.push("/my-orders");
const params = new URLSearchParams(window.location.search);
const redirectTo = params.get("redirect") || "/my-orders"; // default if no redirect
router.push(redirectTo);


  } catch (err) {
    setError("Username or password is incorrect");
  } finally {
    setLoading(false);
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
            <Label htmlFor="phone">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="FirstName LastName"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 text-sm sm:text-base placeholder:text-sm sm:placeholder:text-base"
            />
          </div>

          <div className="relative">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"} // toggles visibility
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 text-sm sm:text-baseplaceholder:text-sm sm:placeholder:text-base"
            />
            <button
              type="button"
              className="absolute right-2 top-[50%] -translate-y-[10%] sm:-translate-y-[40%] text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>

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
