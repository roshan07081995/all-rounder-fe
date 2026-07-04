import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "@/store/hooks";
import { selectIsAuthenticated } from "@/modules/auth/store/auth.selectors";

export function ProtectedRoute() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
