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
  const [isLoggedIn, setIsLoggedIn] = useState(false) // ✅ track login state

  useEffect(() => {
    // Only runs in browser
    setIsLoggedIn(!!localStorage.getItem("userToken"))
  }, [])

  const ordersData = [
    { id: 1, item: "Shirt Short Sleeve", price: "N$15", status: "Completed" },
    { id: 2, item: "Trouser/Jeans", price: "N$20", status: "In Progress" },
    { id: 3, item: "Blanket - Single", price: "N$55", status: "Pending" },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Menu Component */}
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Fixed Header */}
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
                  onClick={() => { localStorage.removeItem("userToken"); router.push("/"); setIsLoggedIn(false) }}
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

      {/* Mobile Menu */}
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
            <Button onClick={() => { localStorage.removeItem("userToken"); router.push("/"); setIsLoggedIn(false) }} className="w-full bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
              Logout
            </Button>
          )}
        </div>
      )}

      {/* Page Content */}
      <div className="pt-20 px-4 md:px-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">My Orders</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ordersData.map((order) => (
            <Card key={order.id} className="p-4 flex flex-col gap-2">
              <h3 className="font-semibold text-gray-800">{order.item}</h3>
              <p className="text-gray-600">Price: {order.price}</p>
              <p className="text-gray-600">Status: {order.status}</p>
              <div className="flex gap-2 mt-2">
                <Link href="/order"><span className="text-blue-600 hover:underline cursor-pointer">Order Again</span></Link>
                <Link href="/contact"><span className="text-blue-600 hover:underline cursor-pointer">Contact Support</span></Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
