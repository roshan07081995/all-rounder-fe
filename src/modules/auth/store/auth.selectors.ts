import type { RootState } from "@/store";

export const selectAuth = (state: RootState) => state.auth;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export const selectAccessToken = (state: RootState) => state.auth.accessToken;
