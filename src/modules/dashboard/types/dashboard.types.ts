import type { LucideIcon } from "lucide-react";

export interface DashboardMetric {
  id: string;
  label: string;
  value: string;
  change: string;
  tone: "blue" | "emerald" | "amber" | "rose";
  icon: LucideIcon;
}

export interface TodayTask {
  id: string;
  title: string;
  category: string;
  time: string;
  status: "done" | "in-progress" | "up-next";
}

export interface WeeklyProgressItem {
  id: string;
  label: string;
  value: number;
  target: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  time: string;
}

export interface FocusArea {
  id: string;
  label: string;
  value: string;
  description: string;
}
