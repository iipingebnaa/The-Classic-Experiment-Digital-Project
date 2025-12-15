"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Header from "@/components/header"


export default function MyOrders() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [orders, setOrders] = useState<any[]>([])

// Temporary mock orders for testing UI
useEffect(() => {
  setOrders([
    { id: 1, itemName: "Shirt - Short Sleeve", price: "N$15", status: "Not Started" },
    { id: 2, itemName: "Jeans", price: "N$20", status: "Washing" },
    { id: 3, itemName: "Blanket", price: "N$55", status: "Ready for Pick Up" },
    { id: 4, itemName: "Shirt - Short Sleeve", price: "N$15", status: "Not Started" },
    { id: 5, itemName: "Shirt - Short Sleeve", price: "N$15", status: "Not Started" },
    { id: 6, itemName: "Shirt - Short Sleeve", price: "N$15", status: "Not Started" },
    { id: 7, itemName: "Shirt - Short Sleeve", price: "N$15", status: "Not Started" },
    { id: 8, itemName: "Shirt - Short Sleeve", price: "N$15", status: "Not Started" },
    { id: 9, itemName: "Shirt - Short Sleeve", price: "N$15", status: "Not Started" },
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
  "Not Started": "#ab0808ff",     
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
    <div className="min-h-screen bg-gray-200">

      <Header />
      
      
      {/* Orders Content */}
      <div className="pt-20 px-4 md:px-12">
        <h2 className="text-2xl font-bold text-[#003262] mb-4">My Orders</h2>

      {/* Order Now */}
  <div className="mb-6 text-center">
    <Link href="/order">
      <button className="bg-[#003262] hover:bg-[#003262] text-white px-6 sm:px-8 py-2 rounded-full font-semibold shadow-lg text-sm sm:text-base">
        Order Now
      </button>
    </Link>
  </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {orders.map((order) => {
            const stepIndex = STATUS_STEPS.indexOf(order.status)
            return (
              <Card key={order.id} className="p-4 flex flex-col gap-2 shadow-[0_15px_20px_rgba(0,0,0,0.25)]">
                <h3 className="font-semibold text-gray-800">{order.itemName}</h3>
                <p className="text-gray-900">Price: {order.price}</p>
                <p className="text-gray-900">Status: {order.status}</p>

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


