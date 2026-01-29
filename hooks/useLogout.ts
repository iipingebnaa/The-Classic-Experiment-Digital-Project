"use client";

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "@/app/redux/auth/authSlice";
import { toast } from "sonner";
import { MESSAGES } from "@/constants/messages";
import { clearIntent } from "@/app/redux/intent/intentSlice";

export function useLogout() {
  const dispatch = useDispatch();
  const router = useRouter();

  const logoutUser = () => {
    dispatch(logout());
    dispatch(clearIntent());

    toast.success(MESSAGES.LOGOUT_SUCCESS);
    router.push("/");
  };

  return { logoutUser };
}
