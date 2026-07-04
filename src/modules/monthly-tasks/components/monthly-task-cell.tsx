import { CheckCircle2 } from "lucide-react";

import type { Task, TaskStatus } from "@/modules/tasks/types/task.types";

import type { MonthDay } from "../utils/monthly-task.utils";

interface MonthlyTaskCellProps {
  day: MonthDay;
  tasks: Task[];
  draftStatuses: Record<string, TaskStatus>;
  onToggleTask: (task: Task, checked: boolean) => void;
}

const priorityStyles: Record<Task["priority"], string> = {
  HIGH: "border-rose-200 bg-rose-50 text-rose-700",
  MEDIUM: "border-amber-200 bg-amber-50 text-amber-700",
  LOW: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

export function MonthlyTaskCell({
  day,
  tasks,
  draftStatuses,
  onToggleTask,
}: MonthlyTaskCellProps) {
  return (
    <div
      className={`min-h-36 rounded-lg border p-3 ${
        day.isCurrentMonth
          ? "border-slate-200 bg-white"
          : "border-slate-100 bg-slate-50 text-slate-400"
      }`}>
      <div className="flex items-center justify-between gap-2">
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-lg text-sm font-semibold ${
            day.isToday
              ? "bg-slate-950 text-white"
              : "bg-transparent text-slate-700"
          }`}>
          {day.dayNumber}
        </span>

        {tasks.length > 0 && (
          <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-500">
            {tasks.length}
          </span>
        )}
      </div>

      <div className="mt-3 space-y-2">
        {tasks.slice(0, 4).map((task) => {
          const status = draftStatuses[task.id] ?? task.status;
          const checked = status === "COMPLETED";

          return (
            <label
              key={task.id}
              className="flex cursor-pointer items-start gap-2 rounded-lg border border-slate-100 bg-slate-50 p-2 transition hover:border-slate-200 hover:bg-white">
              <input
                type="checkbox"
                checked={checked}
                onChange={(event) => onToggleTask(task, event.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-slate-950 focus:ring-slate-950"
              />

              <span className="min-w-0 flex-1">
                <span
                  className={`block truncate text-xs font-semibold ${
                    checked ? "text-slate-400 line-through" : "text-slate-800"
                  }`}>
                  {task.title}
                </span>
                <span
                  className={`mt-1 inline-flex rounded-full border px-1.5 py-0.5 text-[10px] font-bold ${priorityStyles[task.priority]}`}>
                  {task.priority}
                </span>
              </span>

              {checked && (
                <CheckCircle2 size={15} className="mt-0.5 text-emerald-600" />
              )}
            </label>
          );
        })}

        {tasks.length > 4 && (
          <p className="text-xs font-medium text-slate-500">
            +{tasks.length - 4} more
          </p>
        )}
      </div>
    </div>
  );
}
