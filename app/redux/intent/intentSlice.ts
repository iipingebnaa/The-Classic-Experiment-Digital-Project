import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface Intent {
  action: string;
  payload?: any;
}

interface IntentState {
  current: Intent | null;
}

const initialState: IntentState = {
  current: null,
};

export const intentSlice = createSlice({
  name: "intent",
  initialState,
  reducers: {
    setIntent: (state, action: PayloadAction<Intent>) => {
      state.current = action.payload;
    },
    clearIntent: (state) => {
      state.current = null;
    },
  },
});

export const { setIntent, clearIntent } = intentSlice.actions;

export const selectIntent = (state: RootState) => state.intent.current;

export default intentSlice.reducer;
