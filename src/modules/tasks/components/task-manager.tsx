import { AlertCircle } from "lucide-react";

import { useTasks } from "../hooks/use-tasks";
import { TaskForm } from "./task-form";
import { TaskList } from "./task-list";

export function TaskManager() {
  const { data: tasks = [], isError, isLoading } = useTasks();

  return (
    <section className="space-y-4">
      <TaskForm />

      {isError && (
        <div className="flex items-start gap-3 rounded-lg border border-rose-200 bg-rose-50 p-4 text-rose-700">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-semibold">Could not load tasks</p>
            <p className="mt-1 text-sm">
              Check that you are logged in and the backend is running.
            </p>
          </div>
        </div>
      )}

      <TaskList tasks={tasks} isLoading={isLoading} />
    </section>
  );
}
