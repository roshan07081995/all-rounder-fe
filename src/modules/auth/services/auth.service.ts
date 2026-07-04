import { authApi } from "../api/auth.api";

import type { LoginCredentials } from "../types/auth.types";

export const authService = {
  login(payload: LoginCredentials) {
    return authApi.login(payload);
  },
};
