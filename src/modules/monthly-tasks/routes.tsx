import type { RouteObject } from "react-router-dom";

import { MonthlyTasksPage } from "./pages";

export const monthlyTaskRoutes: RouteObject[] = [
  {
    path: "/monthly-tasks",
    element: <MonthlyTasksPage />,
  },
];
