"use client"


import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"


export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [amount, setAmount] = useState("")
  const [loading, setLoading] = useState(false)


  const handleSubmit = async () => {
    setLoading(true)
    try {
      /* ===============================
         REAL API CALL
         POST /payment
      ================================
      const token = getCookie("userToken")
      const response = await fetch("https://staging.oxygen.siskusserver.com/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ orderId, amount, method: paymentMethod }),
      })
      const data = await response.json()
      if (data.success) {
        // handle success
      }
      */
     
      // TEMPORARY: Simulate payment success
      alert(`Payment of N${amount} via ${paymentMethod} simulated!`)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Header />
      <Card className="max-w-md mx-auto p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-[#003262] mb-4">Make a Payment</h1>


        <div className="mb-4">
          <label className="block mb-1">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>


        <div className="mb-4">
          <label className="block mb-1">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="card">Card (Debit/Credit)</option>
            <option value="eft">Instant EFT</option>
          </select>
        </div>


        <Button
          onClick={handleSubmit}
          className="w-full bg-[#003262] text-white hover:bg-[#004b94]"
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </Button>
      </Card>
    </div>
  )
}
