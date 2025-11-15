import { connectMongo } from "../db";
import { OfficerModel, CCTNSDataModel } from "../models";
import { getDistrictPerformance, getTopDistricts } from "./districtAnalytics";
import { getMonthlyTrend } from "./trendAnalysis";

export interface PerformancePrediction {
  district: string;
  currentScore: number;
  predictedScore: number;
  riskLevel: "low" | "medium" | "high";
  factors: string[];
  recommendation: string;
}

export interface NLSummary {
  summary: string;
  highlights: string[];
  topPerformer?: string;
  areaOfConcern?: string;
}

/**
 * Predict underperforming districts based on trends
 */
export async function predictUnderperformingDistricts(): Promise<PerformancePrediction[]> {
  await connectMongo();

  const districts = await getDistrictPerformance();
  const predictions: PerformancePrediction[] = [];

  for (const district of districts) {
    const trend = await getMonthlyTrend("score", district.district, 6);

    // Simple prediction: extrapolate trend
    const predictedScore =
      trend.trend === "increasing"
        ? district.averageScore * 1.1
        : trend.trend === "decreasing"
          ? district.averageScore * 0.9
          : district.averageScore;

    const riskLevel: "low" | "medium" | "high" =
      district.averageScore < 50 || trend.changePercent < -10
        ? "high"
        : district.averageScore < 70 || trend.changePercent < -5
          ? "medium"
          : "low";

    const factors: string[] = [];
    if (district.convictionRatio && district.convictionRatio < 30) {
      factors.push("Low conviction ratio");
    }
    if (district.totalCasesClosed < 10) {
      factors.push("Low case closure rate");
    }
    if (trend.changePercent < -5) {
      factors.push("Declining performance trend");
    }

    let recommendation = "";
    if (riskLevel === "high") {
      recommendation = `Immediate intervention required. Focus on training, resource allocation, and performance monitoring.`;
    } else if (riskLevel === "medium") {
      recommendation = `Monitor closely and provide additional support. Review processes and identify improvement areas.`;
    } else {
      recommendation = `Maintain current performance levels. Continue best practices.`;
    }

    predictions.push({
      district: district.district,
      currentScore: district.averageScore,
      predictedScore: Number(predictedScore.toFixed(2)),
      riskLevel,
      factors,
      recommendation
    });
  }

  return predictions.sort((a, b) => {
    const riskOrder = { high: 3, medium: 2, low: 1 };
    return riskOrder[b.riskLevel] - riskOrder[a.riskLevel];
  });
}

/**
 * Generate natural language summary
 */
export async function generateNLSummary(
  period: "week" | "month" | "quarter" = "month"
): Promise<NLSummary> {
  await connectMongo();

  const districts = await getTopDistricts(5);
  const topDistrict = districts[0];

  // Get recent data
  const endDate = new Date();
  const startDate = new Date();
  if (period === "week") {
    startDate.setDate(startDate.getDate() - 7);
  } else if (period === "month") {
    startDate.setMonth(startDate.getMonth() - 1);
  } else {
    startDate.setMonth(startDate.getMonth() - 3);
  }

  const recentDetections = await CCTNSDataModel.find({
    module: "Detections",
    createdAt: { $gte: startDate, $lte: endDate }
  }).lean();

  const recentConvictions = await CCTNSDataModel.find({
    module: "Convictions",
    createdAt: { $gte: startDate, $lte: endDate }
  }).lean();

  // Find top performing district for specific metrics
  const districtStats = await getDistrictPerformance();
  const topNarcoticsDistrict = districtStats
    .filter((d) => d.drugSeizureVolume && d.drugSeizureVolume > 0)
    .sort((a, b) => (b.drugSeizureVolume || 0) - (a.drugSeizureVolume || 0))[0];

  const highlights: string[] = [];

  if (topDistrict) {
    highlights.push(
      `${topDistrict.district} leads with an average score of ${topDistrict.averageScore} across ${topDistrict.totalOfficers} officers.`
    );
  }

  if (topNarcoticsDistrict && topNarcoticsDistrict.drugSeizureVolume) {
    const arrests = Math.floor(topNarcoticsDistrict.drugSeizureVolume / 1000);
    highlights.push(
      `This ${period}, ${topNarcoticsDistrict.district} led in narcotics enforcement with ${arrests} arrests and ₹${topNarcoticsDistrict.drugSeizureVolume.toLocaleString()} in value recovered.`
    );
  }

  if (recentConvictions.length > 0) {
    highlights.push(
      `${recentConvictions.length} convictions were secured this ${period}, demonstrating strong legal outcomes.`
    );
  }

  // Find area of concern
  const underperformers = await predictUnderperformingDistricts();
  const concernDistrict = underperformers.find((p) => p.riskLevel === "high");

  let summary = `Performance Summary for ${period === "week" ? "the past week" : period === "month" ? "this month" : "this quarter"}: `;
  summary += highlights.join(" ");

  if (concernDistrict) {
    summary += ` Areas requiring attention: ${concernDistrict.district} shows declining trends and needs intervention.`;
  }

  return {
    summary,
    highlights,
    topPerformer: topDistrict?.district,
    areaOfConcern: concernDistrict?.district
  };
}

