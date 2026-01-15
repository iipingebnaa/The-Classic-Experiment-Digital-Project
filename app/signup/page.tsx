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

  // removed unused states; replaced with focused/valid flags
  const [passwordValid, setPasswordValid] = useState<boolean | null>(null) // null = neutral (no color)
  const [confirmValid, setConfirmValid] = useState<boolean | null>(null)

  const [isPasswordFocused, setIsPasswordFocused] = useState(false)
  const [isConfirmFocused, setIsConfirmFocused] = useState(false)

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const namibiaMobileRegex = /^(?:\+264|0)(81|83|84|85)\d{7}$/
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  // helper: validate password rules
  const checkPasswordValidity = (value: string) => {
    const errors: string[] = []
    if (value.length < 8) errors.push("length")
    if (!/[A-Z]/.test(value)) errors.push("upper")
    if (!/[a-z]/.test(value)) errors.push("lower")
    if (!/\d/.test(value)) errors.push("digit")
    if (!/[^a-zA-Z0-9]/.test(value)) errors.push("special")
    return errors.length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // update form data
    setFormData((prev) => ({ ...prev, [name]: value }))

    // special logic for password field
    if (name === "password") {
      const valid = checkPasswordValidity(value)
      // only set the visual validity while focused (so we don't show green after blur)
      if (isPasswordFocused) {
        setPasswordValid(valid)
      } else {
        // if not focused, keep neutral
        setPasswordValid(null)
      }

      // if confirm already has value, update confirm validity live
      if (formData.confirmPassword) {
        const confirmMatches = value === formData.confirmPassword
        if (isConfirmFocused) {
          setConfirmValid(confirmMatches)
        } else {
          setConfirmValid(null)
        }
      }
    }

    // confirm password live-check
    if (name === "confirmPassword") {
      const matches = value === formData.password
      if (isConfirmFocused) {
        setConfirmValid(matches)
      } else {
        setConfirmValid(null)
      }
    }
  }

  // focus/blur handlers so we only show color while user is actively editing
  const handlePasswordFocus = () => {
    setIsPasswordFocused(true)
    // validate immediately on focus with current value
    setPasswordValid(checkPasswordValidity(formData.password))
  }
  const handlePasswordBlur = () => {
    setIsPasswordFocused(false)
    // remove the green/red after blur (neutral)
    setPasswordValid(null)
  }

  const handleConfirmFocus = () => {
    setIsConfirmFocused(true)
    setConfirmValid(formData.confirmPassword === formData.password)
  }
  const handleConfirmBlur = () => {
    setIsConfirmFocused(false)
    setConfirmValid(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Required fields
    if (!formData.fullName || !formData.phone || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all required fields.")
      return
    }

    // Remove spaces from phone number
    const sanitizedPhone = formData.phone.replace(/\s+/g, "")
    formData.phone = sanitizedPhone

    // Validate phone number
    if (!namibiaMobileRegex.test(formData.phone)) {
      setError("Please enter a valid cellphone number.")
      return
    }

    // Validate email if provided
    if (formData.email && !emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.")
      return
    }

    // Password rule check (server-side should be authoritative; we re-check here)
    if (!checkPasswordValidity(formData.password)) {
      setError("Password does not meet the required complexity.")
      return
    }

    // Check password match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    setLoading(true)

    
    try {
      // **Send request to staging API**
      const requestBody = {
        username: formData.fullName, // map fullName -> username
        cellphone: formData.phone,
        email: formData.email || "", // optional
        password: formData.password,
      }

      const response = await fetch("https://staging.oxygen.siskusserver.com/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
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
    
/*
    try {
  // MOCK fetch for UI testing
  const response = await fetch("/mock/register.json")
  const data = await response.json()

  if (!data.success) {
    setError(data.message || "Registration failed")
    return
  }

  // simulate redirect after successful registration
  router.push("/login")
} catch (err: any) {
  setError(err.message || "Failed to create account. Please try again.")
} finally {
  setLoading(false)
}
  */

  }


  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <Card className="w-full max-w-sm p-5 shadow-[0_15px_40px_rgba(0,0,0,0.25)]">
        <div className="mb-2 text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-[#003262] mb-1">Create Account</h1>
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

          {/* PASSWORD */}
          <div className="relative">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
              required
              minLength={8}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}"
              // Border color while typing/focused: red if invalid, green if valid, otherwise default
              className={`mt-1 text-sm sm:text-base placeholder:text-sm sm:placeholder:text-base
                ${isPasswordFocused && passwordValid === false ? "border-red-600" : ""}
                ${isPasswordFocused && passwordValid === true ? "border-green-600 text-green-700" : ""}`}
            />
            <button
              type="button"
              className="absolute right-2 top-[50%] -translate-y-[10%] sm:-translate-y-[40%] text-gray-450"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>

          {/* when invalid while focused show brief single-line message under input (keeps layout stable) */}
            {isPasswordFocused && passwordValid === false && (
              <p className="text-sm mt-1 text-red-600">
                Password must be at least 8 characters, include an uppercase & lower case, a number and a special character.
              </p>
            )}

          {/* CONFIRM PASSWORD */}
          <div className="relative">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="********"
              value={formData.confirmPassword}
              onChange={handleChange}
              onFocus={handleConfirmFocus}
              onBlur={handleConfirmBlur}
              required
              className={`mt-1 text-sm sm:text-base placeholder:text-sm sm:placeholder:text-base
                ${isConfirmFocused && confirmValid === false ? "border-red-600" : ""}
                ${isConfirmFocused && confirmValid === true ? "border-green-600 text-green-700" : ""}`}
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-[10%] sm:-translate-y-[40%] text-gray-450"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
            {isConfirmFocused && confirmValid === false && (
              <p className="text-sm mt-1 text-red-600">Passwords do not match.</p>
            )}
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <Button type="submit" className="w-full bg-[#003262] hover:bg-[#003262] active:bg-[#003262]" disabled={loading}>
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
