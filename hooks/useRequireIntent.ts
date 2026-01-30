"use client";

import { useSelector, useDispatch } from "react-redux";
import { clearIntent, selectIntent } from "@/app/redux/intent/intentSlice";
import type { AppDispatch } from "@/app/redux/store";


export function useRequireIntent() {
  const dispatch = useDispatch<AppDispatch>();
  const intent = useSelector(selectIntent);

  const consumeIntent = () => {
    dispatch(clearIntent());
    localStorage.removeItem("intent");
  };

  return { intent, consumeIntent };
}
