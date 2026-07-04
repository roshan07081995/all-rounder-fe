import type { RouteObject } from "react-router-dom";

import { TasksPage } from "./pages";

export const taskRoutes: RouteObject[] = [
  {
    path: "/tasks",
    element: <TasksPage />,
  },
];
