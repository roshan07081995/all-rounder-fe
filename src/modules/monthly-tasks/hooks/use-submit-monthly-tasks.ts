import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  TASKS_QUERY_KEY,
} from "@/modules/tasks/hooks/use-tasks";
import { tasksService } from "@/modules/tasks/services/tasks.service";
import type { UpdateTaskPayload } from "@/modules/tasks/types/task.types";

interface SubmitMonthlyTasksPayload {
  changes: Record<string, UpdateTaskPayload>;
}

export function useSubmitMonthlyTasks() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ changes }: SubmitMonthlyTasksPayload) => {
      const updates = Object.entries(changes).map(([taskId, payload]) =>
        tasksService.updateTask(taskId, payload)
      );

      return Promise.all(updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY });
    },
  });
}
