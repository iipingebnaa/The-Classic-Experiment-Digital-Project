import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Intent {
  action: string;
  payload?: any;
}

interface UIState {
  intent: Intent | null;
}

const initialState: UIState = {
  intent: null,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setIntent: (state, action: PayloadAction<Intent | null>) => {
      state.intent = action.payload;
    },
    clearIntent: (state) => {
      state.intent = null;
    },
  },
});

export const { setIntent, clearIntent } = uiSlice.actions;
export const selectIntent = (state: { ui: UIState }) => state.ui.intent;

export default uiSlice.reducer;
