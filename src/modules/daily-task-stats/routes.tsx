import type { RouteObject } from "react-router-dom";

import { DailyTaskStatsPage } from "./pages";

export const dailyTaskStatsRoutes: RouteObject[] = [
  {
    path: "/daily-task-stats",
    element: <DailyTaskStatsPage />,
  },
];
