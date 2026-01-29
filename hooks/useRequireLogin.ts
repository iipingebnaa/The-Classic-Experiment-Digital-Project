"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { setIntent } from "@/app/redux/intent/intentSlice";
import { useDispatch } from "react-redux";


interface Intent {
  action: string;
  payload?: any;
}

export function useRequireLogin() {
  const router = useRouter();
  const dispatch = useDispatch();

  const requireLogin = (intent: Intent) => {

    dispatch(setIntent(intent));

    toast.info("Please log in to continue", { duration: 3000 });
    router.push("/login");
  };

  return { requireLogin };
}
