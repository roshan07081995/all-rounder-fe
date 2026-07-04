export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthTokenResponse {
  access_token: string;
  token_type: "bearer";
}

export interface AuthState {
  accessToken: string | null;
  tokenType: string | null;
  isAuthenticated: boolean;
}
