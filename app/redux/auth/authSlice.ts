import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";


// State definition

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  customer: any | null;
}


// Initial state

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  error: null,
  customer: null,
};


// Auth slice

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // ---------- LOGIN ----------
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<any>) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      state.customer = action.payload;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ---------- SIGNUP (Customer Creation) ----------
    signupStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signupSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = null;
      state.customer = action.payload;
      state.isAuthenticated = true; // customer now exists
    },
    signupFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ---------- LOGOUT ----------
    logout: (state) => {
      state.isAuthenticated = false;
      state.customer = null;
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  signupStart,
  signupSuccess,
  signupFailure,
  logout,
} = authSlice.actions;


// Selectors

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export const selectLoading = (state: RootState) =>
  state.auth.loading;

export const selectError = (state: RootState) =>
  state.auth.error;

export const selectCustomer = (state: RootState) =>
  state.auth.customer;

export default authSlice.reducer;
