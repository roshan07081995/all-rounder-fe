import { Link } from "react-router-dom";

export function SignupTerms() {
  return (
    <label className="flex items-start gap-2">
      <input type="checkbox" className="mt-1 rounded" />

      <span className="text-sm text-slate-600">
        I agree to the{" "}
        <Link to="/terms" className="font-semibold text-blue-600">
          Terms
        </Link>{" "}
        and{" "}
        <Link to="/privacy" className="font-semibold text-blue-600">
          Privacy Policy
        </Link>
      </span>
    </label>
  );
}
