import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export function PasswordField() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label className="mb-2 block text-sm font-medium">Password</label>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 pr-12 outline-none focus:border-blue-500"
        />

        <button
          type="button"
          onClick={() => setShowPassword((value) => !value)}
          className="absolute right-3 top-1/2 -translate-y-1/2">
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}
