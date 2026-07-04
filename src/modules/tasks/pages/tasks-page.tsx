import { TaskManager } from "../components";

export function TasksPage() {
  return (
    <div className="space-y-6">
      <header className="border-b border-slate-200 pb-6">
        <p className="text-sm font-medium text-slate-500">Task operations</p>
        <h1 className="mt-1 text-2xl font-bold tracking-normal text-slate-950 sm:text-3xl">
          Activities
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Create, review, update, complete, and delete your daily tracker tasks.
        </p>
      </header>

      <TaskManager />
    </div>
  );
}
