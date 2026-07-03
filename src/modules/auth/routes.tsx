import type { RouteObject } from "react-router-dom";

import { LoginPage } from "./pages/login-page";
import { SignupPage } from "./pages/signup-page";

export const authRoutes: RouteObject[] = [
  {
    path: "/login",

    element: <LoginPage />,
  },

  {
    path: "/signup",

    element: <SignupPage />,
  },
];
