import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";


interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  customer: any | null;
}



const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  error: null,
  customer: null,
};




const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    
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

    
    signupStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signupSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = null;
      state.customer = action.payload;
      state.isAuthenticated = true; 
    },
    signupFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    
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


export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export const selectLoading = (state: RootState) =>
  state.auth.loading;

export const selectError = (state: RootState) =>
  state.auth.error;

export const selectCustomer = (state: RootState) =>
  state.auth.customer;

export default authSlice.reducer;
