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

    const orders = JSON.parse(localStorage.getItem("orders") || "[]")
    const order = orders.find((o: any) => o.id === Number(orderId))
    if (!order) return

    const user = JSON.parse(localStorage.getItem("user") || "{}")

    const invoiceDate = new Date()
    const dueDate = new Date(invoiceDate)
    dueDate.setDate(invoiceDate.getDate() + 2)

    const items = [
      {
        description: `${order.serviceType}\n${order.weight}kg\nWASH, IRON & PACK`,
        qty: order.itemCount,
        unitPrice: Number(order.price) / order.itemCount,
      },
    ].map((item) => ({
      ...item,
      total: item.qty * item.unitPrice,
    }))

    const subtotal = items.reduce((sum, i) => sum + i.total, 0)
    const tax = subtotal * 0.15
    const total = subtotal + tax

    setInvoice({
      id: order.id,
      billTo: {
        name: user.username || "Customer",
        phone: user.phone || "N/A",
      },
      company: {
        name: "CLASSIC CLEAN LAUNDRY",
        location: "Windhoek West",
        phone: "+264 81 338 8933",
        email: "info@scc-laundry.com",
      },
      meta: {
        invoiceNumber: `INV-${order.id}`,
        invoiceDate: invoiceDate.toISOString().split("T")[0],
        dueDate: dueDate.toISOString().split("T")[0],
      },
      items,
      subtotal,
      tax,
      total,
      amountDue: total,
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-2">
      <Header />
      <div className="pt-20 flex justify-center">
      <Card className="w-full max-w-md p-4 bg-white rounded-none shadow-[0_15px_40px_rgba(0,0,0,0.25)]">
        {/* HEADER */}
        <div className="flex justify-between items-start mb-8 ">
          <div className="flex items-center h-full">
          <img
            src="/assets/ccl.logo.png"
            alt="Classic Clean Laundry Logo"
            className="object-contain w-28 h-28 md:w-24 md:h-24 "
          />
        </div>

          <div className="text-right ">
            <p className="font-semibold text-[#2c78bf] text-md mb-2">
              {invoice.company.name} 
            </p>
            <p className="text-right text-sm md:text-sm">{invoice.company.location}</p>
            <p className="text-right text-sm md:text-sm">{invoice.company.phone}</p>
            <p className="text-right text-sm md:text-sm">{invoice.company.email}</p>
          </div>
        </div>

        <hr className="mb-2" />

        {/* BILL TO + META */}
        <div className="flex justify-between mb-10">
          <div>
            <p className="text-[#2c78bf] font-semibold mb-2">BILL TO:</p>
            <p className="font-semibold text-sm">{invoice.billTo.name}</p>
            <p className="text-sm">{invoice.billTo.phone}</p>
          </div>

          <div className="text-right">
            <p className="text-[#2c78bf] font-semibold text-md mb-2">INVOICE</p>
            <p className="text-right text-sm md:text-sm" ><strong>Invoice #:</strong> {invoice.meta.invoiceNumber}</p>
            <p className="text-right text-sm md:text-sm"><strong>Invoice date:</strong> {invoice.meta.invoiceDate}</p>
            <p className="text-right text-sm md:text-sm"><strong>Invoice due:</strong> {invoice.meta.dueDate}</p>
          </div>
        </div>

        {/* TABLE*/}
        <div className="-mx-2 sm:-mx-2">
        <div className="border rounded-none overflow-hidden mb-8">
          <div className="grid grid-cols-12 bg-gray-100 px-4 py-3 font-semibold text-xs md:text-sm">
            <div className="col-span-1 text-left">#</div>
            <div className="col-span-4 text-left">Description</div>
            <div className="col-span-2 text-center">Qty</div>
            <div className="col-span-2 text-right">Unit Price</div>
            <div className="col-span-3 text-right">Total</div>
          </div>

          {invoice.items.map((item: any, index: number) => (
            <div
              key={index}
              className="grid grid-cols-12 px-2 py-2 border-t text-xs md:text-sm">
              <div className="col-span-1">{index + 1}</div>

              <div className="col-span-4 whitespace-pre-line ">
                {item.description}
              </div>

              <div className="col-span-2 text-center px-2">{item.qty}</div>
              <div className="col-span-2 text-right">
                N${item.unitPrice.toFixed(2)}
              </div>
              <div className="col-span-3 text-right font-semibold">
                N${item.total.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
        </div>

        {/* TOTALS */}
        <div className="flex justify-end mb-10">
          <div className="w-64 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>N${invoice.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>VAT (15%):</span>
              <span>N${invoice.tax.toFixed(2)}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-semibold text-md">
              <span>Amount Due:</span>
              <span>N${invoice.amountDue.toFixed(2)}</span>
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

        <Button
          className="mt-4 bg-[#003262] text-white"
          onClick={() => router.push(`/payment/${invoice.id}`)}
        >
          Pay Now
        </Button>
      </Card>
      </div>
    </div>
  )
}
