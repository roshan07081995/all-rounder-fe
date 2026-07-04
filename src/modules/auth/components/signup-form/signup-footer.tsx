import { Link } from "react-router-dom";

export function SignupFooter() {
  return (
    <div className="mt-8 text-center">
      <span className="text-sm text-slate-500">Already have an account?</span>

      <Link
        to="/login"
        className="ml-2 font-semibold text-blue-600 hover:text-blue-700">
        Sign In
      </Link>
    </div>
  );
}
