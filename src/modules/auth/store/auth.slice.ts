import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { AuthState, AuthTokenResponse } from "../types/auth.types";

const initialState: AuthState = {
  accessToken: null,
  tokenType: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthTokenResponse>) => {
      state.accessToken = action.payload.access_token;
      state.tokenType = action.payload.token_type;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.accessToken = null;
      state.tokenType = null;
      state.isAuthenticated = false;
    },
  },
});

export const authActions = authSlice.actions;

export const authReducer = authSlice.reducer;
