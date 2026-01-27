"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { clearIntent, selectIntent } from "@/app/redux/ui/uiSlice";
import { INTENTS } from "@/constants/intents";
import type { AppDispatch } from "@/app/redux/store";


export function useRequireIntent() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const intent = useSelector(selectIntent);

  useEffect(() => {
    const fulfillIntent = (storedIntent: any) => {
      if (!storedIntent) return;

      switch (storedIntent.action) {
        case INTENTS.SUBMIT_ORDER:
          router.replace("/my-orders");
          break;
       
        default:
          break;
      }

      // Clear intent after fulfilling
      dispatch(clearIntent());
      localStorage.removeItem("intent");
    };

    // Check Redux intent first
    if (intent) {
      fulfillIntent(intent);
      return;
    }

    // Fallback: check localStorage
    const stored = localStorage.getItem("intent");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        fulfillIntent(parsed);
      } catch (err) {
        console.error("Failed to parse stored intent:", err);
        localStorage.removeItem("intent");
      }
    }
  }, [intent, dispatch, router]);
}
