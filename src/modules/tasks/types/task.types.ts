export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export type TaskStatus = "PENDING" | "COMPLETED";

export interface Task {
  id: string;
  title: string;
  description: string | null;
  priority: TaskPriority;
  status: TaskStatus;
  due_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateTaskPayload {
  title: string;
  description?: string | null;
  priority: TaskPriority;
  due_date?: string | null;
}

export type UpdateTaskPayload = Partial<CreateTaskPayload> & {
  status?: TaskStatus;
};
