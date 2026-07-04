import { tasksApi } from "../api/tasks.api";

import type { CreateTaskPayload, UpdateTaskPayload } from "../types/task.types";

export const tasksService = {
  getTasks() {
    return tasksApi.getTasks();
  },

  getTask(taskId: string) {
    return tasksApi.getTask(taskId);
  },

  createTask(payload: CreateTaskPayload) {
    return tasksApi.createTask(payload);
  },

  updateTask(taskId: string, payload: UpdateTaskPayload) {
    return tasksApi.updateTask(taskId, payload);
  },

  deleteTask(taskId: string) {
    return tasksApi.deleteTask(taskId);
  },
};
