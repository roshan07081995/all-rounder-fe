import { api } from "@/lib/axios";

import type {
  MonthlyTaskCompletion,
  SaveMonthlyTaskCompletionPayload,
  SaveMonthlyTaskCompletionsPayload,
  SaveMonthlyTaskCompletionsResponse,
} from "../types/monthly-task.types";

const MONTHLY_TASK_ENDPOINTS = {
  list: "/monthly-tasks",
  bulk: "/monthly-tasks/bulk",
  detail: (completionId: string) => `/monthly-tasks/${completionId}`,
} as const;

export const monthlyTasksApi = {
  async getMonthlyCompletions(
    year: number,
    month: number
  ): Promise<MonthlyTaskCompletion[]> {
    const { data } = await api.get<MonthlyTaskCompletion[]>(
      MONTHLY_TASK_ENDPOINTS.list,
      {
        params: {
          year,
          month,
        },
      }
    );

    return data;
  },

  async saveCompletion(
    payload: SaveMonthlyTaskCompletionPayload
  ): Promise<MonthlyTaskCompletion> {
    const { data } = await api.post<MonthlyTaskCompletion>(
      MONTHLY_TASK_ENDPOINTS.list,
      payload
    );

    return data;
  },

  async saveCompletions(
    payload: SaveMonthlyTaskCompletionsPayload
  ): Promise<SaveMonthlyTaskCompletionsResponse> {
    const { data } = await api.post<SaveMonthlyTaskCompletionsResponse>(
      MONTHLY_TASK_ENDPOINTS.bulk,
      payload
    );

    return data;
  },

  async deleteCompletion(completionId: string): Promise<void> {
    await api.delete(MONTHLY_TASK_ENDPOINTS.detail(completionId));
  },
};
