import type { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900">Personal Tracker</h1>

        <h2 className="mt-6 text-2xl font-semibold">{title}</h2>

        <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
      </div>

      {children}
    </div>
  );
}
