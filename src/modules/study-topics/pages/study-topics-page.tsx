import { StudyTopicManager } from "../components";

export function StudyTopicsPage() {
  return (
    <div className="space-y-6">
      <header className="border-b border-slate-200 pb-6">
        <p className="text-sm font-medium text-slate-500">Learning tracker</p>
        <h1 className="mt-1 text-2xl font-bold tracking-normal text-slate-950 sm:text-3xl">
          Study Topics
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Add, review, update, complete, and delete the topics you are studying.
        </p>
      </header>

      <StudyTopicManager />
    </div>
  );
}
