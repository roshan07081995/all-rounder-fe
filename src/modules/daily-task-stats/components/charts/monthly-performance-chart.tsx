import type { MonthlyTaskStat } from "../../types/daily-task-stats.types";

interface MonthlyPerformanceChartProps {
  data: MonthlyTaskStat[];
  activeMonth: number;
}

export function MonthlyPerformanceChart({
  data,
  activeMonth,
}: MonthlyPerformanceChartProps) {
  const maxTotal = Math.max(...data.map((item) => item.total), 1);

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500">
            Month-wise stats
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Year performance
          </h2>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            Done
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            Open
          </span>
        </div>
      </div>

      <div className="mt-8 flex h-72 items-end gap-3 overflow-x-auto pb-2">
        {data.map((item) => {
          const totalHeight = Math.max((item.total / maxTotal) * 100, 4);
          const completedHeight =
            item.total === 0 ? 0 : (item.completed / item.total) * 100;
          const pendingHeight = 100 - completedHeight;
          const isActive = item.month === activeMonth;

          return (
            <div
              className="flex min-w-14 flex-1 flex-col items-center gap-3"
              key={item.month}>
              <div className="flex h-52 w-full items-end">
                <div
                  className={`flex w-full flex-col overflow-hidden rounded-t-lg border ${
                    isActive
                      ? "border-slate-950 shadow-md"
                      : "border-transparent"
                  }`}
                  style={{ height: `${totalHeight}%` }}>
                  <div
                    className="bg-amber-400"
                    style={{ height: `${pendingHeight}%` }}
                  />
                  <div
                    className="bg-emerald-500"
                    style={{ height: `${completedHeight}%` }}
                  />
                </div>
              </div>

              <div className="text-center">
                <p className="text-xs font-bold text-slate-700">
                  {item.label}
                </p>
                <p className="mt-1 text-[11px] font-semibold text-slate-400">
                  {item.completionRate}%
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
