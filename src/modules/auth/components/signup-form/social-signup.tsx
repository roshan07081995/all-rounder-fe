import { Mail, UserRound } from "lucide-react";

export function SocialSignup() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        type="button"
        className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 py-3 transition hover:bg-slate-50">
        <Mail size={18} />
        Google
      </button>

      <button
        type="button"
        className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 py-3 transition hover:bg-slate-50">
        <UserRound size={18} />
        GitHub
      </button>
    </div>
  );
}
