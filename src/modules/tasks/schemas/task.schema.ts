import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  due_date: z.string().optional(),
});

export type TaskFormValues = z.infer<typeof taskSchema>;
