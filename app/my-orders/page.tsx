"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Header from "@/components/header"

export default function MyOrders() {
  const router = useRouter()
  const [orders, setOrders] = useState<any[]>([])
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null)

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
  }

  // Get token from cookie
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(";").shift()
  }

  // Auth check
  useEffect(() => {
    const token = getCookie("userToken")
    if (!token) {
      router.push("/login?redirect=/my-orders")
    }
  }, [router])

  // Fetch orders + refresh status on page load
  useEffect(() => {
    const fetchOrdersAndStatus = async () => {
      const token = getCookie("userToken")
      if (!token) return

      try {
        /* ===============================
           REAL API (ORDER HISTORY)
           GET /sales_order/{user_id}
        ================================

        const response = await fetch(
          `https://staging.oxygen.siskusserver.com/api/sales_order/{user_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )

        const data = await response.json()
        if (!data.success) return

        let fetchedOrders = data.orders || []
        */

        /* ===============================
           TEMPORARY localStorage FETCH
        ================================ */
        let fetchedOrders = JSON.parse(localStorage.getItem("orders") || "[]")

        /* ===============================
           REAL API (ORDER STATUS REFRESH)
           GET /sales_order/status/{order_id}
        ================================

        fetchedOrders = await Promise.all(
          fetchedOrders.map(async (order: any) => {
            const statusResponse = await fetch(
              `https://staging.oxygen.siskusserver.com/api/sales_order/status/${order.id}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            )
            const statusData = await statusResponse.json()
            return { ...order, status: statusData.status }
          })
        )
        */

        /* ===============================
           TEMPORARY STATUS REFRESH
        ================================ */
        setOrders(fetchedOrders)
      } catch (error) {
        console.error("Failed to fetch orders:", error)
      }
    }

    fetchOrdersAndStatus()
  }, [])

  const handleEditOrder = (orderId: number) => {
    router.push(`/order?edit=${orderId}`)
  }

  return (
    <div className="min-h-screen bg-gray-200">
      <Header />

      <div className="pt-24 md:pt-32 px-4 md:px-12">
        <h2 className="text-2xl font-bold text-[#003262] mb-6">My Orders</h2>

        <div className="mb-6 text-center">
          <Link href="/order">
            <button className="bg-[#003262] text-white px-6 sm:px-8 py-2 rounded-full font-semibold shadow-lg text-sm sm:text-base">
              Order Now
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {orders.map((order) => {
            const stepIndex = STATUS_STEPS.indexOf(order.status)
            const isExpanded = expandedOrderId === order.id

            return (
              <Card
                key={order.id}
                className="p-3 flex flex-col gap-2 shadow-[0_15px_20px_rgba(0,0,0,0.25)] text-sm sm:text-base"
              >
                {!isExpanded && (
                  <>
                    <h3 className="font-semibold text-[#003262] text-base uppercase text-center" >Order ID: {order.id}</h3>
                    <p>ServiceType: {order.serviceType} </p>
                    <p>Items: {order.itemCount}</p>
                    <p>Pickup: {order.pickupAddress}</p>
                    <p>Date/Time: {order.pickupDate}, {order.pickupTime}</p>
                    <p>Price: {order.price}</p>
                    <p>Status: {order.status}</p>
                  </>
                )}

                {isExpanded && (
                  <>
                    <h3 className="font-semibold text-[#003262] text-base uppercase text-center" >Order ID: {order.id}</h3>
                    <p>ServiceType: {order.serviceType} </p>
                    <p>Items: {order.itemCount}</p>
                    <p>Weight: {order.weight} kg</p>
                    <p>Softener: {order.softenerFlavor}</p>
                    {order.specialInstructions && <p>Notes: {order.specialInstructions}</p>}
                    <p>Pickup: {order.pickupAddress}</p>
                    <p>Date: {order.pickupDate}</p>
                    <p>Time: {order.pickupTime}</p>
                    <p>Price: {order.price}</p>
                    <p>Status: {order.status}</p>
                  </>
                )}

                {/* Progress bar */}
                <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${((stepIndex + 1) / STATUS_STEPS.length) * 100}%`,
                      backgroundColor: STATUS_COLOR[order.status],
                    }}
                  />
                </div>

                <button
                  onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                  className="mt-2 text-[#003262] font-semibold text-sm underline self-start"
                >
                  {isExpanded ? "Show Less" : "View More"}
                </button>

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
