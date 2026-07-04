import { api } from "@/lib/axios";

import type {
  CreateTaskPayload,
  Task,
  UpdateTaskPayload,
} from "../types/task.types";

const TASK_ENDPOINTS = {
  list: "/tasks",
  detail: (taskId: string) => `/tasks/${taskId}`,
} as const;

export const tasksApi = {
  async getTasks(): Promise<Task[]> {
    const { data } = await api.get<Task[]>(TASK_ENDPOINTS.list);

    return data;
  },

  async getTask(taskId: string): Promise<Task> {
    const { data } = await api.get<Task>(TASK_ENDPOINTS.detail(taskId));

    return data;
  },

  async createTask(payload: CreateTaskPayload): Promise<Task> {
    const { data } = await api.post<Task>(TASK_ENDPOINTS.list, payload);

    return data;
  },

  async updateTask(taskId: string, payload: UpdateTaskPayload): Promise<Task> {
    const { data } = await api.put<Task>(TASK_ENDPOINTS.detail(taskId), payload);

    return data;
  },

  async deleteTask(taskId: string): Promise<void> {
    await api.delete(TASK_ENDPOINTS.detail(taskId));
  },
};
