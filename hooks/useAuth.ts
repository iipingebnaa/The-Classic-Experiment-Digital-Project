"use client";

import { useSelector } from "react-redux";
import { selectCustomer } from "@/app/redux/auth/authSlice";

export function useAuth() {
  const customer = useSelector(selectCustomer);
  const isAuthenticated = Boolean(customer);

  return {
    customer,
    isAuthenticated,
  };
}
