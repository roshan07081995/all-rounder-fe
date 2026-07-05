import type { DailyTaskTrend } from "../../types/daily-task-stats.types";

interface DailyTrendChartProps {
  data: DailyTaskTrend[];
}

export function DailyTrendChart({ data }: DailyTrendChartProps) {
  const width = 720;
  const height = 220;
  const padding = 22;
  const maxValue = Math.max(...data.map((item) => item.total), 1);
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const pointGap = data.length > 1 ? chartWidth / (data.length - 1) : 0;

  const points = data
    .map((item, index) => {
      const x = padding + index * pointGap;
      const y = padding + chartHeight - (item.completed / maxValue) * chartHeight;

      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500">Daily activity</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Completion trend
          </h2>
        </div>
        <span className="rounded-full bg-cyan-50 px-3 py-1 text-sm font-semibold text-cyan-700">
          30s refresh
        </span>
      </div>

      <div className="mt-6 overflow-x-auto">
        <svg className="min-w-[720px]" viewBox={`0 0 ${width} ${height}`}>
          <defs>
            <linearGradient id="trendFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[0, 1, 2, 3].map((line) => {
            const y = padding + (chartHeight / 3) * line;

            return (
              <line
                key={line}
                stroke="#e2e8f0"
                strokeWidth="1"
                x1={padding}
                x2={width - padding}
                y1={y}
                y2={y}
              />
            );
          })}

          <polyline
            fill="none"
            points={points}
            stroke="#0891b2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
          />

          {data.map((item, index) => {
            const x = padding + index * pointGap;
            const barHeight = (item.total / maxValue) * chartHeight;
            const y = padding + chartHeight - barHeight;

            return (
              <g key={item.day}>
                <rect
                  fill="#dbeafe"
                  height={barHeight}
                  rx="4"
                  width="8"
                  x={x - 4}
                  y={y}
                />
                {(item.day === 1 || item.day % 5 === 0) && (
                  <text
                    fill="#64748b"
                    fontSize="11"
                    fontWeight="600"
                    textAnchor="middle"
                    x={x}
                    y={height - 4}>
                    {item.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
