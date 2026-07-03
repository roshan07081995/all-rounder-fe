import type { ReactNode } from "react";

interface AuthShellProps {
  children: ReactNode;
}

export function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl">
        {/* Left Panel */}
        <section className="hidden w-1/2 flex-col justify-center bg-slate-900 p-16 text-white lg:flex">
          <h1 className="text-5xl font-bold">Personal Tracker</h1>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            One place to manage your health, study, work, goals and daily life.
          </p>

          <div className="mt-10 space-y-4">
            <div>✅ Daily Task Management</div>

            <div>✅ Study Tracker</div>

            <div>✅ Health Dashboard</div>

            <div>✅ AI Assistant</div>
          </div>
        </section>

        {/* Right Panel */}

        <section className="flex w-full items-center justify-center p-6 lg:w-1/2">
          {children}
        </section>
      </div>
    </div>
  );
}
