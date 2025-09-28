import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/types/userType";
import type { Company } from "@/types/companyType";
import type { AuthState } from "@/types/auth";

const initialState: AuthState = {
  user: null,
  company: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginUserSuccess: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.company = null;
      state.token = action.payload.token;
    },
    loginCompanySuccess: (
      state,
      action: PayloadAction<{ company: Company; token: string }>
    ) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.company = { ...action.payload.company };
      state.user = null;
      state.token = action.payload.token;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
      state.company = null;
      state.token = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.company = null;
      state.token = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const {
  startLoading,
  loginUserSuccess,
  loginCompanySuccess,
  loginFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
