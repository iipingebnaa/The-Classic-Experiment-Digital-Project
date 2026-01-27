// hooks/useOrderIntent.ts
"use client";

import { INTENTS } from "@/constants/intents";

export function useOrderIntent() {

  const requireLoginForOrder = (orderItems: any[], router: any) => {
    // Save intent in Redux + localStorage
    const draftIntent = {
      action: INTENTS.SUBMIT_ORDER,
      payload: orderItems,
    };

    localStorage.setItem("intent", JSON.stringify(draftIntent));

    // Smooth navigation using Next.js router
    router.push("/login");
  };

  return { requireLoginForOrder };
}
