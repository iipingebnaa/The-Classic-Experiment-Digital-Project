"use client"

export const dynamic = "force-dynamic"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"

export default function InvoicePage() {
  const router = useRouter()
  const params = useParams()
  const orderId = params.id

  const [invoice, setInvoice] = useState<any>(null)

  useEffect(() => {
    if (!orderId) return

    // 🔹 Load orders (same source as MyOrders)
    const orders = JSON.parse(localStorage.getItem("orders") || "[]")
    const order = orders.find((o: any) => o.id === Number(orderId))

    if (!order) return

    // 🔹 Derive invoice from order
    const subtotal = Number(order.price)
    const amountDue = subtotal

    setInvoice({
      id: order.id,
      billTo: {
        name: "USERNAME",
        phone: "Cellphone number",
      },
      company: {
        name: "CLASSIC CLEAN LAUNDRY",
        location: "Windhoek West",
        phone: "+264 81 338 8933",
        email: "info@scc-laundry.com",
      },
      meta: {
        invoiceNumber: `INV-${order.id}`,
        invoiceDate: new Date().toISOString().split("T")[0],
        dueDate: new Date(
          Date.now() + 5 * 24 * 60 * 60 * 1000
        ).toISOString().split("T")[0],
      },
      items: [
        {
          description: `${order.serviceType}\n${order.weight}kg\nWASH, IRON & PACK`,
          qty: order.itemCount,
          unitPrice: subtotal / order.itemCount,
          total: subtotal,
        },
      ],
      subtotal,
      amountDue,
      bank: {
        bank: "Bank Windhoek",
        accountName: "Siskus Classic Clean Laundry CC",
        accountNumber: "8038738637",
        accountType: "Cheque",
        branch: "Capricorn Branch",
        branchCode: "486372",
      },
    })
  }, [orderId])

  if (!invoice) return <p>Loading...</p>

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <Header />

      <Card className="w-full max-w-4xl p-10 border rounded-xl shadow-md bg-white">
        {/* HEADER */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-100 rounded-md flex items-center justify-center font-bold text-blue-700">
              CCL
            </div>
            <div>
              <p className="font-semibold text-blue-700">
                {invoice.company.name}
              </p>
              <p className="text-sm">{invoice.company.location}</p>
              <p className="text-sm">{invoice.company.phone}</p>
              <p className="text-sm">{invoice.company.email}</p>
            </div>
          </div>
        </div>

        <hr className="mb-8" />

        {/* BILL TO + META */}
        <div className="flex justify-between mb-10">
          <div>
            <p className="text-[#2c78bf] font-semibold mb-2">BILL TO:</p>
            <p className="font-semibold">{invoice.billTo.name}</p>
            <p className="text-sm">{invoice.billTo.phone}</p>
          </div>

          <div className="text-right">
            <p className="text-blue-700 font-semibold text-xl mb-2">INVOICE</p>
            <p className="text-sm">
              <span className="font-semibold">Invoice number:</span>{" "}
              {invoice.meta.invoiceNumber}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Invoice date:</span>{" "}
              {invoice.meta.invoiceDate}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Due Date:</span>{" "}
              {invoice.meta.dueDate}
            </p>
          </div>
        </div>

        {/* TABLE */}
        <div className="border rounded-md overflow-hidden mb-8">
          <div className="grid grid-cols-12 bg-gray-100 px-4 py-3 font-semibold text-sm">
            <div className="col-span-1">#</div>
            <div className="col-span-5">Description</div>
            <div className="col-span-2 text-center">Qty</div>
            <div className="col-span-2 text-right">Unit Price</div>
            <div className="col-span-2 text-right">Total</div>
          </div>

          {invoice.items.map((item: any, index: number) => (
            <div
              key={index}
              className="grid grid-cols-12 px-4 py-4 border-t text-sm"
            >
              <div className="col-span-1">{index + 1}</div>
              <div className="col-span-5 whitespace-pre-line text-blue-700 font-medium">
                {item.description}
              </div>
              <div className="col-span-2 text-center">{item.qty}</div>
              <div className="col-span-2 text-right">N${item.unitPrice}</div>
              <div className="col-span-2 text-right font-semibold">
                N${item.total}
              </div>
            </div>
          ))}
        </div>

        {/* TOTALS */}
        <div className="flex justify-end mb-10">
          <div className="w-64 space-y-2">
            <div className="flex justify-between">
              <span className="font-semibold">SUBTOTAL :</span>
              <span>N${invoice.subtotal}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold text-lg">
              <span>AMOUNT DUE :</span>
              <span>N${invoice.amountDue}</span>
            </div>
          </div>
        </div>

        {/* BANK */}
        <div className="text-sm">
          <p className="font-semibold mb-2">BANK DETAILS</p>
          <p>Bank: {invoice.bank.bank}</p>
          <p>Account Name: {invoice.bank.accountName}</p>
          <p>Acc#: {invoice.bank.accountNumber}</p>
          <p>Account Type: {invoice.bank.accountType}</p>
          <p>Branch: {invoice.bank.branch}</p>
          <p>Branch Code: {invoice.bank.branchCode}</p>
        </div>

        {/* ACTION */}
        <Button
          className="mt-8 bg-[#003262] text-white"
          onClick={() => router.push(`/payment/${invoice.id}`)}
        >
          Pay Now
        </Button>
      </Card>
    </div>
  )
}
