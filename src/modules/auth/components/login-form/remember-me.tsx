import { Link } from "react-router-dom";

export function RememberMe() {
  return (
    <div className="flex items-center justify-between">
      <label className="flex items-center gap-2">
        <input type="checkbox" className="rounded" />

        <span className="text-sm">Remember me</span>
      </label>

      <Link
        to="/forgot-password"
        className="text-sm text-blue-600 hover:text-blue-700">
        Forgot password?
      </Link>
    </div>
  );
}
