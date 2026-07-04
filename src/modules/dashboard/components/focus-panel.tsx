import type { FocusArea } from "../types/dashboard.types";

interface FocusPanelProps {
  items: FocusArea[];
}

export function FocusPanel({ items }: FocusPanelProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-slate-950 p-5 text-white shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold">Focus areas</h2>
          <p className="mt-1 text-sm text-slate-400">
            Keep effort aligned with the week.
          </p>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-200">
          Live
        </span>
      </div>

      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold">{item.label}</p>
              <span className="text-xs font-semibold text-blue-200">
                {item.value}
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
