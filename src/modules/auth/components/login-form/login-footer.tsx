import { Link } from "react-router-dom";

export function LoginFooter() {
  return (
    <div className="mt-8 text-center">
      <span className="text-sm text-slate-500">Don't have an account?</span>

      <Link
        to="/signup"
        className="ml-2 font-semibold text-blue-600 hover:text-blue-700">
        Sign Up
      </Link>
    </div>
  );
}
