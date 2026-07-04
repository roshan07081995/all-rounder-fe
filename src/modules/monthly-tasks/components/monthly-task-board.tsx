import { ChevronLeft, ChevronRight, Save } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { useTasks } from "@/modules/tasks/hooks/use-tasks";
import type { Task } from "@/modules/tasks/types/task.types";

import {
  useMonthlyTaskCompletions,
  useSubmitMonthlyTasks,
} from "../hooks/use-submit-monthly-tasks";
import type { SaveMonthlyTaskCompletionPayload } from "../types/monthly-task.types";
import {
  getCurrentMonthDays,
  getMonthLabel,
} from "../utils/monthly-task.utils";

export function MonthlyTaskBoard() {
  const [visibleMonth, setVisibleMonth] = useState(() => new Date());
  const [draftChanges, setDraftChanges] = useState<
    Record<string, SaveMonthlyTaskCompletionPayload>
  >({});
  const { data: tasks = [], isLoading, isError } = useTasks();
  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth() + 1;
  const {
    data: monthlyCompletions = [],
    isLoading: isMonthlyCompletionsLoading,
    isError: isMonthlyCompletionsError,
  } = useMonthlyTaskCompletions(year, month);
  const submitMonthlyTasks = useSubmitMonthlyTasks();

  const monthDays = useMemo(
    () => getCurrentMonthDays(visibleMonth),
    [visibleMonth]
  );
  const savedCompletionMap = useMemo(
    () =>
      monthlyCompletions.reduce<Record<string, boolean>>(
        (completionMap, completion) => {
          completionMap[
            `${completion.task_id}:${completion.completion_date}`
          ] = completion.is_completed;

          return completionMap;
        },
        {}
      ),
    [monthlyCompletions]
  );
  const draftCompletionMap = useMemo(
    () =>
      Object.values(draftChanges).reduce<Record<string, boolean>>(
        (completionMap, completion) => {
          completionMap[
            `${completion.task_id}:${completion.completion_date}`
          ] = completion.is_completed;

          return completionMap;
        },
        {}
      ),
    [draftChanges]
  );
  const changeCount = Object.keys(draftChanges).length;
  const completedCount = useMemo(() => {
    const mergedCompletionMap = {
      ...savedCompletionMap,
      ...draftCompletionMap,
    };

    return Object.values(mergedCompletionMap).filter(Boolean).length;
  }, [draftCompletionMap, savedCompletionMap]);
  const totalCells = tasks.length * monthDays.length;
  const completionRate =
    totalCells === 0 ? 0 : Math.round((completedCount / totalCells) * 100);
  const isTrackerLoading = isLoading || isMonthlyCompletionsLoading;

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
    const completionKey = `${task.id}:${dateKey}`;

    setDraftChanges((currentDraft) => {
      if (savedCompletionMap[completionKey] === checked) {
        const remainingDraft = { ...currentDraft };
        delete remainingDraft[completionKey];

        return remainingDraft;
      }

      return {
        ...currentDraft,
        [completionKey]: {
          task_id: task.id,
          completion_date: dateKey,
          is_completed: checked,
        },
      };
    });
  };

  const handleSubmit = () => {
    submitMonthlyTasks.mutate(
      {
        items: Object.values(draftChanges),
        year,
        month,
      },
      {
        onSuccess: () => {
          setDraftChanges({});
        },
      }
    );
  };

  const getCellStatus = (task: Task, dateKey: string) => {
    const completionKey = `${task.id}:${dateKey}`;

    return draftCompletionMap[completionKey] ?? savedCompletionMap[completionKey] ?? false;
  };

  const getTaskMonthCompletion = (task: Task) => {
    const completedDays = monthDays.filter((day) =>
      getCellStatus(task, day.dateKey)
    ).length;

    return `${completedDays}/${monthDays.length} days`;
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
              {tasks.length}
            </p>
          </div>
          <div className="rounded-lg bg-emerald-50 p-4">
            <p className="text-sm font-medium text-emerald-700">
              Completed checks
            </p>
            <p className="mt-2 text-2xl font-bold text-emerald-800">
              {completedCount}
            </p>
          </div>
          <div className="rounded-lg bg-amber-50 p-4">
            <p className="text-sm font-medium text-amber-700">Open checks</p>
            <p className="mt-2 text-2xl font-bold text-amber-800">
              {Math.max(totalCells - completedCount, 0)}
            </p>
          </div>
          <div className="rounded-lg bg-blue-50 p-4">
            <p className="text-sm font-medium text-blue-700">Completion</p>
            <p className="mt-2 text-2xl font-bold text-blue-800">
              {completionRate}%
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

      {isMonthlyCompletionsError && (
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm font-medium text-rose-700">
          Could not load monthly completion records. Check that the new backend
          migration is applied and the API is running.
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
              {isTrackerLoading &&
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

              {!isTrackerLoading && tasks.length === 0 && (
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

              {!isTrackerLoading &&
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
                          getTaskMonthCompletion(task).startsWith("0/")
                            ? "bg-slate-100 text-slate-500"
                            : getTaskMonthCompletion(task).startsWith(
                                  `${monthDays.length}/`
                                )
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
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
