"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"

const serviceTypes = ["Baskets", "Basket Iron Only", "Ladies' Wear", "Men's Wear", "Blankets/Duvet inners", " Beddings", "Curtains", "Others"]

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
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(';').shift()
  }

  const token = getCookie("userToken")
  if (!token) {
    router.push("/login?redirect=/order") // send user to login, store redirect
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
  setLoading(true);

  /*try {
    // Get token from cookie
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
    };

    const token = getCookie("userToken");
    if (!token) {
      alert("You must be logged in to place an order.");
      router.push("/login?redirect=/order");
      return;
    }

    // Build order payload using order form fields
    const orderPayload = {
      serviceType: formData.serviceType,
      itemCount: Number(formData.itemCount),
      weight: Number(formData.weight),
      softenerFlavor: formData.softenerFlavor,
      specialInstructions: formData.specialInstructions,
      pickupAddress: formData.pickupAddress,
      pickupDate: formData.pickupDate,
      pickupTime: formData.pickupTime,
    };

    // Send to Oxygen ERP API endpoint
    const baseUrl = "https://staging.oxygen.siskusserver.com/api";
    const response = await fetch(`${baseUrl}/sales_order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // user token in header
      },
      body: JSON.stringify(orderPayload),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      alert(data.message || "Failed to submit order.");
      return;
    }

    // Success → Redirect to My Orders
    router.push("/my-orders?success=true");

  } catch (error) {
    console.error("Order submission error:", error);
    alert("Failed to submit order. Please try again.");
  } finally {
    setLoading(false);
  }*/

//temporary handlesubmit for testing purpose without API integration
  try {
    // Build order payload using form fields
    const newOrder = {
        id: Date.now(), // simple unique id
        serviceType: formData.serviceType,
        itemCount: formData.itemCount,
        weight: formData.weight,
        softenerFlavor: formData.softenerFlavor,
        specialInstructions: formData.specialInstructions,
        pickupAddress: formData.pickupAddress,
        pickupDate: formData.pickupDate,
        pickupTime: formData.pickupTime,
        status: "Not Started",
        price: `N$${Number(formData.itemCount || 0) * 10}` // simple placeholder price calculation
      };

    // Get existing orders from localStorage
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");

    // Add the new order at the start
    localStorage.setItem("orders", JSON.stringify([newOrder, ...existingOrders]));

    // Redirect to My Orders page
    router.push("/my-orders?success=true");
  } catch (error) {
    console.error("Order submission error:", error);
    alert("Failed to submit order. Please try again.");
  } finally {
    setLoading(false);
  }



};



  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">

      <Header />
        
        <Card className="w-full max-w-2xl p-6 sm:p-8 mt-20 sm:mt-22 md:mt-24 shadow-[0_15px_40px_rgba(0,0,0,0.25)]">

          <div className="mb-6 flex flex-col items-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#003262] mb-6">Place Your Order</h1>
            <div className="flex items-center gap-6 lg:gap-10 text-sm text-gray-8m,00">
              <span className={step >= 1 ? "text-[#09943d] font-semibold" : ""}>Step 1</span>
              <span>→</span>
              <span className={step >= 2 ? "text-[#09943d] font-semibold" : ""}>Step 2</span>
              <span>→</span>
              <span className={step >= 3 ? "text-[#09943d] font-semibold" : ""}>Step 3</span>
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

               <Button onClick={handleNext} className="w-full bg-[#003262] text-white hover:bg-[#003262] active:bg-[#003262]"> 
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
                <Button onClick={handleBack} className="flex-1 bg-[#408ac8] text-white hover:bg-[#408ac8]  border-none shadow-none">
                  Back
                </Button>
                <Button onClick={handleNext} className="flex-1 bg-[#003262] text-white hover:bg-[#003262] active:bg-[#003262] border-none shadow-none">
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
                <Button onClick={handleBack} className="flex-1 bg-[#408ac8] text-white hover:bg-[#408ac8] border-none shadow-none">
                  Back
                </Button>
                <Button onClick={handleSubmit} className="flex-1 bg-[#003262] hover:bg-[#003262]" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Order"}
                </Button>
              </div>
            </div>
          )}
        </Card>
    </div>
  )
}
