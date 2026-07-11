import { AlertCircle } from "lucide-react";

import { useStudyTopics } from "../hooks/use-study-topics";
import { StudyTopicDashboard } from "./study-topic-dashboard";
import { StudyTopicForm } from "./study-topic-form";
import { StudyTopicList } from "./study-topic-list";

export function StudyTopicManager() {
  const { data: topics = [], isError, isLoading } = useStudyTopics();

  return (
    <section className="space-y-4">
      <StudyTopicDashboard topics={topics} />

      <StudyTopicForm />

      {isError && (
        <div className="flex items-start gap-3 rounded-lg border border-rose-200 bg-rose-50 p-4 text-rose-700">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-semibold">
              Could not load study topics
            </p>
            <p className="mt-1 text-sm">
              Check that you are logged in, the backend is running, and the
              study_topics migration is applied.
            </p>
          </div>
        </div>
      )}

      <StudyTopicList topics={topics} isLoading={isLoading} />
    </section>
  );
}
