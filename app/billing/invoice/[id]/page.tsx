"use client"


export const dynamic = "force-dynamic"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import { useParams } from "next/navigation"


export default function InvoicePage() {
  const router = useRouter()
  const params = useParams()
  const orderId = params.id


  const [invoice, setInvoice] = useState<any>(null)


  useEffect(() => {
    if (!orderId) return


    // ===============================
    // REAL API CALL (commented out)
    // GET /invoice/{order_id}
    // ===============================
    /*
    const token = getCookie("userToken")
    fetch(`https://staging.oxygen.siskusserver.com/api/invoice/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setInvoice(data))
      .catch(err => console.error(err))
    */


    // ===============================
    // MOCK DATA FOR UI TESTING
    // ===============================
    setInvoice({
      id: orderId,
      items: [
        { name: "Baskets", quantity: 2, price: 50 },
        { name: "Blankets", quantity: 1, price: 70 },
      ],
      subtotal: 170,
      tax: 17,
      total: 187,
      status: "Pending",
    })
  }, [orderId])


  if (!invoice) return <p>Loading...</p>


  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <Header />
      <Card className="w-full max-w-2xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
        <h2 className="text-xl font-bold text-[#003262] mb-4">Invoice #{invoice.id}</h2>
        <div className="mb-4">
          {invoice.items.map((item: any, idx: number) => (
            <div key={idx} className="flex justify-between border-b py-1">
              <span>{item.name} x {item.quantity}</span>
              <span>N${item.price}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between font-semibold">
          <span>Subtotal</span>
          <span>N${invoice.subtotal}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Tax</span>
          <span>N${invoice.tax}</span>
        </div>
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>N${invoice.total}</span>
        </div>


        <Button className="mt-4 bg-[#003262] text-white" onClick={() => router.push(`/payment/${invoice.id}`)}>
          Pay Now
        </Button>
      </Card>
    </div>
  )
}
