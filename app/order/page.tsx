"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  removeItem,
  resetCurrentItem,
  setCurrentItemField,
  setPickupDetails,
  selectCurrentItem,
  selectOrderItems,
  selectPickupDetails,
  submitOrder,
} from "../redux/order/orderSlice";
import { selectCustomer } from "../redux/auth/authSlice";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/header";
import WhatsAppButton from "@/components/whatsapp-button";
import { Trash2 } from "lucide-react";
import { API } from "@/config/api";
import type { AppDispatch } from "../redux/store";


interface BackendItem {
  _id: string;
  name: string;
  description?: string;
  unit_price: number;
}

interface Item {
  id: string;
  name: string;
  description?: string;
  price: number;
  displayName?: string;
}


export default function OrderPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const customer = useSelector(selectCustomer);
  const currentItem = useSelector(selectCurrentItem);
  const orderItems = useSelector(selectOrderItems);
  const pickup = useSelector(selectPickupDetails);
  const [loading, setLoading] = useState(false);
  const [loadingItems, setLoadingItems] = useState(true);

  const [step, setStep] = useState(1);
  const [itemsCatalog, setItemsCatalog] = useState<Item[]>([]);
  const [selectedPrice, setSelectedPrice] = useState(0);

  const softenerFlavors = ["Lavender", "Fresh Linen", "Ocean Breeze", "No Preference"];

  // ================= FETCH ITEMS =================
  useEffect(() => {
  const fetchItems = async () => {
    try {
      const url = API.getItems();
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch items");

      
      const data: BackendItem[] = await response.json();

      // Map to frontend Item type
      const itemsMapped: Item[] = data.map(item => ({
        id: item._id,
        name: item.name,
        description: item.description,
        price: item.unit_price,
      }));

      // Remove duplicates by id or name
      const uniqueItems: Item[] = Array.from(
        new Map(
          itemsMapped.map(item => {
            const sameName = itemsMapped.find(i => i.id !== item.id && i.name === item.name);
            return [
             sameName ? item.description ?? item.name : item.name, 
             {
              ...item,
              displayName: sameName ? item.description ?? item.name : item.name, 
            },
           ];
        })
        ).values()
      );


      setItemsCatalog(uniqueItems);
      
    } catch (err) {
      console.error(err);
      setItemsCatalog([]);
    } finally {
      setLoadingItems(false); // done fetching
    }
  };
  fetchItems();
  }, []);

  

  // ================= HANDLE ITEM CHANGE =================
  const handleItemChange = (value: string) => {
    dispatch(setCurrentItemField({ field: "serviceType", value }));
    const foundItem = itemsCatalog.find((i) => i.name === value);
    setSelectedPrice(foundItem?.price ?? 0);
  };

  // ================= ADD ITEM =================
  const handleAddItem = () => {
    if (!currentItem.serviceType || !currentItem.itemCount) return;

    // Find the selected item from catalog
  const selected = itemsCatalog.find(
    (i) => String(i.id) === currentItem.serviceType
  );
  if (!selected) return;

    dispatch(
      addItem({
        id: Date.now(),
        serviceType: currentItem.serviceType,
        itemCount: Number(currentItem.itemCount),
        softenerFlavor: currentItem.softenerFlavor,
        specialInstructions: currentItem.specialInstructions,
        price: selected.price,
      })
    );

    dispatch(resetCurrentItem());
    setSelectedPrice(0);
  };

  // ================= SUBMIT ORDER =================
  const handleSubmit = async () => {
    if (orderItems.length === 0) {
      alert("Please add at least one item");
      return;
    }

    if (!customer) {
      alert("Customer not found. Please login again.");
      return;
    }

    setLoading(true);
    try {
      await dispatch(submitOrder());
      router.push("/my-orders");
    } catch (err) {
      console.error("Failed to submit order", err);
      alert("Failed to submit order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7FB] p-4">
      <Header />
      <WhatsAppButton />

      <div className="pt-[90px] max-w-5xl mx-auto">
        <Card className="p-6 shadow-[0_15px_40px_rgba(0,0,0,0.25)]">
          <div className="mb-4 space-y-3 text-center">
            <h1 className="text-2xl font-bold text-[#003262]">Place Your Order</h1>
            <p className="text-md font-semibold text-green-700">Step {step} of 3</p>
          </div>

          {/* STEP 1 — ITEMS */}
          {step === 1 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div className="w-[var(--radix-select-trigger-width)]">
                  <Label htmlFor="serviceType">Service Type</Label>
                  <Select
                    value={currentItem.serviceType || ""} 
                    onValueChange={(value) => 
                      dispatch(setCurrentItemField({ field: "serviceType", value }))
                    }
                  >
                    <SelectTrigger className="mt-1 w-full text-gray-500">
                      <SelectValue placeholder="Select item">
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="w-[var(--radix-select-trigger-width)]">
                      {itemsCatalog.length > 0
                        ? itemsCatalog.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.displayName}
                            </SelectItem>
                          ))
                        : (
                          <SelectItem key="empty" value="none" disabled>
                            Loading...
                          </SelectItem>
                        )}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Number of Items</Label>
                  <Input
                    type="number"
                    value={currentItem.itemCount}
                    onChange={(e) =>
                      dispatch(setCurrentItemField({ field: "itemCount", value: e.target.value }))
                    }
                  />
                </div>  

                <div>
                  <Label>Softener Flavor</Label>
                  <Select
                    value={currentItem.softenerFlavor}
                    onValueChange={(value) =>
                      dispatch(setCurrentItemField({ field: "softenerFlavor", value }))
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select flavor" />
                    </SelectTrigger>
                    <SelectContent>
                      {softenerFlavors.map((f) => (
                        <SelectItem key={f} value={f}>
                          {f}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  className="bg-[#408ac8] hover:bg-[#408ac8] rounded-full mt-4 md:mt-0"
                  onClick={handleAddItem}
                >
                  + Add Item
                </Button>
              </div>

              {/* ITEMS TABLE */}
              {orderItems.length > 0 && (
                <div className="mt-6 overflow-x-auto">
                  <table className="w-full text-sm border rounded-lg">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="p-2 text-left">Item</th>
                        <th className="p-2">Qty</th>  
                        <th className="p-2">Softener</th>
                        <th className="p-2">Subtotal</th>
                        <th className="p-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderItems.map((item) => (
                        <tr key={item.id} className="border-t">
                          <td className="p-2">
                            {itemsCatalog.find(i => i.id === item.serviceType)?.displayName || item.serviceType}
                          </td>
                          <td className="p-2 text-center">{item.itemCount}</td>
                          <td className="p-2 text-center">{item.softenerFlavor || "-"}</td>
                          <td className="p-2 text-center text-green-900 font-semibold">
                              N${(item.price * item.itemCount).toFixed(2)}
                          </td>
                          <td className="p-2 text-center">
                          
                            <Trash2
                              size={20}
                              color="#dc2626"
                              className="text-right cursor-pointer hover:text-red-700"
                              onClick={() => dispatch(removeItem(item.id))}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <Button
                className="mt-4 w-full sm:w-[190px] mx-auto block rounded-full bg-[#003262] hover:bg-[#003262] justify-center"
                onClick={() => setStep(2)}
              >
                Next
              </Button>
            </>
          )}

          {/* STEP 2 — SPECIAL INSTRUCTIONS */}
          {step === 2 && (
            <>
              <Label className="text-base">Special Instructions</Label>
              <Textarea
                placeholder="Enter your instructions here"
                className="mt-1 min-h-[150px] text-base"
                value={currentItem.specialInstructions}
                onChange={(e) =>
                  dispatch(setCurrentItemField({ field: "specialInstructions", value: e.target.value }))
                }
              />
              <div className="flex justify-center gap-4 mt-4">
                <Button className="w-1/2 sm:w-[180px] bg-[#408ac8] hover:bg-[#408ac8] text-white rounded-full" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button className="w-1/2 sm:w-[180px] bg-[#003262] hover:bg-[#003262] text-white rounded-full" onClick={() => setStep(3)}>
                  Next
                </Button>
              </div>
            </>
          )}

          {/* STEP 3 — PICKUP */}
          {step === 3 && (
            <>
              <Label className="text-base">Pickup Address</Label>
              <Textarea
                placeholder="Enter your address here"
                value={pickup.pickupAddress}
                onChange={(e) =>
                  dispatch(setPickupDetails({ ...pickup, pickupAddress: e.target.value }))
                }
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <Label className="mt-0 text-md" htmlFor="weight">Date</Label>
                <Input
                  type="date"
                  value={pickup.pickupDate}
                  onChange={(e) =>
                    dispatch(setPickupDetails({ ...pickup, pickupDate: e.target.value }))
                  }
                />
                <Label className="mt-0 text-md" htmlFor="weight">Time</Label>
                <Input
                  type="time"
                  value={pickup.pickupTime}
                  onChange={(e) =>
                    dispatch(setPickupDetails({ ...pickup, pickupTime: e.target.value }))
                  }
                />
              </div>
              <div className="flex justify-center gap-4 mt-6">
                <Button className="w-1/2 sm:w-[180px] bg-[#408ac8] hover:bg-[#408ac8] text-white rounded-full" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button
                  className="w-1/2 sm:w-[180px] bg-[#003262] hover:bg-[#003262] text-white rounded-full"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Order"}
                </Button>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
