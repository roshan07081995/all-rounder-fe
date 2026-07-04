import type { Task } from "@/modules/tasks/types/task.types";

export interface MonthDay {
  date: Date;
  dateKey: string;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
}

export const toDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const getMonthLabel = (date: Date) =>
  new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  }).format(date);

export const getMonthDays = (monthDate: Date): MonthDay[] => {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const todayKey = toDateKey(new Date());
  const days: MonthDay[] = [];

  const gridStart = new Date(firstDay);
  gridStart.setDate(firstDay.getDate() - firstDay.getDay());

  const gridEnd = new Date(lastDay);
  gridEnd.setDate(lastDay.getDate() + (6 - lastDay.getDay()));

  const cursor = new Date(gridStart);

  while (cursor <= gridEnd) {
    const date = new Date(cursor);
    const dateKey = toDateKey(date);

    days.push({
      date,
      dateKey,
      dayNumber: date.getDate(),
      isCurrentMonth: date.getMonth() === month,
      isToday: dateKey === todayKey,
    });

    cursor.setDate(cursor.getDate() + 1);
  }

  return days;
};

export const getCurrentMonthDays = (monthDate: Date): MonthDay[] => {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const lastDay = new Date(year, month + 1, 0).getDate();

  return Array.from({ length: lastDay }, (_, index) => {
    const date = new Date(year, month, index + 1);
    const dateKey = toDateKey(date);

    return {
      date,
      dateKey,
      dayNumber: date.getDate(),
      isCurrentMonth: true,
      isToday: dateKey === toDateKey(new Date()),
    };
  });
};

export const groupTasksByDueDate = (tasks: Task[]) =>
  tasks.reduce<Record<string, Task[]>>((groupedTasks, task) => {
    if (!task.due_date) {
      return groupedTasks;
    }

    groupedTasks[task.due_date] = [...(groupedTasks[task.due_date] ?? []), task];

    return groupedTasks;
  }, {});

export const getMonthTaskStats = (tasks: Task[], monthDate: Date) => {
  const month = monthDate.getMonth();
  const year = monthDate.getFullYear();
  const monthlyTasks = tasks.filter((task) => {
    if (!task.due_date) {
      return false;
    }

    const taskDate = new Date(`${task.due_date}T00:00:00`);

    return taskDate.getMonth() === month && taskDate.getFullYear() === year;
  });
  const completedTasks = monthlyTasks.filter(
    (task) => task.status === "COMPLETED"
  );

  return {
    total: monthlyTasks.length,
    completed: completedTasks.length,
    pending: monthlyTasks.length - completedTasks.length,
    completionRate:
      monthlyTasks.length === 0
        ? 0
        : Math.round((completedTasks.length / monthlyTasks.length) * 100),
  };
};
