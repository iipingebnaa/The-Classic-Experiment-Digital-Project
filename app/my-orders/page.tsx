"use client"

import { useState, useEffect } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import MobileMenu from "@/components/mobile-menu"
import { useRouter } from "next/navigation"
import Link from "next/link"


export default function MyOrders() {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [orders, setOrders] = useState<any[]>([])

// Temporary mock orders for testing UI
useEffect(() => {
  setOrders([
    { id: 1, itemName: "Shirt - Short Sleeve", price: "N$15", status: "Not Started" },
    { id: 2, itemName: "Jeans", price: "N$20", status: "Washing" },
    { id: 3, itemName: "Blanket", price: "N$55", status: "Ready for Pick Up" },
    { id: 1, itemName: "Shirt - Short Sleeve", price: "N$15", status: "Not Started" },
    { id: 1, itemName: "Shirt - Short Sleeve", price: "N$15", status: "Not Started" },
    { id: 1, itemName: "Shirt - Short Sleeve", price: "N$15", status: "Not Started" },
    { id: 1, itemName: "Shirt - Short Sleeve", price: "N$15", status: "Not Started" },
    { id: 1, itemName: "Shirt - Short Sleeve", price: "N$15", status: "Not Started" },
    { id: 1, itemName: "Shirt - Short Sleeve", price: "N$15", status: "Not Started" },
  ])
}, [])


  const STATUS_STEPS = [
  "Not Started",
  "Washing",
  "Ironing",
  "Packing",
  "Ready for Pick Up",
  "Being Delivered",
]

const STATUS_COLOR: Record<string, string> = {
  "Not Started": "#dc2626",     
  "Washing": "#f97316",         
  "Ironing": "#f97316",         
  "Packing": "#f97316",         
  "Ready for Pick Up": "#16a34a", 
  "Being Delivered": "#16a34a",   
};


  // Get token from cookie
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(";").shift()
  }

useEffect(() => {
  const token = getCookie("userToken")
  if (!token) {
    router.push("/login?redirect=/my-orders")
    return
  }
  setIsLoggedIn(true)
}, [router])

useEffect(() => {
  const fetchOrders = async () => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`
      const parts = value.split(`; ${name}=`)
      if (parts.length === 2) return parts.pop()?.split(";").shift()
    }
    const token = getCookie("userToken")
    if (!token) {
      router.push("/login?redirect=/my-orders")
      return
    }

    try {
      const response = await fetch("https://staging.oxygen.siskusserver.com/api/sales?user=true", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      if (data.success) setOrders(data.orders || [])
    } catch (error) {
      console.error("Failed to fetch orders:", error)
    }
  }

  fetchOrders()
}, [router])


  const handleEditOrder = (orderId: number) => {
    router.push(`/order?edit=${orderId}`)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Menu */}
      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        triggerUnderConstruction={() => alert("Feature under construction")}
      />

      {/* Header */}
      {!menuOpen && (
        <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 px-6 md:px-12 flex items-center justify-between shadow-sm h-16 md:h-20 lg:h-24">
          <div className="flex items-center h-full">
            <img
              src="/assets/ccl.logo.jpg"
              alt="Classic Clean Laundry Logo"
              className="object-contain w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
            />
          </div>

          <h1 className="absolute left-1/2 transform -translate-x-1/2 text-[#003262] font-semibold tracking-wider text-sm sm:text-base md:text-lg lg:text-xl">
            CLASSIC CLEAN LAUNDRY
          </h1>

          <div className="flex items-center gap-4 md:gap-6">
            <nav className="hidden md:flex gap-4 md:gap-6 items-center pr-4">
              <Link href="/"><span className="text-[#003262] font-medium hover:underline cursor-pointer">Home</span></Link>
              <Link href="/contact"><span className="text-[#003262] font-medium hover:underline cursor-pointer">Contact</span></Link>
              <Link href="/my-orders"><span className="text-[#003262] font-medium hover:underline cursor-pointer">My Orders</span></Link>

              {!isLoggedIn && <Link href="/login"><span className="text-[#003262] font-medium hover:underline cursor-pointer">Login</span></Link>}
              {!isLoggedIn && (
                <Link href="/signup">
                  <span className="bg-[#003262] text-white px-4 py-1.5 rounded-full font-semibold hover:brightness-110 transition cursor-pointer">
                    Sign Up
                  </span>
                </Link>
              )}

              {isLoggedIn && (
                <Button
                  onClick={() => { document.cookie = "userToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"; router.push("/"); setIsLoggedIn(false) }}
                  variant="outline"
                  className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Logout
                </Button>
              )}
            </nav>

            <button className="p-2 flex-shrink-0 md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              <Menu className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-gray-950" />
            </button>
          </div>
        </header>
      )}

      {/* Mobile Menu Items */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white z-40 shadow-md p-4 flex flex-col gap-3">
          <Link href="/"><span className="text-gray-700 hover:text-[#003262] cursor-pointer">Home</span></Link>
          <Link href="/contact"><span className="text-gray-700 hover:text-[#003262] cursor-pointer">Contact</span></Link>
          <Link href="/my-orders"><span className="text-gray-700 hover:text-[#003262] cursor-pointer">My Orders</span></Link>

          {!isLoggedIn && <Link href="/login"><span className="text-gray-700 hover:text-[#003262] cursor-pointer">Login</span></Link>}
          {!isLoggedIn && (
            <Link href="/signup">
              <span className="bg-[#003262] text-white px-4 py-1.5 rounded-full font-semibold hover:brightness-110 transition cursor-pointer">
                Sign Up
              </span>
            </Link>
          )}

          {isLoggedIn && (
            <Button onClick={() => { document.cookie = "userToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"; router.push("/"); setIsLoggedIn(false) }} className="w-full bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
              Logout
            </Button>
          )}
        </div>
      )}

      {/* Orders Content */}
      <div className="pt-20 px-4 md:px-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">My Orders</h2>

      {/* Order Now button above the cards */}
  <div className="mb-6 text-center">
    <Link href="/order">
      <button className="bg-[#003262] text-white px-6 py-3 rounded-lg hover:bg-[#003262]">
        Order Now
      </button>
    </Link>
  </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map((order) => {
            const stepIndex = STATUS_STEPS.indexOf(order.status)
            return (
              <Card key={order.id} className="p-4 flex flex-col gap-2">
                <h3 className="font-semibold text-gray-800">{order.itemName}</h3>
                <p className="text-gray-600">Price: {order.price}</p>
                <p className="text-gray-600">Status: {order.status}</p>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                     width: `${((STATUS_STEPS.indexOf(order.status) + 1) / STATUS_STEPS.length) * 100}%`,
                     backgroundColor: STATUS_COLOR[order.status] || "#09943d", // fallback color
                   }}
                  />
                </div>

                {/* Edit button only for Not Started */}
                {order.status === "Not Started" && (
                  <Button
                    onClick={() => handleEditOrder(order.id)}
                    className="mt-2 bg-[#003262] text-white hover:bg-[#003262]"
                  >
                    Edit Order
                  </Button>
                )}
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}


