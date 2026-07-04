import { api } from "@/lib/axios";

import type { AuthTokenResponse, LoginCredentials } from "../types/auth.types";

const AUTH_ENDPOINTS = {
  login: "/auth/login",
} as const;

export const authApi = {
  async login(payload: LoginCredentials): Promise<AuthTokenResponse> {
    const { data } = await api.post<AuthTokenResponse>(
      AUTH_ENDPOINTS.login,
      payload
    );

    return data;
  },
};
