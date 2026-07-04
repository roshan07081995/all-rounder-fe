import { ChevronLeft, ChevronRight, Save } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { useTasks } from "@/modules/tasks/hooks/use-tasks";
import type {
  Task,
  TaskStatus,
  UpdateTaskPayload,
} from "@/modules/tasks/types/task.types";

import { useSubmitMonthlyTasks } from "../hooks/use-submit-monthly-tasks";
import {
  getCurrentMonthDays,
  getMonthLabel,
  getMonthTaskStats,
} from "../utils/monthly-task.utils";

export function MonthlyTaskBoard() {
  const [visibleMonth, setVisibleMonth] = useState(() => new Date());
  const [draftChanges, setDraftChanges] = useState<
    Record<string, UpdateTaskPayload>
  >({});
  const { data: tasks = [], isLoading, isError } = useTasks();
  const submitMonthlyTasks = useSubmitMonthlyTasks();

  const monthDays = useMemo(
    () => getCurrentMonthDays(visibleMonth),
    [visibleMonth]
  );
  const stats = useMemo(
    () => getMonthTaskStats(tasks, visibleMonth),
    [tasks, visibleMonth]
  );
  const changeCount = Object.keys(draftChanges).length;

  const moveMonth = (direction: "previous" | "next") => {
    setDraftChanges({});
    setVisibleMonth((currentMonth) => {
      const nextMonth = new Date(currentMonth);
      nextMonth.setMonth(
        currentMonth.getMonth() + (direction === "next" ? 1 : -1)
      );

      return nextMonth;
    });
  };

  const handleToggleTask = (task: Task, dateKey: string, checked: boolean) => {
    const nextStatus: TaskStatus = checked ? "COMPLETED" : "PENDING";

    setDraftChanges((currentDraft) => {
      if (
        nextStatus === task.status &&
        (!checked || dateKey === task.due_date)
      ) {
        const remainingDraft = { ...currentDraft };
        delete remainingDraft[task.id];

        return remainingDraft;
      }

      return {
        ...currentDraft,
        [task.id]: {
          status: nextStatus,
          due_date: checked ? dateKey : task.due_date,
        },
      };
    });
  };

  const handleSubmit = () => {
    submitMonthlyTasks.mutate(
      {
        changes: draftChanges,
      },
      {
        onSuccess: () => {
          setDraftChanges({});
        },
      }
    );
  };

  const getCellStatus = (task: Task, dateKey: string) => {
    const draft = draftChanges[task.id];
    const selectedDate = draft?.due_date ?? task.due_date;
    const selectedStatus = draft?.status ?? task.status;

    return selectedDate === dateKey && selectedStatus === "COMPLETED";
  };

  const getTaskMonthCompletion = (task: Task) => {
    const draft = draftChanges[task.id];
    const selectedDate = draft?.due_date ?? task.due_date;
    const selectedStatus = draft?.status ?? task.status;

    if (!selectedDate) {
      return "Not scheduled";
    }

    const date = new Date(`${selectedDate}T00:00:00`);
    const isVisibleMonth =
      date.getMonth() === visibleMonth.getMonth() &&
      date.getFullYear() === visibleMonth.getFullYear();

    if (!isVisibleMonth) {
      return "Outside month";
    }

    return selectedStatus === "COMPLETED" ? "Completed" : "Pending";
  };

  return (
    <section className="space-y-5">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Monthly completion board
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-normal text-slate-950 sm:text-3xl">
              {getMonthLabel(visibleMonth)}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => moveMonth("previous")}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100"
              aria-label="Previous month">
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => moveMonth("next")}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100"
              aria-label="Next month">
              <ChevronRight size={18} />
            </button>
            <Button
              type="button"
              loading={submitMonthlyTasks.isPending}
              disabled={changeCount === 0}
              leftIcon={<Save size={17} />}
              onClick={handleSubmit}>
              Submit {changeCount > 0 ? `(${changeCount})` : ""}
            </Button>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-500">Month tasks</p>
            <p className="mt-2 text-2xl font-bold text-slate-950">
              {stats.total}
            </p>
          </div>
          <div className="rounded-lg bg-emerald-50 p-4">
            <p className="text-sm font-medium text-emerald-700">Completed</p>
            <p className="mt-2 text-2xl font-bold text-emerald-800">
              {stats.completed}
            </p>
          </div>
          <div className="rounded-lg bg-amber-50 p-4">
            <p className="text-sm font-medium text-amber-700">Pending</p>
            <p className="mt-2 text-2xl font-bold text-amber-800">
              {stats.pending}
            </p>
          </div>
          <div className="rounded-lg bg-blue-50 p-4">
            <p className="text-sm font-medium text-blue-700">Completion</p>
            <p className="mt-2 text-2xl font-bold text-blue-800">
              {stats.completionRate}%
            </p>
          </div>
        </div>

        {submitMonthlyTasks.isError && (
          <p className="mt-4 text-sm font-medium text-rose-600" role="alert">
            Could not submit monthly task changes. Please try again.
          </p>
        )}
      </div>

      {isError && (
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm font-medium text-rose-700">
          Could not load tasks. Check that you are logged in and the backend is
          running.
        </div>
      )}

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-base font-semibold text-slate-950">
            Horizontal tracker
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Tasks stay fixed on the left. Scroll across the month and tick the
            date where each task is completed.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-max border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="sticky left-0 z-20 w-72 border-b border-r border-slate-200 bg-slate-50 px-4 py-3 text-left text-xs font-bold uppercase tracking-normal text-slate-500">
                  Task
                </th>
                <th className="sticky left-72 z-20 w-32 border-b border-r border-slate-200 bg-slate-50 px-3 py-3 text-left text-xs font-bold uppercase tracking-normal text-slate-500">
                  Status
                </th>
                {monthDays.map((day) => (
                  <th
                    key={day.dateKey}
                    className={`w-14 border-b border-r border-slate-200 px-2 py-3 text-center ${
                      day.isToday ? "bg-slate-950 text-white" : "bg-slate-50"
                    }`}>
                    <span className="block text-[11px] font-semibold uppercase tracking-normal">
                      {new Intl.DateTimeFormat("en", {
                        weekday: "short",
                      }).format(day.date)}
                    </span>
                    <span className="mt-1 block text-sm font-bold">
                      {day.dayNumber}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {isLoading &&
                Array.from({ length: 6 }).map((_, index) => (
                  <tr key={index}>
                    <td className="sticky left-0 z-10 border-b border-r border-slate-100 bg-white p-4">
                      <div className="h-12 animate-pulse rounded-lg bg-slate-100" />
                    </td>
                    <td className="sticky left-72 z-10 border-b border-r border-slate-100 bg-white p-3">
                      <div className="h-8 animate-pulse rounded-lg bg-slate-100" />
                    </td>
                    {monthDays.map((day) => (
                      <td
                        key={day.dateKey}
                        className="border-b border-r border-slate-100 p-2">
                        <div className="mx-auto h-8 w-8 animate-pulse rounded-lg bg-slate-100" />
                      </td>
                    ))}
                  </tr>
                ))}

              {!isLoading && tasks.length === 0 && (
                <tr>
                  <td
                    colSpan={monthDays.length + 2}
                    className="px-5 py-12 text-center">
                    <p className="text-sm font-semibold text-slate-800">
                      No tasks found
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Add tasks first, then track monthly completion here.
                    </p>
                  </td>
                </tr>
              )}

              {!isLoading &&
                tasks.map((task) => (
                  <tr key={task.id} className="group">
                    <td className="sticky left-0 z-10 w-72 border-b border-r border-slate-100 bg-white px-4 py-3 group-hover:bg-slate-50">
                      <p className="truncate text-sm font-semibold text-slate-950">
                        {task.title}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full px-2 py-1 text-[11px] font-bold ${
                            task.priority === "HIGH"
                              ? "bg-rose-50 text-rose-700"
                              : task.priority === "MEDIUM"
                                ? "bg-amber-50 text-amber-700"
                                : "bg-emerald-50 text-emerald-700"
                          }`}>
                          {task.priority}
                        </span>
                        {task.due_date && (
                          <span className="text-xs font-medium text-slate-400">
                            Due {task.due_date}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="sticky left-72 z-10 w-32 border-b border-r border-slate-100 bg-white px-3 py-3 group-hover:bg-slate-50">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                          getTaskMonthCompletion(task) === "Completed"
                            ? "bg-emerald-50 text-emerald-700"
                            : getTaskMonthCompletion(task) === "Pending"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-slate-100 text-slate-500"
                        }`}>
                        {getTaskMonthCompletion(task)}
                      </span>
                    </td>

                    {monthDays.map((day) => {
                      const checked = getCellStatus(task, day.dateKey);

                      return (
                        <td
                          key={day.dateKey}
                          className={`border-b border-r border-slate-100 px-2 py-3 text-center group-hover:bg-slate-50 ${
                            day.isToday ? "bg-blue-50" : "bg-white"
                          }`}>
                          <label className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-white transition hover:border-slate-400 hover:bg-slate-100">
                            <span className="sr-only">
                              Mark {task.title} complete on {day.dateKey}
                            </span>
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={(event) =>
                                handleToggleTask(
                                  task,
                                  day.dateKey,
                                  event.target.checked
                                )
                              }
                              className="h-4 w-4 rounded border-slate-300 text-slate-950 focus:ring-slate-950"
                            />
                          </label>
                        </td>
                      );
                    })}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
