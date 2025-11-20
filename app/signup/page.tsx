"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignUpPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)

    try {
      // TODO: Integrate with actual authentication API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      localStorage.setItem("userToken", "mock-token")
      router.push("/my-orders")
    } catch (err) {
      setError("Failed to create account. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <Card className="w-full max-w-sm p-5 shadow-[0_15px_40px_rgba(0,0,0,0.25)]">
  <div className="mb-2 text-center">
    <h1 className="text-xl sm:text-2xl font-bold text-[#003262] mb-1">
      Create Account
    </h1>
  </div>

  <form onSubmit={handleSubmit} className="space-y-2">
    <div>
      <Label htmlFor="fullName">Full Name</Label>
      <Input
        id="fullName"
        name="fullName"
        type="text"
        placeholder="John Doe"
        value={formData.fullName}
        onChange={handleChange}
        required
        className="mt-1 placeholder:text-sm sm:placeholder:text-base"
      />
    </div>

    <div>
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        name="email"
        type="email"
        placeholder="your.email@example.com"
        value={formData.email}
        onChange={handleChange}
        required
        className="mt-1 placeholder:text-sm sm:placeholder:text-base"
      />
    </div>

    <div>
      <Label htmlFor="phone">Phone Number</Label>
      <Input
        id="phone"
        name="phone"
        type="tel"
        placeholder="+264 81 234 5678"
        value={formData.phone}
        onChange={handleChange}
        required
        className="mt-1 placeholder:text-sm sm:placeholder:text-base"
      />
    </div>

    <div>
      <Label htmlFor="password">Password</Label>
      <Input
        id="password"
        name="password"
        type="password"
        placeholder="********"
        value={formData.password}
        onChange={handleChange}
        required
        className="mt-1 placeholder:text-sm sm:placeholder:text-base"
      />
    </div>

    <div>
      <Label htmlFor="confirmPassword">Confirm Password</Label>
      <Input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        placeholder="********"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
        className="mt-1 placeholder:text-sm sm:placeholder:text-base"
      />
    </div>

    {error && <p className="text-red-600 text-sm">{error}</p>}

    <Button
      type="submit"
      className="w-full bg-[#003262] hover:bg-[#003262] active:bg-[#003262]"
      disabled={loading}
    >
      {loading ? "Creating..." : "Sign Up"}
    </Button>
  </form>

  <div className="mt-2 text-center text-sm">
    <p className="text-gray-700">
      Already have an account?{" "}
      <Link href="/login" className="text-[#003262] hover:underline font-semibold">
        Login
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
