import { ArrowUpRight } from "lucide-react";

import type { StatCardMetric } from "../types/daily-task-stats.types";

interface StatMetricCardProps {
  metric: StatCardMetric;
}

const toneStyles: Record<StatCardMetric["tone"], string> = {
  blue: "border-blue-100 bg-blue-50 text-blue-700",
  emerald: "border-emerald-100 bg-emerald-50 text-emerald-700",
  amber: "border-amber-100 bg-amber-50 text-amber-700",
  rose: "border-rose-100 bg-rose-50 text-rose-700",
};

export function StatMetricCard({ metric }: StatMetricCardProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{metric.label}</p>
          <p className="mt-3 text-3xl font-bold text-slate-950">
            {metric.value}
          </p>
        </div>

        <span
          className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border ${toneStyles[metric.tone]}`}>
          <ArrowUpRight size={17} />
        </span>
      </div>

      <p className="mt-4 text-sm text-slate-500">{metric.helper}</p>
    </div>
  );
}
