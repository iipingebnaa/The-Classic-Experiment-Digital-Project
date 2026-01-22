import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface OrderItem {
  id: number | string;
  serviceType: string;
  itemCount: number;
  softenerFlavor: string;
  price:number;
  specialInstructions?: string;
}

export interface OrderItemDraft {
  serviceType: string;
  itemCount: string;
  softenerFlavor: string;
  price:string;
  specialInstructions: string;
}

export interface PickupDetails {
  pickupAddress: string;
  pickupDate: string;
  pickupTime: string;
}

interface OrderState {
  items: OrderItem[];
  currentItem: OrderItemDraft;   
  pickup: PickupDetails;
  loading: boolean;
  error: string | null;
}


const initialState: OrderState = {
  items: [],
  currentItem: {
    serviceType: "",
    itemCount: "",
    softenerFlavor: "",
    price:"",
    specialInstructions: "",
  },
  pickup: {
    pickupAddress: "",
    pickupDate: "",
    pickupTime: "",
  },
  loading: false,
  error: null,
};

// ---------------- THUNK: submit order ----------------
export const submitOrder = createAsyncThunk(
  "order/submitOrder",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const { items, pickup } = state.order;
      const customer = state.auth.customer;

      if (!customer) throw new Error("Customer not found");

      // Map items to backend format
      const mappedItems = items.map((i) => ({
        id: i.id,
        name: i.serviceType,
        category: "Laundry", // default
        quantity: i.itemCount,
        softenerFlavor: i.softenerFlavor,
        specialInstructions: i.specialInstructions || "",
      }));

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/sales_orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customer_id: customer.id,
            company_id: process.env.NEXT_PUBLIC_COMPANY_ID,
            items: mappedItems,
            pickup_details: pickup,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Failed to create order");

      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setCurrentItemField: (
      state,
      action: PayloadAction<{ field: keyof OrderItemDraft; value: string }>
    ) => {
      state.currentItem[action.payload.field] = action.payload.value;
    },
    resetCurrentItem: (state) => {
      state.currentItem = initialState.currentItem;
    },
    addItem: (state, action: PayloadAction<OrderItem>) => {
      state.items.push({
        ...action.payload,
        softenerFlavor: action.payload.softenerFlavor || "",
        specialInstructions: action.payload.specialInstructions || "",
      });
    },
    removeItem: (state, action: PayloadAction<number | string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setPickupDetails: (state, action: PayloadAction<PickupDetails>) => {
      state.pickup = action.payload;
    },
    clearOrder: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitOrder.fulfilled, (state) => {
        state.loading = false;
        state.items = [];
        state.currentItem = initialState.currentItem;
        state.pickup = initialState.pickup;
        state.error = null;
      })
      .addCase(submitOrder.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setCurrentItemField,
  resetCurrentItem,
  addItem,
  removeItem,
  setPickupDetails,
  clearOrder,
} = orderSlice.actions;

export const selectOrderItems = (state: RootState) => state.order.items;
export const selectCurrentItem = (state: RootState) => state.order.currentItem;
export const selectPickupDetails = (state: RootState) => state.order.pickup;
export const selectOrderLoading = (state: RootState) => state.order.loading;
export const selectOrderError = (state: RootState) => state.order.error;


export default orderSlice.reducer;
