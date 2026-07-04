import {
  DashboardHeader,
  FocusPanel,
  MetricCard,
  RecentActivity,
  TodayPlan,
  WeeklyProgress,
} from "../components";
import {
  dashboardMetrics,
  focusAreas,
  recentActivity,
  todayTasks,
  weeklyProgress,
} from "../data/dashboard.data";

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(340px,0.65fr)]">
        <TodayPlan tasks={todayTasks} />

        <FocusPanel items={focusAreas} />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <WeeklyProgress items={weeklyProgress} />

        <RecentActivity items={recentActivity} />
      </section>
    </div>
  );
}
