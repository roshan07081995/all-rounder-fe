import { CheckCircle2, Circle, LoaderCircle } from "lucide-react";

import type { TodayTask } from "../types/dashboard.types";

interface TodayPlanProps {
  tasks: TodayTask[];
}

const statusConfig = {
  done: {
    label: "Done",
    icon: CheckCircle2,
    className: "text-emerald-600 bg-emerald-50",
  },
  "in-progress": {
    label: "Active",
    icon: LoaderCircle,
    className: "text-blue-600 bg-blue-50",
  },
  "up-next": {
    label: "Next",
    icon: Circle,
    className: "text-slate-500 bg-slate-100",
  },
};

export function TodayPlan({ tasks }: TodayPlanProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-slate-950">
            Today&apos;s plan
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Priority tasks across work, health, and learning.
          </p>
        </div>
        <button
          type="button"
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
          Add task
        </button>
      </div>

      <div className="mt-5 divide-y divide-slate-100">
        {tasks.map((task) => {
          const status = statusConfig[task.status];
          const Icon = status.icon;

          return (
            <div
              key={task.id}
              className="grid grid-cols-[auto_1fr_auto] items-center gap-3 py-4">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${status.className}`}>
                <Icon size={18} />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-950">
                  {task.title}
                </p>
                <p className="mt-1 text-xs font-medium text-slate-500">
                  {task.category}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm font-semibold text-slate-950">
                  {task.time}
                </p>
                <p className="mt-1 text-xs text-slate-500">{status.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
