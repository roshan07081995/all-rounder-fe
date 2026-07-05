import type { ChartSegment } from "../../types/daily-task-stats.types";

interface StatusPieChartProps {
  segments: ChartSegment[];
}

export function StatusPieChart({ segments }: StatusPieChartProps) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  let consumed = 0;

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <p className="text-sm font-semibold text-slate-500">Status mix</p>
        <h2 className="mt-2 text-2xl font-bold text-slate-950">
          Tasks by state
        </h2>
      </div>

      <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row">
        <svg className="h-36 w-36 -rotate-90" viewBox="0 0 144 144">
          <circle
            cx="72"
            cy="72"
            r={radius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="20"
          />

          {total > 0 &&
            segments.map((segment) => {
              const share = segment.value / total;
              const dash = share * circumference;
              const gap = circumference - dash;
              const rotation = (consumed / total) * 360;
              consumed += segment.value;

              return (
                <circle
                  key={segment.label}
                  cx="72"
                  cy="72"
                  r={radius}
                  fill="none"
                  stroke={segment.color}
                  strokeDasharray={`${dash} ${gap}`}
                  strokeLinecap="round"
                  strokeWidth="20"
                  transform={`rotate(${rotation} 72 72)`}
                />
              );
            })}
        </svg>

        <div className="w-full space-y-3">
          {segments.map((segment) => (
            <div
              className="flex items-center justify-between gap-4"
              key={segment.label}>
              <div className="flex items-center gap-3">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: segment.color }}
                />
                <span className="text-sm font-medium text-slate-600">
                  {segment.label}
                </span>
              </div>
              <span className="text-sm font-bold text-slate-950">
                {segment.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
