import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { tasksService } from "../services/tasks.service";

import type { CreateTaskPayload, UpdateTaskPayload } from "../types/task.types";

export const TASKS_QUERY_KEY = ["tasks"] as const;

export function useTasks() {
  return useQuery({
    queryKey: TASKS_QUERY_KEY,
    queryFn: tasksService.getTasks,
  });
}

export function useTask(taskId: string) {
  return useQuery({
    queryKey: [...TASKS_QUERY_KEY, taskId],
    queryFn: () => tasksService.getTask(taskId),
    enabled: Boolean(taskId),
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTaskPayload) => tasksService.createTask(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY });
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      taskId,
      payload,
    }: {
      taskId: string;
      payload: UpdateTaskPayload;
    }) => tasksService.updateTask(taskId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY });
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: string) => tasksService.deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY });
    },
  });
}
