import { getAnalyticsOverview } from "@/lib/services/analytics";
import { LineTrend } from "@/components/charts/LineTrend";
import { BarContribution } from "@/components/charts/BarContribution";
import { PieRecognition } from "@/components/charts/PieRecognition";

export default async function AnalyticsPage() {
  const { trendData, departmentData, recognitionData } = await getAnalyticsOverview();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Analytics & Insights</h1>
        <p className="text-sm text-slate-400">
          Monitor officer performance trends, department contributions, and recognition distribution to
          make data-driven decisions.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <LineTrend data={trendData} />
        <BarContribution data={departmentData} />
      </div>
      <PieRecognition data={recognitionData} />
    </div>
  );
}


