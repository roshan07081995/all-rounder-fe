import { Outlet } from "react-router-dom";

import { DashboardShell } from "@/modules/dashboard/components";

export function DashboardLayout() {
  return (
    <DashboardShell>
      <Outlet />
    </DashboardShell>
  );
}
