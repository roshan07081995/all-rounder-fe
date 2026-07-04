import type { DashboardMetric } from "../types/dashboard.types";

interface MetricCardProps {
  metric: DashboardMetric;
}

const toneStyles: Record<DashboardMetric["tone"], string> = {
  blue: "bg-blue-50 text-blue-700",
  emerald: "bg-emerald-50 text-emerald-700",
  amber: "bg-amber-50 text-amber-700",
  rose: "bg-rose-50 text-rose-700",
};

export function MetricCard({ metric }: MetricCardProps) {
  const Icon = metric.icon;

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{metric.label}</p>
          <p className="mt-3 text-2xl font-bold text-slate-950">
            {metric.value}
          </p>
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${toneStyles[metric.tone]}`}>
          <Icon size={20} />
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-500">{metric.change}</p>
    </article>
  );
}
