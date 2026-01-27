"use client";

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "@/app/redux/auth/authSlice";
import { toast } from "sonner";
import { MESSAGES } from "@/constants/messages";

export function useLogout() {
  const dispatch = useDispatch();
  const router = useRouter();

  const logoutUser = () => {
    dispatch(logout());
    localStorage.removeItem("intent");

    toast.success(MESSAGES.LOGOUT_SUCCESS);
    router.push("/");
  };

  return { logoutUser };
}
