import { connectMongo } from "../db";
import { OfficerModel } from "../models";
import { getDemoOfficers } from "../demo";

export type RankingCategory =
  | "Total"
  | "CrimeSolving"
  | "Cybercrime"
  | "CitizenEngagement"
  | "Awareness";

const sortMap: Record<RankingCategory, string> = {
  Total: "totalScore",
  CrimeSolving: "caseClosed",
  Cybercrime: "cyberResolved",
  CitizenEngagement: "feedbackScore",
  Awareness: "awarenessPrograms"
};

export async function getRankings(category: RankingCategory = "Total", limit = 25) {
  await connectMongo();
  const sortKey = sortMap[category];
  const officers = await OfficerModel.find()
    .sort({ [sortKey]: -1 })
    .limit(limit)
    .lean();

  if (!officers.length) {
    const demo = getDemoOfficers(limit);
    return demo.map((officer: any, index: number) => ({
      rank: index + 1,
      id: `${index}`,
      name: officer.name,
      badgeId: officer.badgeId,
      department: officer.department,
      totalScore: officer.totalScore,
      caseClosed: officer.caseClosed,
      cyberResolved: officer.cyberResolved,
      feedbackScore: officer.feedbackScore,
      awarenessPrograms: officer.awarenessPrograms
    }));
  }

  return officers.map((officer: any, index: number) => ({
    rank: index + 1,
    id: officer._id.toString(),
    name: officer.name,
    badgeId: officer.badgeId,
    department: officer.department,
    totalScore: officer.totalScore,
    caseClosed: officer.caseClosed,
    cyberResolved: officer.cyberResolved,
    feedbackScore: officer.feedbackScore,
    awarenessPrograms: officer.awarenessPrograms
  }));
}


