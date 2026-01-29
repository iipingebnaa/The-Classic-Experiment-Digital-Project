"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { API } from "@/config/api"
import { useDispatch, useSelector } from "react-redux"
import { loginFailure, loginStart, loginSuccess, selectError, selectLoading } from "../redux/auth/authSlice"
import type { AppDispatch } from "../redux/store"
import { toast } from "sonner"
import { useRequireIntent } from "@/hooks/useRequireIntent"
import { MESSAGES } from "@/constants/messages"
import { clearIntent, selectIntent } from "../redux/intent/intentSlice"


export default function LoginPage() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  const loading = useSelector(selectLoading)
  const error = useSelector(selectError)

  const [phoneNumber, setPhoneNumber] = useState("")

  const intent = useSelector(selectIntent)
  

  // Namibia mobile number regex (local or international)
  const namibiaMobileRegex = /^(?:\+264|0)(81|83|84|85)\d{7}$/

  // Normalize phone to local 08XXXXXXXX
  const normalizePhoneToLocal = (phone: string) => {
    let digits = phone.replace(/\D/g, "") // remove spaces, dashes, etc.

    if (digits.startsWith("264") && digits.length === 11) {
      return "0" + digits.slice(3) // +264812345678 → 0812345678
    }

    if (digits.startsWith("0") && digits.length === 10) {
      return digits // already local
    }

    if (digits.length === 9 && digits.startsWith("8")) {
      return "0" + digits // 812345678 → 0812345678
    }

    return digits // fallback
  }

  useRequireIntent();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()


    if (!phoneNumber) {
      dispatch(loginFailure(MESSAGES.PHONE_REQUIRED))
      return
    }

    const localPhone = normalizePhoneToLocal(phoneNumber)
    console.log("Normalized phone:", localPhone)

    if (!namibiaMobileRegex.test(localPhone)) {
      dispatch(loginFailure(MESSAGES.PHONE_INVALID))
      return
    }

    dispatch(loginStart())

    try {
      const url = API.getCustomerByPhone(localPhone);
      console.log("Fetching URL:", url) // debug request
      
      const response = await fetch(url)
      console.log("Raw response status:", response.status)

      if (!response.ok) {
        throw new Error(MESSAGES.FAILED_REQUEST)
      }

      const data = await response.json();

      console.log("Backend response:", data);

      // Backend returns an array
      const customer = data?.[0] || null;

      if (!customer) {
        dispatch(loginFailure(MESSAGES.PHONE_NUMBER_NOT_FOUND))

        toast.error(MESSAGES.PHONE_NUMBER_NOT_FOUND,
          { duration: 8000 }
        );

        return
      }

      // Extract first name from full_name
      const firstName = customer.full_name?.split(" ")[0] || "";
      customer.first_name = firstName;

      dispatch(loginSuccess(customer))

      toast.success(MESSAGES.LOGIN_SUCCESS)
      
      if (intent?.action === "SUBMIT_ORDER") {
        dispatch(clearIntent());
        router.replace("/order"); // resume the order page
      } else {
        router.replace("/welcome"); // default landing page
      }
    } catch (error) {
      console.error("Login error:", error)
      dispatch(loginFailure(MESSAGES.LOGIN_ERROR))
    }
  }



  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 sm:p-16 shadow-[0_0_40px_0_rgba(0,0,0,0.3)] rounded-3xl">
        <div className="flex items-center justify-center h-full">
          <img
            src="/assets/ccl.logo.png"
            alt="Classic Clean Laundry Logo"
            className="object-contain w-20 h-20 md:w-24 md:h-24 scale-200 mb-2"
          />
        </div>

        <div className="mb-2 text-center">
          <h1 className="text-lg sm:text-xl font-bold text-[#003262] mb-1">CLASSIC CLEAN LAUNDRY</h1>
          <p className="text-[#003262]">
            "Your laundry, Our priority"
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="phoneNumber"></Label>
            <Input
              id="phoneNumber"
              type="text"
              placeholder="Enter your cellphone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="placeholder-gray-100 text-center"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <Button
            type="submit"
            className="w-full bg-[#003262] hover:bg-[#003262] rounded-full"
            disabled={loading}
          >
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
