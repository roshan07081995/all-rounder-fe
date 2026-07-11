import { z } from "zod";

export const studyTopicSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().optional(),
  subject: z.string().optional(),
  target_date: z.string().optional(),
  is_completed: z.boolean(),
});

export type StudyTopicFormValues = z.infer<typeof studyTopicSchema>;
