export interface StudyTopic {
  id: string;
  title: string;
  description: string | null;
  subject: string | null;
  target_date: string | null;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateStudyTopicPayload {
  title: string;
  description?: string | null;
  subject?: string | null;
  target_date?: string | null;
  is_completed?: boolean;
}

export type UpdateStudyTopicPayload = Partial<CreateStudyTopicPayload>;
