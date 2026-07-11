import type { RouteObject } from "react-router-dom";

import { StudyTopicsPage } from "./pages";

export const studyTopicRoutes: RouteObject[] = [
  {
    path: "/study-topics",
    element: <StudyTopicsPage />,
  },
];
