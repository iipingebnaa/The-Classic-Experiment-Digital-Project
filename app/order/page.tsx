"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

const serviceTypes = ["Wash & Fold", "Ironing Only", "Dry Cleaning", "Wash & Iron"]

const softenerFlavors = ["Lavender", "Fresh Linen", "Ocean Breeze", "No Preference"]

export default function OrderPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    serviceType: "",
    itemCount: "",
    weight: "",
    softenerFlavor: "",
    specialInstructions: "",
    pickupAddress: "",
    pickupDate: "",
    pickupTime: "",
  })

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("userToken")
    if (!token) {
      router.push("/login")
    }
  }, [router])

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async () => {
    setLoading(true)

    try {
      // TODO: Integrate with Oxygen ERP API to create Sales Order
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log("[v0] Order submitted:", formData)
      router.push("/my-orders?success=true")
    } catch (error) {
      console.error("[v0] Order submission error:", error)
      alert("Failed to submit order. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#5B9DD1] to-[#7AB7E8] p-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card className="p-6 sm:p-8 shadow-md shadow-gray-400/30">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#003262] mb-2">Place Your Order</h1>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className={step >= 1 ? "text-[#408ac8] font-semibold" : ""}>Step 1</span>
              <span>→</span>
              <span className={step >= 2 ? "text-[#408ac8] font-semibold" : ""}>Step 2</span>
              <span>→</span>
              <span className={step >= 3 ? "text-[#408ac8] font-semibold" : ""}>Step 3</span>
            </div>
          </div>

          {/* Step 1: Service Details */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Service Details</h2>

              <div>
                <Label htmlFor="serviceType">Service Type</Label>
                <Select value={formData.serviceType} onValueChange={(value) => handleChange("serviceType", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="itemCount">Number of Items</Label>
                <Input
                  id="itemCount"
                  type="number"
                  placeholder="e.g., 15"
                  value={formData.itemCount}
                  onChange={(e) => handleChange("itemCount", e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="weight">Estimated Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="e.g., 3"
                  value={formData.weight}
                  onChange={(e) => handleChange("weight", e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="softenerFlavor">Softener Flavor</Label>
                <Select
                  value={formData.softenerFlavor}
                  onValueChange={(value) => handleChange("softenerFlavor", value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select softener flavor" />
                  </SelectTrigger>
                  <SelectContent>
                    {softenerFlavors.map((flavor) => (
                      <SelectItem key={flavor} value={flavor}>
                        {flavor}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleNext} className="w-full bg-[#408ac8] hover:bg-[#3678af]">
                Next
              </Button>
            </div>
          )}

          {/* Step 2: Special Instructions */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Additional Details</h2>

              <div>
                <Label htmlFor="specialInstructions">Special Instructions (Optional)</Label>
                <Textarea
                  id="specialInstructions"
                  placeholder="Any special care instructions for your laundry..."
                  value={formData.specialInstructions}
                  onChange={(e) => handleChange("specialInstructions", e.target.value)}
                  className="mt-1 min-h-32"
                />
              </div>

              <div className="flex gap-3">
                <Button onClick={handleBack} variant="outline" className="flex-1 bg-transparent">
                  Back
                </Button>
                <Button onClick={handleNext} className="flex-1 bg-[#408ac8] hover:bg-[#3678af]">
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Pickup Details */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Pickup Details</h2>

              <div>
                <Label htmlFor="pickupAddress">Pickup Address</Label>
                <Textarea
                  id="pickupAddress"
                  placeholder="Enter your full address..."
                  value={formData.pickupAddress}
                  onChange={(e) => handleChange("pickupAddress", e.target.value)}
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="pickupDate">Pickup Date</Label>
                  <Input
                    id="pickupDate"
                    type="date"
                    value={formData.pickupDate}
                    onChange={(e) => handleChange("pickupDate", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="pickupTime">Pickup Time</Label>
                  <Input
                    id="pickupTime"
                    type="time"
                    value={formData.pickupTime}
                    onChange={(e) => handleChange("pickupTime", e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={handleBack} variant="outline" className="flex-1 bg-transparent">
                  Back
                </Button>
                <Button onClick={handleSubmit} className="flex-1 bg-[#408ac8] hover:bg-[#3678af]" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Order"}
                </Button>
              </div>
            </div>
          )}
        </Card>

        <div className="mt-6 text-center">
          <Link href="/" className="text-white hover:underline text-sm">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
