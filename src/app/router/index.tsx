import { createBrowserRouter } from "react-router-dom";

import { PublicRoute } from "./public-route";
import { ProtectedRoute } from "./protected-route";

import { AuthLayout } from "@/app/layouts/auth-layout";
import { DashboardLayout } from "@/app/layouts/dashboard-layout";

import { authRoutes } from "@/modules/auth/routes";
import { dashboardRoutes } from "@/modules/dashboard/routes";

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
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: dashboardRoutes,
      },
    ],
  },

  {
    path: "*",

    element: <NotFoundPage />,
  },
]);
