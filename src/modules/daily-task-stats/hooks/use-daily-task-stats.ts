import { useMemo, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { TASKS_QUERY_KEY } from "@/modules/tasks/hooks/use-tasks";
import { tasksService } from "@/modules/tasks/services/tasks.service";

import {
  getAvailableYears,
  getDailyTaskStats,
  getMonthOptions,
} from "../utils/daily-task-stats.utils";

export function useDailyTaskStats() {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const tasksQuery = useQuery({
    queryKey: TASKS_QUERY_KEY,
    queryFn: tasksService.getTasks,
    refetchInterval: 30_000,
  });

  const tasks = tasksQuery.data ?? [];

  const stats = useMemo(
    () => getDailyTaskStats(tasks, { month, year }),
    [month, tasks, year],
  );

  const availableYears = useMemo(() => getAvailableYears(tasks), [tasks]);
  const monthOptions = useMemo(() => getMonthOptions(), []);

  return {
    stats,
    tasks,
    month,
    year,
    setMonth,
    setYear,
    monthOptions,
    availableYears,
    isLoading: tasksQuery.isLoading,
    isError: tasksQuery.isError,
    isFetching: tasksQuery.isFetching,
  };
}
