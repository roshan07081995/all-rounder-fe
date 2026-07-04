import { Check, Pencil, Save, Trash2, X } from "lucide-react";
import { useState } from "react";

import type { Task, TaskPriority, TaskStatus } from "../types/task.types";
import { useDeleteTask, useUpdateTask } from "../hooks/use-tasks";

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
}

interface EditableTask {
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  due_date: string;
}

const priorityStyles: Record<TaskPriority, string> = {
  HIGH: "bg-rose-50 text-rose-700",
  MEDIUM: "bg-amber-50 text-amber-700",
  LOW: "bg-emerald-50 text-emerald-700",
};

const statusStyles: Record<TaskStatus, string> = {
  PENDING: "bg-slate-100 text-slate-600",
  COMPLETED: "bg-emerald-50 text-emerald-700",
};

const formatDate = (date: string | null) => {
  if (!date) {
    return "No due date";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
};

export function TaskList({ tasks, isLoading }: TaskListProps) {
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [draft, setDraft] = useState<EditableTask | null>(null);

  const startEdit = (task: Task) => {
    setEditingTaskId(task.id);
    setDraft({
      title: task.title,
      description: task.description ?? "",
      priority: task.priority,
      status: task.status,
      due_date: task.due_date ?? "",
    });
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
    setDraft(null);
  };

  const saveEdit = (taskId: string) => {
    if (!draft?.title.trim()) {
      return;
    }

    updateTask.mutate(
      {
        taskId,
        payload: {
          title: draft.title,
          description: draft.description.trim() || null,
          priority: draft.priority,
          status: draft.status,
          due_date: draft.due_date || null,
        },
      },
      {
        onSuccess: cancelEdit,
      }
    );
  };

  const toggleStatus = (task: Task) => {
    updateTask.mutate({
      taskId: task.id,
      payload: {
        status: task.status === "COMPLETED" ? "PENDING" : "COMPLETED",
      },
    });
  };

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-950">
            Activity board
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage all tasks from the backend task API.
          </p>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {tasks.length} total
        </span>
      </div>

      <div className="mt-5 space-y-3">
        {isLoading &&
          Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-28 animate-pulse rounded-lg border border-slate-100 bg-slate-50"
            />
          ))}

        {!isLoading && tasks.length === 0 && (
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <p className="text-sm font-semibold text-slate-800">
              No activities yet
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Add your first task to start tracking today&apos;s work.
            </p>
          </div>
        )}

        {!isLoading &&
          tasks.map((task) => {
            const isEditing = editingTaskId === task.id && draft;

            return (
              <article
                key={task.id}
                className="rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300">
                {isEditing ? (
                  <div className="space-y-4">
                    <input
                      value={draft.title}
                      onChange={(event) =>
                        setDraft({ ...draft, title: event.target.value })
                      }
                      className="h-11 w-full rounded-lg border border-slate-300 px-3 text-sm font-semibold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    <textarea
                      value={draft.description}
                      rows={3}
                      onChange={(event) =>
                        setDraft({
                          ...draft,
                          description: event.target.value,
                        })
                      }
                      className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    <div className="grid gap-3 sm:grid-cols-3">
                      <select
                        value={draft.priority}
                        onChange={(event) =>
                          setDraft({
                            ...draft,
                            priority: event.target.value as TaskPriority,
                          })
                        }
                        className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none focus:border-blue-500">
                        <option value="HIGH">High</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="LOW">Low</option>
                      </select>

                      <select
                        value={draft.status}
                        onChange={(event) =>
                          setDraft({
                            ...draft,
                            status: event.target.value as TaskStatus,
                          })
                        }
                        className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none focus:border-blue-500">
                        <option value="PENDING">Pending</option>
                        <option value="COMPLETED">Completed</option>
                      </select>

                      <input
                        type="date"
                        value={draft.due_date}
                        onChange={(event) =>
                          setDraft({ ...draft, due_date: event.target.value })
                        }
                        className="h-10 rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={cancelEdit}
                        className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-600 hover:bg-slate-100">
                        <X size={16} />
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => saveEdit(task.id)}
                        disabled={updateTask.isPending}
                        className="flex h-9 items-center gap-2 rounded-lg bg-slate-950 px-3 text-sm font-medium text-white disabled:opacity-60">
                        <Save size={16} />
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-[auto_1fr_auto] md:items-start">
                    <button
                      type="button"
                      onClick={() => toggleStatus(task)}
                      className={`mt-1 flex h-9 w-9 items-center justify-center rounded-lg border ${
                        task.status === "COMPLETED"
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                          : "border-slate-200 bg-white text-slate-400 hover:bg-slate-50"
                      }`}
                      aria-label="Toggle task status">
                      <Check size={17} />
                    </button>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-semibold text-slate-950">
                          {task.title}
                        </h3>
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-semibold ${priorityStyles[task.priority]}`}>
                          {task.priority}
                        </span>
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-semibold ${statusStyles[task.status]}`}>
                          {task.status}
                        </span>
                      </div>

                      {task.description && (
                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          {task.description}
                        </p>
                      )}

                      <p className="mt-3 text-xs font-medium text-slate-400">
                        Due {formatDate(task.due_date)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 md:justify-end">
                      <button
                        type="button"
                        onClick={() => startEdit(task)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100"
                        aria-label="Edit task">
                        <Pencil size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteTask.mutate(task.id)}
                        disabled={deleteTask.isPending}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 disabled:opacity-60"
                        aria-label="Delete task">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
      </div>
    </section>
  );
}
