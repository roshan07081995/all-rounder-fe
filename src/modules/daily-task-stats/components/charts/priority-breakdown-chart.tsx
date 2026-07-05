import type { ChartSegment } from "../../types/daily-task-stats.types";

interface PriorityBreakdownChartProps {
  segments: ChartSegment[];
}

export function PriorityBreakdownChart({
  segments,
}: PriorityBreakdownChartProps) {
  const maxValue = Math.max(...segments.map((segment) => segment.value), 1);

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold text-slate-500">Priority load</p>
      <h2 className="mt-2 text-2xl font-bold text-slate-950">
        Focus distribution
      </h2>

      <div className="mt-6 space-y-5">
        {segments.map((segment) => (
          <div key={segment.label}>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium text-slate-600">
                {segment.label}
              </span>
              <span className="font-bold text-slate-950">{segment.value}</span>
            </div>
            <div className="h-3 rounded-full bg-slate-100">
              <div
                className="h-3 rounded-full"
                style={{
                  width: `${(segment.value / maxValue) * 100}%`,
                  backgroundColor: segment.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
