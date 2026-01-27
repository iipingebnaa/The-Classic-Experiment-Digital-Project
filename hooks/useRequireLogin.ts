"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { setIntent } from "@/app/redux/ui/uiSlice";
import { UseSelector,useDispatch } from "react-redux";


interface RequireIntentOptions{
  intentType: string;
  redirectTo: string;
}

export function useRequireLogin() {
  const router = useRouter();
  const dispatch = useDispatch();

  const requireLogin = (intent: {
    action: string;
    payload?: any;
  }) => {
    dispatch(setIntent(intent));
    localStorage.setItem("intent", JSON.stringify(intent));

    toast.info("Please log in to continue", { duration: 3000 });
    router.push("/login");
  };

  return { requireLogin };
}
