"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"

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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const namibiaMobileRegex = /^(?:\+264|0)(81|83|84|85)\d{7}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Required fields
    if (!formData.fullName || !formData.phone || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all required fields.")
      return
    }

    
  // Validate phone number
  if (!namibiaMobileRegex.test(formData.phone)) {
    setError("Please enter a valid Namibian mobile number (081, 083, 084, 085).");
    return;
  }

  // Validate email if provided
  if (formData.email && !emailRegex.test(formData.email)) {
    setError("Please enter a valid email address.");
    return;
  }

  // Check password match
  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

    setLoading(true)

    try {
    // **Send request to staging API**
    const requestBody = {
      username: formData.fullName, // map fullName -> username
      cellphone: formData.phone,
      email: formData.email || "",  // optional
      password: formData.password
    }

    const response = await fetch("https://staging.oxygen.siskusserver.com/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody)
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || "Registration failed")
    }

    // After successful registration, redirect to login
    router.push("/login")

  } catch (err: any) {
    setError(err.message || "Failed to create account. Please try again.")
  } finally {
    setLoading(false)
  }
};

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
              placeholder="FirstName LastName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="mt-1 text-sm sm:text-base placeholder:text-sm sm:placeholder:text-sm"
            />
          </div>

          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 placeholder:text-sm sm:placeholder:text-sm"
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter your cellphone number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="mt-1 text-sm sm:text-base placeholder:text-sm sm:placeholder:text-sm"
            />
          </div>

          <div className="relative">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 text-sm sm:text-base placeholder:text-sm sm:placeholder:text-base"
            />
            <button
    type="button"
    className="absolute right-2 top-[50%] -translate-y-[10%] sm:-translate-y-[45%] text-gray-450"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
  </button>
          </div>

          <div className="relative">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="********"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="mt-1 text-sm sm:text-base placeholder:text-sm sm:placeholder:text-base"
            />
            <button
    type="button"
    className="absolute right-2 top-1/2 -translate-y-[10%] sm:-translate-y-[45%] text-gray-450"
    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
  >
    {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
  </button>
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
