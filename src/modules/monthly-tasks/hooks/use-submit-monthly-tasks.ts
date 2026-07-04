import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { monthlyTasksService } from "../services/monthly-tasks.service";
import type { SaveMonthlyTaskCompletionPayload } from "../types/monthly-task.types";

interface SubmitMonthlyTasksPayload {
  items: SaveMonthlyTaskCompletionPayload[];
  year: number;
  month: number;
}

export const MONTHLY_TASKS_QUERY_KEY = ["monthly-tasks"] as const;

export function useMonthlyTaskCompletions(year: number, month: number) {
  return useQuery({
    queryKey: [...MONTHLY_TASKS_QUERY_KEY, year, month] as const,
    queryFn: () => monthlyTasksService.getMonthlyCompletions(year, month),
  });
}

export function useSubmitMonthlyTasks() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ items }: SubmitMonthlyTasksPayload) =>
      monthlyTasksService.saveCompletions({
        items,
      }),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [...MONTHLY_TASKS_QUERY_KEY, variables.year, variables.month],
      });
    },
  });
}
