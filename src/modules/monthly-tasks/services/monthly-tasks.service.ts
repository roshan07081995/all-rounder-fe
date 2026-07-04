import { monthlyTasksApi } from "../api/monthly-tasks.api";

import type {
  SaveMonthlyTaskCompletionPayload,
  SaveMonthlyTaskCompletionsPayload,
} from "../types/monthly-task.types";

export const monthlyTasksService = {
  getMonthlyCompletions(year: number, month: number) {
    return monthlyTasksApi.getMonthlyCompletions(year, month);
  },

  saveCompletion(payload: SaveMonthlyTaskCompletionPayload) {
    return monthlyTasksApi.saveCompletion(payload);
  },

  saveCompletions(payload: SaveMonthlyTaskCompletionsPayload) {
    return monthlyTasksApi.saveCompletions(payload);
  },

  deleteCompletion(completionId: string) {
    return monthlyTasksApi.deleteCompletion(completionId);
  },
};
