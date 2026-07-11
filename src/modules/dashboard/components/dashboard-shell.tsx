import {
  BarChart3,
  BookOpen,
  CalendarCheck2,
  CalendarDays,
  Home,
  LineChart,
  Settings,
  Target,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import { LogoutButton } from "@/modules/auth/components";

import type { ReactNode } from "react";

interface DashboardShellProps {
  children: ReactNode;
}

const navItems = [
  { label: "Overview", icon: Home, href: "/" },
  { label: "Tasks", icon: CalendarCheck2, href: "/tasks" },
  { label: "Study", icon: BookOpen, href: "/study-topics" },
  { label: "Monthly", icon: CalendarDays, href: "/monthly-tasks" },
  { label: "Stats", icon: LineChart, href: "/daily-task-stats" },
  { label: "Goals", icon: Target, href: "/goals" },
  { label: "Analytics", icon: BarChart3, href: "/analytics" },
  { label: "Settings", icon: Settings, href: "/settings" },
];

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-slate-200 bg-white px-5 py-6 lg:block">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
            PT
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-950">
              Personal Tracker
            </p>
            <p className="text-xs text-slate-500">All-rounder workspace</p>
          </div>
        </div>

        <nav className="mt-8 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.label}
                to={item.href}
                className={({ isActive }) =>
                  `flex h-11 w-full items-center gap-3 rounded-lg px-3 text-left text-sm font-medium transition ${
                    isActive
                    ? "bg-slate-950 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                  }`
                }>
                <Icon size={18} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-5 right-5 space-y-3">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-950">Today score</p>
            <div className="mt-3 flex items-end justify-between">
              <span className="text-3xl font-bold">84</span>
              <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                On track
              </span>
            </div>
            <div className="mt-4 h-2 rounded-full bg-slate-200">
              <div className="h-2 w-[84%] rounded-full bg-blue-600" />
            </div>
          </div>

          <LogoutButton />
        </div>
      </aside>

      <main className="lg:pl-72">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
