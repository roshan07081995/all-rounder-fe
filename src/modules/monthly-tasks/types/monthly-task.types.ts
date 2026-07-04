export interface MonthlyTaskCompletion {
  id: string;
  user_id: number;
  task_id: string;
  completion_date: string;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface SaveMonthlyTaskCompletionPayload {
  task_id: string;
  completion_date: string;
  is_completed: boolean;
}

export interface SaveMonthlyTaskCompletionsPayload {
  items: SaveMonthlyTaskCompletionPayload[];
}

export interface SaveMonthlyTaskCompletionsResponse {
  items: MonthlyTaskCompletion[];
}
