import type { WeeklyProgressItem } from "../types/dashboard.types";

interface WeeklyProgressProps {
  items: WeeklyProgressItem[];
}

export function WeeklyProgress({ items }: WeeklyProgressProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-base font-semibold text-slate-950">
        Weekly progress
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        A quick view of target completion.
      </p>

      <div className="mt-5 space-y-5">
        {items.map((item) => (
          <div key={item.id}>
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="text-sm font-medium text-slate-700">
                {item.label}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {item.target}
              </span>
            </div>

            <div className="h-2 rounded-full bg-slate-100">
              <div
                className="h-2 rounded-full bg-slate-950"
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
