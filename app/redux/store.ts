import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import orderReducer from "./order/orderSlice";
import uiReducer from  "./ui/uiSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    order: orderReducer,
    ui: uiReducer,
   },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;