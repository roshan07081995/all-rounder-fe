import { Bell, Search } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="flex flex-col gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">Saturday, Jul 4</p>
        <h1 className="mt-1 text-2xl font-bold tracking-normal text-slate-950 sm:text-3xl">
          Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <label className="relative hidden sm:block">
          <span className="sr-only">Search dashboard</span>
          <Search
            size={17}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="search"
            placeholder="Search"
            className="h-10 w-64 rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </label>

        <button
          type="button"
          aria-label="Notifications"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100">
          <Bell size={18} />
        </button>

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-sm font-bold text-white">
          RR
        </div>
      </div>
    </header>
  );
}
