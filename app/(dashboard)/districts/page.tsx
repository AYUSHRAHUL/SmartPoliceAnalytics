import { DistrictPerformanceChart } from "@/components/analytics/DistrictPerformanceChart";
import { TrendChart } from "@/components/analytics/TrendChart";
import { AIInsightsPanel } from "@/components/analytics/AIInsightsPanel";
import { UnitLeaderboard } from "@/components/leaderboard/UnitLeaderboard";
import { getDistrictPerformance } from "@/lib/services/districtAnalytics";
import { getMonthlyTrend } from "@/lib/services/trendAnalysis";
import { predictUnderperformingDistricts, generateNLSummary } from "@/lib/services/aiInsights";

export default async function DistrictsPage() {
  const districts = await getDistrictPerformance();
  const casesTrend = await getMonthlyTrend("cases", undefined, 12);
  const convictionsTrend = await getMonthlyTrend("convictions", undefined, 12);
  const [predictions, summary] = await Promise.all([
    predictUnderperformingDistricts(),
    generateNLSummary("month")
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">District Analytics</h1>
        <p className="text-sm text-slate-400 mt-1">
          Comprehensive performance analysis by district with trend analysis and AI insights.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <TrendChart data={casesTrend} title="Cases Trend (Monthly)" metric="cases" />
        <TrendChart
          data={convictionsTrend}
          title="Convictions Trend (Monthly)"
          metric="convictions"
        />
      </div>

      <DistrictPerformanceChart data={districts} />

      <div className="grid gap-6 lg:grid-cols-2">
        <UnitLeaderboard type="district" />
        <AIInsightsPanel predictions={predictions} summary={summary} />
      </div>
    </div>
  );
}

