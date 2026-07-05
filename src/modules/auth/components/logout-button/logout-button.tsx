import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useLogout } from "../../hooks/use-logout";

export function LogoutButton() {
  const logout = useLogout();

  return (
    <Button
      type="button"
      variant="ghost"
      fullWidth
      className="justify-start px-3 text-slate-600 hover:bg-red-50 hover:text-red-700"
      leftIcon={<LogOut size={18} />}
      onClick={logout}>
      Logout
    </Button>
  );
}
