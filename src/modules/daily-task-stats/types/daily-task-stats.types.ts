export interface DailyTaskStatsFilters {
  year: number;
  month: number;
}

export interface StatCardMetric {
  label: string;
  value: string;
  helper: string;
  tone: "blue" | "emerald" | "amber" | "rose";
}

export interface ChartSegment {
  label: string;
  value: number;
  color: string;
}

export interface MonthlyTaskStat {
  month: number;
  label: string;
  total: number;
  completed: number;
  pending: number;
  completionRate: number;
}

export interface DailyTaskTrend {
  day: number;
  label: string;
  total: number;
  completed: number;
}

export interface DailyTaskStats {
  total: number;
  completed: number;
  pending: number;
  highPriority: number;
  overdue: number;
  completionRate: number;
  statusSegments: ChartSegment[];
  prioritySegments: ChartSegment[];
  monthlySeries: MonthlyTaskStat[];
  dailyTrend: DailyTaskTrend[];
  cards: StatCardMetric[];
}
