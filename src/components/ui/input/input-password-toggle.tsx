import { Eye, EyeOff } from "lucide-react";

interface InputPasswordToggleProps {
  visible: boolean;
  onToggle: () => void;
}

export function InputPasswordToggle({
  visible,
  onToggle,
}: InputPasswordToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
      aria-label={visible ? "Hide password" : "Show password"}>
      {visible ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  );
}
