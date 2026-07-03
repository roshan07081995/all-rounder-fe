import { createBrowserRouter } from "react-router-dom";

import { PublicRoute } from "./public-route";

import { AuthLayout } from "@/app/layouts/auth-layout";

import { authRoutes } from "@/modules/auth/routes";

import { NotFoundPage } from "./not-found";

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,

    children: [
      {
        element: <AuthLayout />,

        children: authRoutes,
      },
    ],
  },

  {
    path: "*",

    element: <NotFoundPage />,
  },
]);
