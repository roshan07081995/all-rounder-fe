import type { StudyTopic } from "../types/study-topic.types";

export interface SubjectProgress {
  subject: string;
  total: number;
  completed: number;
  pending: number;
  completionRate: number;
}

export interface StudyTopicProgressStats {
  total: number;
  completed: number;
  pending: number;
  overdue: number;
  dueThisWeek: number;
  completionRate: number;
  subjectProgress: SubjectProgress[];
  nextTopics: StudyTopic[];
}

const startOfToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

const getTargetDate = (topic: StudyTopic) => {
  if (!topic.target_date) {
    return null;
  }

  return new Date(`${topic.target_date}T00:00:00`);
};

const getCompletionRate = (completed: number, total: number) => {
  if (total === 0) {
    return 0;
  }

  return Math.round((completed / total) * 100);
};

export const getStudyTopicProgressStats = (
  topics: StudyTopic[]
): StudyTopicProgressStats => {
  const today = startOfToday();
  const weekEnd = new Date(today);
  weekEnd.setDate(today.getDate() + 7);

  const total = topics.length;
  const completed = topics.filter((topic) => topic.is_completed).length;
  const pending = total - completed;
  const overdue = topics.filter((topic) => {
    const targetDate = getTargetDate(topic);

    return Boolean(
      targetDate && targetDate < today && !topic.is_completed
    );
  }).length;
  const dueThisWeek = topics.filter((topic) => {
    const targetDate = getTargetDate(topic);

    return Boolean(
      targetDate &&
        targetDate >= today &&
        targetDate <= weekEnd &&
        !topic.is_completed
    );
  }).length;

  const subjectMap = topics.reduce<Record<string, SubjectProgress>>(
    (acc, topic) => {
      const subject = topic.subject?.trim() || "General";

      if (!acc[subject]) {
        acc[subject] = {
          subject,
          total: 0,
          completed: 0,
          pending: 0,
          completionRate: 0,
        };
      }

      acc[subject].total += 1;

      if (topic.is_completed) {
        acc[subject].completed += 1;
      } else {
        acc[subject].pending += 1;
      }

      acc[subject].completionRate = getCompletionRate(
        acc[subject].completed,
        acc[subject].total
      );

      return acc;
    },
    {}
  );

  const nextTopics = [...topics]
    .filter((topic) => !topic.is_completed)
    .sort((first, second) => {
      const firstTargetDate = getTargetDate(first)?.getTime() ?? Infinity;
      const secondTargetDate = getTargetDate(second)?.getTime() ?? Infinity;

      return firstTargetDate - secondTargetDate;
    })
    .slice(0, 5);

  return {
    total,
    completed,
    pending,
    overdue,
    dueThisWeek,
    completionRate: getCompletionRate(completed, total),
    subjectProgress: Object.values(subjectMap).sort(
      (first, second) => second.total - first.total
    ),
    nextTopics,
  };
};

export const formatStudyTargetDate = (date: string | null) => {
  if (!date) {
    return "No target date";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
};
