import type { Task, TaskPriority } from "@/modules/tasks/types/task.types";

import type {
  ChartSegment,
  DailyTaskStats,
  DailyTaskStatsFilters,
  DailyTaskTrend,
  MonthlyTaskStat,
  StatCardMetric,
} from "../types/daily-task-stats.types";

const monthFormatter = new Intl.DateTimeFormat("en", { month: "short" });

const parseTaskDate = (task: Task) => {
  const rawDate = task.due_date ?? task.created_at;

  return new Date(`${rawDate.slice(0, 10)}T00:00:00`);
};

const isSameMonth = (date: Date, filters: DailyTaskStatsFilters) =>
  date.getFullYear() === filters.year && date.getMonth() === filters.month;

const percentage = (value: number, total: number) =>
  total === 0 ? 0 : Math.round((value / total) * 100);

const getMonthLabel = (year: number, month: number) =>
  monthFormatter.format(new Date(year, month, 1));

const getPriorityCount = (
  tasks: Task[],
  priority: TaskPriority,
) => tasks.filter((task) => task.priority === priority).length;

const getOverdueCount = (tasks: Task[]) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return tasks.filter((task) => {
    if (!task.due_date || task.status === "COMPLETED") {
      return false;
    }

    return new Date(`${task.due_date}T00:00:00`) < today;
  }).length;
};

const buildCards = ({
  total,
  completed,
  pending,
  overdue,
  completionRate,
}: Pick<
  DailyTaskStats,
  "total" | "completed" | "pending" | "overdue" | "completionRate"
>): StatCardMetric[] => [
  {
    label: "Month tasks",
    value: String(total),
    helper: `${pending} still open`,
    tone: "blue",
  },
  {
    label: "Completed",
    value: String(completed),
    helper: `${completionRate}% completion rate`,
    tone: "emerald",
  },
  {
    label: "Pending",
    value: String(pending),
    helper: "Active work in this month",
    tone: "amber",
  },
  {
    label: "Overdue",
    value: String(overdue),
    helper: overdue === 0 ? "No overdue pressure" : "Needs attention",
    tone: "rose",
  },
];

const buildStatusSegments = (completed: number, pending: number): ChartSegment[] => [
  { label: "Completed", value: completed, color: "#10b981" },
  { label: "Pending", value: pending, color: "#f59e0b" },
];

const buildPrioritySegments = (tasks: Task[]): ChartSegment[] => [
  { label: "High", value: getPriorityCount(tasks, "HIGH"), color: "#f43f5e" },
  { label: "Medium", value: getPriorityCount(tasks, "MEDIUM"), color: "#06b6d4" },
  { label: "Low", value: getPriorityCount(tasks, "LOW"), color: "#8b5cf6" },
];

const buildMonthlySeries = (tasks: Task[], year: number): MonthlyTaskStat[] =>
  Array.from({ length: 12 }, (_, month) => {
    const monthTasks = tasks.filter((task) =>
      isSameMonth(parseTaskDate(task), { year, month }),
    );
    const completed = monthTasks.filter((task) => task.status === "COMPLETED")
      .length;
    const total = monthTasks.length;

    return {
      month,
      label: getMonthLabel(year, month),
      total,
      completed,
      pending: total - completed,
      completionRate: percentage(completed, total),
    };
  });

const buildDailyTrend = (
  tasks: Task[],
  filters: DailyTaskStatsFilters,
): DailyTaskTrend[] => {
  const daysInMonth = new Date(filters.year, filters.month + 1, 0).getDate();

  return Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;
    const dayTasks = tasks.filter((task) => {
      const taskDate = parseTaskDate(task);

      return isSameMonth(taskDate, filters) && taskDate.getDate() === day;
    });
    const completed = dayTasks.filter((task) => task.status === "COMPLETED")
      .length;

    return {
      day,
      label: String(day),
      total: dayTasks.length,
      completed,
    };
  });
};

export const getAvailableYears = (tasks: Task[]) => {
  const years = new Set<number>([new Date().getFullYear()]);

  tasks.forEach((task) => {
    years.add(parseTaskDate(task).getFullYear());
  });

  return [...years].sort((a, b) => b - a);
};

export const getDailyTaskStats = (
  tasks: Task[],
  filters: DailyTaskStatsFilters,
): DailyTaskStats => {
  const monthTasks = tasks.filter((task) => isSameMonth(parseTaskDate(task), filters));
  const completed = monthTasks.filter((task) => task.status === "COMPLETED").length;
  const total = monthTasks.length;
  const pending = total - completed;
  const overdue = getOverdueCount(monthTasks);
  const completionRate = percentage(completed, total);

  return {
    total,
    completed,
    pending,
    highPriority: getPriorityCount(monthTasks, "HIGH"),
    overdue,
    completionRate,
    statusSegments: buildStatusSegments(completed, pending),
    prioritySegments: buildPrioritySegments(monthTasks),
    monthlySeries: buildMonthlySeries(tasks, filters.year),
    dailyTrend: buildDailyTrend(tasks, filters),
    cards: buildCards({
      total,
      completed,
      pending,
      overdue,
      completionRate,
    }),
  };
};

export const getMonthOptions = () =>
  Array.from({ length: 12 }, (_, month) => ({
    value: month,
    label: getMonthLabel(new Date().getFullYear(), month),
  }));
