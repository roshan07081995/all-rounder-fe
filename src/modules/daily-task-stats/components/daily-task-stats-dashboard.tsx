import {
  Activity,
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
  Loader2,
} from "lucide-react";

import { useDailyTaskStats } from "../hooks/use-daily-task-stats";

import { DailyTrendChart } from "./charts/daily-trend-chart";
import { MonthlyPerformanceChart } from "./charts/monthly-performance-chart";
import { PriorityBreakdownChart } from "./charts/priority-breakdown-chart";
import { ProgressDonutChart } from "./charts/progress-donut-chart";
import { StatusPieChart } from "./charts/status-pie-chart";
import { StatMetricCard } from "./stat-metric-card";

export function DailyTaskStatsDashboard() {
  const {
    stats,
    month,
    year,
    setMonth,
    setYear,
    monthOptions,
    availableYears,
    isLoading,
    isError,
    isFetching,
  } = useDailyTaskStats();

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-white">
                <Activity size={20} />
              </span>
              <p className="text-sm font-semibold uppercase text-cyan-700">
                Daily tasks analytics
              </p>
            </div>
            <h1 className="mt-4 text-3xl font-bold text-slate-950">
              Month-wise task performance
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              A live operating view of completion, workload quality, priority
              pressure, and daily momentum.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label className="sr-only" htmlFor="task-stats-month">
              Month
            </label>
            <select
              className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
              id="task-stats-month"
              value={month}
              onChange={(event) => setMonth(Number(event.target.value))}>
              {monthOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <label className="sr-only" htmlFor="task-stats-year">
              Year
            </label>
            <select
              className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
              id="task-stats-year"
              value={year}
              onChange={(event) => setYear(Number(event.target.value))}>
              {availableYears.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <span className="inline-flex h-11 items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-3 text-sm font-semibold text-emerald-700">
              {isFetching ? <Loader2 className="animate-spin" size={16} /> : null}
              Realtime
            </span>
          </div>
        </div>
      </section>

      {isError && (
        <div className="flex items-center gap-3 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          <AlertTriangle size={18} />
          Could not load task stats. Check login and backend status.
        </div>
      )}

      {isLoading ? (
        <div className="rounded-lg border border-slate-200 bg-white p-10 text-center shadow-sm">
          <Loader2 className="mx-auto animate-spin text-slate-500" size={28} />
          <p className="mt-3 text-sm font-medium text-slate-500">
            Loading task analytics
          </p>
        </div>
      ) : (
        <>
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.cards.map((metric) => (
              <StatMetricCard key={metric.label} metric={metric} />
            ))}
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <ProgressDonutChart
              completed={stats.completed}
              total={stats.total}
              value={stats.completionRate}
            />
            <StatusPieChart segments={stats.statusSegments} />
          </section>

          <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
            <PriorityBreakdownChart segments={stats.prioritySegments} />
            <div className="rounded-lg border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                  <CheckCircle2 size={20} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-300">
                    Executive readout
                  </p>
                  <h2 className="mt-1 text-2xl font-bold">Progress quality</h2>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg bg-white/10 p-4">
                  <p className="text-xs font-semibold uppercase text-slate-300">
                    Completion
                  </p>
                  <p className="mt-3 text-3xl font-bold">
                    {stats.completionRate}%
                  </p>
                </div>
                <div className="rounded-lg bg-white/10 p-4">
                  <p className="text-xs font-semibold uppercase text-slate-300">
                    High priority
                  </p>
                  <p className="mt-3 text-3xl font-bold">
                    {stats.highPriority}
                  </p>
                </div>
                <div className="rounded-lg bg-white/10 p-4">
                  <p className="text-xs font-semibold uppercase text-slate-300">
                    Risk
                  </p>
                  <p className="mt-3 text-3xl font-bold">{stats.overdue}</p>
                </div>
              </div>

              <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <CalendarClock size={18} />
                  <span>
                    {stats.total === 0
                      ? "No tasks are scheduled for the selected month."
                      : `${stats.completed} of ${stats.total} tasks are completed for this month.`}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <MonthlyPerformanceChart
            activeMonth={month}
            data={stats.monthlySeries}
          />

          <DailyTrendChart data={stats.dailyTrend} />
        </>
      )}
    </div>
  );
}
