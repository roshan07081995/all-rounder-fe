import {
  CheckCircle2,
  Flame,
  Target,
  Timer,
} from "lucide-react";

import type {
  ActivityItem,
  DashboardMetric,
  FocusArea,
  TodayTask,
  WeeklyProgressItem,
} from "../types/dashboard.types";

export const dashboardMetrics: DashboardMetric[] = [
  {
    id: "completion",
    label: "Daily completion",
    value: "84%",
    change: "+12% from last week",
    tone: "blue",
    icon: CheckCircle2,
  },
  {
    id: "streak",
    label: "Current streak",
    value: "18 days",
    change: "Best run this quarter",
    tone: "emerald",
    icon: Flame,
  },
  {
    id: "focus",
    label: "Deep work",
    value: "6.5h",
    change: "1.2h above target",
    tone: "amber",
    icon: Timer,
  },
  {
    id: "goals",
    label: "Active goals",
    value: "7",
    change: "3 due this week",
    tone: "rose",
    icon: Target,
  },
];

export const todayTasks: TodayTask[] = [
  {
    id: "task-1",
    title: "Ship login API integration",
    category: "Engineering",
    time: "09:30",
    status: "done",
  },
  {
    id: "task-2",
    title: "Strength training and mobility",
    category: "Health",
    time: "18:00",
    status: "in-progress",
  },
  {
    id: "task-3",
    title: "Review weekly product roadmap",
    category: "Planning",
    time: "20:15",
    status: "up-next",
  },
  {
    id: "task-4",
    title: "Read 25 pages before sleep",
    category: "Learning",
    time: "22:00",
    status: "up-next",
  },
];

export const weeklyProgress: WeeklyProgressItem[] = [
  {
    id: "coding",
    label: "Coding",
    value: 78,
    target: "28h / 36h",
  },
  {
    id: "fitness",
    label: "Fitness",
    value: 64,
    target: "4 / 6 sessions",
  },
  {
    id: "learning",
    label: "Learning",
    value: 52,
    target: "13h / 25h",
  },
  {
    id: "recovery",
    label: "Recovery",
    value: 86,
    target: "43h / 50h sleep",
  },
];

export const recentActivity: ActivityItem[] = [
  {
    id: "activity-1",
    title: "Habit score improved",
    description: "Morning routine consistency moved from 71% to 79%.",
    time: "12 min ago",
  },
  {
    id: "activity-2",
    title: "Goal checkpoint added",
    description: "Backend auth and dashboard foundation marked complete.",
    time: "46 min ago",
  },
  {
    id: "activity-3",
    title: "Focus session logged",
    description: "Completed a 90 minute frontend architecture block.",
    time: "2h ago",
  },
];

export const focusAreas: FocusArea[] = [
  {
    id: "engineering",
    label: "Engineering",
    value: "High",
    description: "Keep the momentum on auth, tasks, and dashboard APIs.",
  },
  {
    id: "fitness",
    label: "Fitness",
    value: "Medium",
    description: "One strength session keeps the weekly plan balanced.",
  },
  {
    id: "learning",
    label: "Learning",
    value: "Medium",
    description: "Protect one reading block after the evening review.",
  },
];
