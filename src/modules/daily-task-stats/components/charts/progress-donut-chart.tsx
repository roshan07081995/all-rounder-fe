interface ProgressDonutChartProps {
  value: number;
  completed: number;
  total: number;
}

export function ProgressDonutChart({
  value,
  completed,
  total,
}: ProgressDonutChartProps) {
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500">Progress</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Monthly completion
          </h2>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
          Live
        </span>
      </div>

      <div className="mt-6 flex flex-col items-center gap-5 sm:flex-row">
        <div className="relative h-40 w-40">
          <svg className="h-40 w-40 -rotate-90" viewBox="0 0 160 160">
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="18"
            />
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke="#10b981"
              strokeLinecap="round"
              strokeWidth="18"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-slate-950">{value}%</span>
            <span className="text-xs font-semibold uppercase text-slate-400">
              Done
            </span>
          </div>
        </div>

        <div className="grid flex-1 grid-cols-2 gap-3">
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase text-slate-400">
              Completed
            </p>
            <p className="mt-2 text-2xl font-bold text-slate-950">
              {completed}
            </p>
          </div>
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase text-slate-400">
              Total
            </p>
            <p className="mt-2 text-2xl font-bold text-slate-950">{total}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
