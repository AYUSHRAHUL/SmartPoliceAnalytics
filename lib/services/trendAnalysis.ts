import { connectMongo } from "../db";
import { OfficerModel, CCTNSDataModel } from "../models";

export interface TrendDataPoint {
  period: string; // "YYYY-MM" or "YYYY-MM-DD"
  value: number;
  label?: string;
}

export interface TrendAnalysis {
  data: TrendDataPoint[];
  trend: "increasing" | "decreasing" | "stable";
  changePercent: number;
  average: number;
}

/**
 * Get month-wise trend analysis
 */
export async function getMonthlyTrend(
  metric: "cases" | "convictions" | "detections" | "score",
  district?: string,
  months = 12
): Promise<TrendAnalysis> {
  await connectMongo();

  const endDate = new Date();
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - months);

  const query: Record<string, unknown> = {};
  if (district) {
    query.district = district;
  }

  let dataPoints: TrendDataPoint[] = [];

  if (metric === "cases") {
    const officers = await OfficerModel.find(query).lean();
    const monthlyData = new Map<string, number>();

    officers.forEach((officer: any) => {
      const month = officer.lastUpdated?.toISOString().slice(0, 7) || "2025-01";
      monthlyData.set(month, (monthlyData.get(month) || 0) + (officer.caseClosed || 0));
    });

    dataPoints = Array.from(monthlyData.entries())
      .map(([period, value]) => ({ period, value }))
      .sort((a, b) => a.period.localeCompare(b.period));
  } else if (metric === "convictions") {
    query.module = "Convictions";
    const convictions = await CCTNSDataModel.find(query).lean();
    const monthlyData = new Map<string, number>();

    convictions.forEach((conv: any) => {
      const month =
        conv.convictionDate?.toISOString().slice(0, 7) ||
        conv.createdAt.toISOString().slice(0, 7);
      monthlyData.set(month, (monthlyData.get(month) || 0) + 1);
    });

    dataPoints = Array.from(monthlyData.entries())
      .map(([period, value]) => ({ period, value }))
      .sort((a, b) => a.period.localeCompare(b.period));
  } else if (metric === "detections") {
    query.module = "Detections";
    const detections = await CCTNSDataModel.find(query).lean();
    const monthlyData = new Map<string, number>();

    detections.forEach((det: any) => {
      const month =
        det.detectionDate?.toISOString().slice(0, 7) || det.createdAt.toISOString().slice(0, 7);
      monthlyData.set(month, (monthlyData.get(month) || 0) + 1);
    });

    dataPoints = Array.from(monthlyData.entries())
      .map(([period, value]) => ({ period, value }))
      .sort((a, b) => a.period.localeCompare(b.period));
  } else if (metric === "score") {
    const officers = await OfficerModel.find(query).lean();
    const monthlyData = new Map<string, { total: number; count: number }>();

    officers.forEach((officer: any) => {
      const month = officer.lastUpdated?.toISOString().slice(0, 7) || "2025-01";
      const existing = monthlyData.get(month) || { total: 0, count: 0 };
      existing.total += officer.totalScore || 0;
      existing.count++;
      monthlyData.set(month, existing);
    });

    dataPoints = Array.from(monthlyData.entries())
      .map(([period, stats]) => ({
        period,
        value: stats.count > 0 ? Number((stats.total / stats.count).toFixed(2)) : 0
      }))
      .sort((a, b) => a.period.localeCompare(b.period));
  }

  // Calculate trend
  if (dataPoints.length < 2) {
    return {
      data: dataPoints,
      trend: "stable",
      changePercent: 0,
      average: dataPoints[0]?.value || 0
    };
  }

  const first = dataPoints[0].value;
  const last = dataPoints[dataPoints.length - 1].value;
  const changePercent = first > 0 ? Number((((last - first) / first) * 100).toFixed(2)) : 0;
  const trend = changePercent > 5 ? "increasing" : changePercent < -5 ? "decreasing" : "stable";
  const average =
    dataPoints.length > 0
      ? Number(
          (dataPoints.reduce((sum: number, point: any) => sum + point.value, 0) / dataPoints.length).toFixed(
            2
          )
        )
      : 0;

  return {
    data: dataPoints.slice(-months), // Last N months
    trend,
    changePercent,
    average
  };
}

/**
 * Get drive-wise trend analysis
 */
export async function getDriveTrend(driveName: string): Promise<TrendDataPoint[]> {
  await connectMongo();

  const drives = await CCTNSDataModel.find({
    module: "SpecialDrives",
    driveName
  })
    .sort({ driveDate: 1 })
    .lean();

  const driveMap = new Map<string, number>();

  drives.forEach((drive: any) => {
    const date = drive.driveDate?.toISOString().slice(0, 10) || drive.createdAt.toISOString().slice(0, 10);
    driveMap.set(date, (driveMap.get(date) || 0) + (drive.casesHandled || 0));
  });

  return Array.from(driveMap.entries())
    .map(([period, value]) => ({ period, value }))
    .sort((a, b) => a.period.localeCompare(b.period));
}

