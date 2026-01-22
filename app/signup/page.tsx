"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  signupStart,
  signupSuccess,
  signupFailure,
} from "../redux/auth/authSlice"; // adjust path if needed

export default function SignUpPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const namibiaMobileRegex = /^(?:\+264|0)(81|83|84|85)\d{7}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setLoading(true);
  dispatch(signupStart());

  try {
    const sanitizedPhone = formData.phone.replace(/\s+/g, "");
    const names = formData.fullName.trim().split(" ");

    // 1️⃣ Check if customer already exists
    const checkRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/customers?company=${process.env.NEXT_PUBLIC_COMPANY_ID}&phone_number=${encodeURIComponent(
        sanitizedPhone
      )}`
    );

    const existingData = await checkRes.json();

    if (checkRes.ok && existingData.length > 0) {
      // Customer exists → Welcome Back page
      dispatch(signupSuccess(existingData[0]));
      router.push("/welcome"); // <-- your page for returning customers
      return;
    }

    // 2️⃣ Customer does not exist → create
    const payload = {
      company: process.env.NEXT_PUBLIC_COMPANY_ID,
      first_name: names[0] || ".",
      last_name: names.length > 1 ? names.slice(1).join(" ") : ".",
      phone_number: sanitizedPhone,
      email: formData.email || "",
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_API_CUSTOMER}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Signup failed");

    dispatch(signupSuccess(data));
    router.push("/welcome"); // <-- same page for new customers
  } catch (err: any) {
    dispatch(signupFailure(err.message));
    setError(err.message || "Failed to create account. Please try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <Card className="w-full max-w-sm p-5 shadow-[0_15px_40px_rgba(0,0,0,0.25)]">
        <div className="flex items-center justify-center mb-2">
          <img
            src="/assets/ccl.logo.png"
            alt="Classic Clean Laundry Logo"
            className="object-contain w-20 h-20 md:w-24 md:h-24"
          />
        </div>

        <div className="mb-3 text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-[#003262]">
            Create Account
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="FirstName LastName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="0812345678"
              value={formData.phone}
              onChange={handleChange}
              required
              className="mt-1"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <Button
            type="submit"
            className="w-full bg-[#003262]"
            disabled={loading}
          >
            {loading ? "Creating..." : "Sign Up"}
          </Button>
        </form>

        <div className="mt-3 text-center text-sm">
          <p className="text-gray-700">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#003262] hover:underline font-semibold"
            >
              Login
            </Link>
          </p>
        </div>

        <div className="mt-2 text-center">
          <Link href="/" className="text-[#003262] hover:underline text-sm">
            ← Back to Home
          </Link>
        </div>
      </Card>
    </div>
  );
}
