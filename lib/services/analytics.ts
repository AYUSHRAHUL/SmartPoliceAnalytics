import { connectMongo } from "../db";
import { OfficerModel, RecognitionModel } from "../models";
import { getDemoOfficers } from "../demo";

export async function getAnalyticsOverview() {
  await connectMongo();
  const officersDb = await OfficerModel.find().lean();
  const officers = officersDb.length ? officersDb : getDemoOfficers(30);

  const trend = officers
    .map((officer) => ({
      month: officer.lastUpdated?.toISOString().slice(0, 7) ?? "2025-01",
      score: officer.totalScore
    }))
    .reduce<Record<string, { total: number; count: number }>>((acc, item) => {
      if (!acc[item.month]) {
        acc[item.month] = { total: 0, count: 0 };
      }
      acc[item.month].total += item.score;
      acc[item.month].count += 1;
      return acc;
    }, {});

  const trendData = Object.entries(trend)
    .map(([month, value]) => ({
      month,
      average: Number((value.total / value.count).toFixed(2))
    }))
    .sort((a, b) => a.month.localeCompare(b.month))
    .slice(-6);

  const departmentMap = officers.reduce<Record<string, number>>((acc, officer) => {
    acc[officer.department] = (acc[officer.department] ?? 0) + officer.totalScore;
    return acc;
  }, {});

  const departmentData = Object.entries(departmentMap)
    .map(([department, total]) => ({ department, total: Number(total.toFixed(2)) }))
    .sort((a, b) => b.total - a.total);

  let recognitionData: { badge: string; count: number }[];

  if (officersDb.length) {
    const recognitionCounts = await RecognitionModel.aggregate([
      { $group: { _id: "$badge", count: { $sum: 1 } } }
    ]);
    recognitionData = recognitionCounts.map((item) => ({
      badge: item._id,
      count: item.count
    }));
  } else {
    recognitionData = [
      { badge: "Gold", count: 6 },
      { badge: "Silver", count: 9 },
      { badge: "Bronze", count: 12 }
    ];
  }

  return {
    trendData,
    departmentData,
    recognitionData
  };
}


