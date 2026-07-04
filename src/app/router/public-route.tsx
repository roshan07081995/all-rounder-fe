import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "@/store/hooks";
import { selectIsAuthenticated } from "@/modules/auth/store/auth.selectors";

export function PublicRoute() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
