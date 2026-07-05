import { createBrowserRouter } from "react-router-dom";

import { PublicRoute } from "./public-route";
import { ProtectedRoute } from "./protected-route";

import { AuthLayout } from "@/app/layouts/auth-layout";
import { DashboardLayout } from "@/app/layouts/dashboard-layout";

import { authRoutes } from "@/modules/auth/routes";
import { dailyTaskStatsRoutes } from "@/modules/daily-task-stats/routes";
import { dashboardRoutes } from "@/modules/dashboard/routes";
import { monthlyTaskRoutes } from "@/modules/monthly-tasks/routes";
import { taskRoutes } from "@/modules/tasks/routes";

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
        children: [
          ...dashboardRoutes,
          ...taskRoutes,
          ...monthlyTaskRoutes,
          ...dailyTaskStatsRoutes,
        ],
      },
    ],
  },

  {
    path: "*",

    element: <NotFoundPage />,
  },
]);
