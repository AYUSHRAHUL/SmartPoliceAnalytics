import { DrivePerformanceCard } from "@/components/analytics/DrivePerformanceCard";
import { TrendChart } from "@/components/analytics/TrendChart";
import { getDrivePerformance } from "@/lib/services/districtAnalytics";
import { getDriveTrend } from "@/lib/services/trendAnalysis";

export default async function DrivesPage() {
  const drives = await getDrivePerformance();
  // Get trend for first drive if available
  const firstDriveTrend =
    drives.length > 0
      ? {
          data: await getDriveTrend(drives[0].driveName),
          trend: "stable" as const,
          changePercent: 0,
          average: drives[0].averageCasesPerOfficer
        }
      : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Special Drives Performance</h1>
        <p className="text-sm text-slate-400 mt-1">
          Track performance across special drives and campaigns with detailed metrics.
        </p>
      </div>

      {firstDriveTrend && (
        <TrendChart
          data={firstDriveTrend}
          title={`${drives[0]?.driveName} - Cases Handled Trend`}
          metric="cases"
        />
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {drives.map((drive, idx) => (
          <DrivePerformanceCard key={idx} drive={drive} />
        ))}
      </div>

      {drives.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          No drive data available. Upload data to see drive performance.
        </div>
      )}
    </div>
  );
}

