import {
  AlertTriangle,
  BookMarked,
  CalendarClock,
  CheckCircle2,
  Clock3,
  Layers3,
  Target,
} from "lucide-react";

import type { StudyTopic } from "../types/study-topic.types";
import {
  formatStudyTargetDate,
  getStudyTopicProgressStats,
  type SubjectProgress,
} from "../utils/study-topic-progress.utils";

interface StudyTopicDashboardProps {
  topics: StudyTopic[];
}

interface MetricTileProps {
  label: string;
  value: string | number;
  helper: string;
  tone: "slate" | "emerald" | "amber" | "rose" | "blue";
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const metricToneStyles: Record<MetricTileProps["tone"], string> = {
  slate: "border-slate-200 bg-slate-50 text-slate-700",
  emerald: "border-emerald-100 bg-emerald-50 text-emerald-700",
  amber: "border-amber-100 bg-amber-50 text-amber-700",
  rose: "border-rose-100 bg-rose-50 text-rose-700",
  blue: "border-blue-100 bg-blue-50 text-blue-700",
};

const getProgressColor = (progress: number) => {
  if (progress >= 75) {
    return "bg-emerald-500";
  }

  if (progress >= 40) {
    return "bg-blue-500";
  }

  return "bg-amber-500";
};

function MetricTile({
  label,
  value,
  helper,
  tone,
  icon: Icon,
}: MetricTileProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-3 text-3xl font-bold text-slate-950">{value}</p>
        </div>

        <span
          className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border ${metricToneStyles[tone]}`}>
          <Icon size={18} />
        </span>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-500">{helper}</p>
    </div>
  );
}

function SubjectProgressRow({ item }: { item: SubjectProgress }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-950">
            {item.subject}
          </p>
          <p className="mt-1 text-xs font-medium text-slate-500">
            {item.completed} done, {item.pending} pending
          </p>
        </div>

        <span className="shrink-0 text-sm font-bold text-slate-950">
          {item.completionRate}%
        </span>
      </div>

      <div className="mt-4 h-2 rounded-full bg-slate-100">
        <div
          className={`h-2 rounded-full ${getProgressColor(
            item.completionRate
          )}`}
          style={{ width: `${item.completionRate}%` }}
        />
      </div>
    </div>
  );
}

export function StudyTopicDashboard({ topics }: StudyTopicDashboardProps) {
  const stats = getStudyTopicProgressStats(topics);
  const circumference = 2 * Math.PI * 46;
  const progressOffset =
    circumference - (stats.completionRate / 100) * circumference;

  return (
    <section className="space-y-5">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="rounded-lg border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                  <BookMarked size={20} />
                </span>
                <p className="text-sm font-semibold text-slate-300">
                  Study progress
                </p>
              </div>

              <h2 className="mt-5 text-3xl font-bold">
                {stats.completed} of {stats.total} topics complete
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
                A focused view of your learning backlog, upcoming targets, and
                subject-wise momentum.
              </p>
            </div>

            <div className="relative h-32 w-32 shrink-0">
              <svg className="h-32 w-32 -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="46"
                  fill="none"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="12"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="46"
                  fill="none"
                  stroke="rgb(52,211,153)"
                  strokeLinecap="round"
                  strokeWidth="12"
                  strokeDasharray={circumference}
                  strokeDashoffset={progressOffset}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">
                  {stats.completionRate}%
                </span>
                <span className="text-xs font-semibold text-slate-300">
                  complete
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg bg-white/10 p-4">
              <p className="text-xs font-semibold text-slate-300">Pending</p>
              <p className="mt-2 text-2xl font-bold">{stats.pending}</p>
            </div>
            <div className="rounded-lg bg-white/10 p-4">
              <p className="text-xs font-semibold text-slate-300">This week</p>
              <p className="mt-2 text-2xl font-bold">{stats.dueThisWeek}</p>
            </div>
            <div className="rounded-lg bg-white/10 p-4">
              <p className="text-xs font-semibold text-slate-300">Overdue</p>
              <p className="mt-2 text-2xl font-bold">{stats.overdue}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <MetricTile
            label="Total topics"
            value={stats.total}
            helper="All study topics stored in your tracker."
            tone="blue"
            icon={Layers3}
          />
          <MetricTile
            label="Completed"
            value={stats.completed}
            helper="Topics you have marked as finished."
            tone="emerald"
            icon={CheckCircle2}
          />
          <MetricTile
            label="Due this week"
            value={stats.dueThisWeek}
            helper="Open topics with target dates in the next seven days."
            tone="amber"
            icon={CalendarClock}
          />
          <MetricTile
            label="Overdue"
            value={stats.overdue}
            helper="Pending topics whose target dates have already passed."
            tone="rose"
            icon={AlertTriangle}
          />
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_420px]">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold text-slate-950">
                Subject progress
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Completion split across each learning area.
              </p>
            </div>

            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-blue-700">
              <Target size={18} />
            </span>
          </div>

          <div className="mt-5 grid gap-3 lg:grid-cols-2">
            {stats.subjectProgress.length === 0 ? (
              <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
                Add study topics to see subject-wise progress.
              </div>
            ) : (
              stats.subjectProgress.map((item) => (
                <SubjectProgressRow key={item.subject} item={item} />
              ))
            )}
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold text-slate-950">
                Learning queue
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Next pending topics by target date.
              </p>
            </div>

            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-amber-100 bg-amber-50 text-amber-700">
              <Clock3 size={18} />
            </span>
          </div>

          <div className="mt-5 space-y-3">
            {stats.nextTopics.length === 0 ? (
              <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
                No pending study topics.
              </div>
            ) : (
              stats.nextTopics.map((topic, index) => (
                <div
                  key={topic.id}
                  className="flex items-start gap-3 rounded-lg border border-slate-200 p-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-slate-700">
                    {index + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-950">
                      {topic.title}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      {topic.subject && (
                        <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700">
                          {topic.subject}
                        </span>
                      )}
                      <span className="text-xs font-medium text-slate-500">
                        {formatStudyTargetDate(topic.target_date)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
