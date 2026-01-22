"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useSelector } from "react-redux"
import { RootState } from "@/app/redux/store"

export default function WelcomePage() {
  const router = useRouter()

  // Get customer info from Redux
  const customer = useSelector((state: RootState) => state.auth.customer)

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 sm:p-16 shadow-[0_0_40px_0_rgba(0,0,0,0.3)] rounded-3xl">
        <div className="flex items-center justify-center h-full mb-6">
          <img
            src="/assets/ccl.logo.png"
            alt="Classic Clean Laundry Logo"
            className="object-contain w-24 h-24 md:w-28 md:h-28 scale-200"
          />
        </div>

        <div className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#003262] mb-2">
            Welcome Back!{customer?.first_name ? ` ${customer.first_name}` : ""}
          </h1>
          <p className="text-[#003262]">
            Ready to place your laundry order?
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Button
            onClick={() => router.push("/order")}
            className="w-full bg-[#003262] hover:bg-[#003262] rounded-full"
          >
            Start Order
          </Button>
          <Button
            onClick={() => router.push("/login")}
            className="w-full bg-gray-400 rounded-full hover:bg-gray-400"
          >
            Back
          </Button>
        </div>
      </Card>
    </div>
  )
}
