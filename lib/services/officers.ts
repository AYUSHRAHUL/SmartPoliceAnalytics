import { connectMongo } from "../db";
import { OfficerModel } from "../models";
import { getDemoOfficers } from "../demo";

export async function getOfficerSummary() {
  await connectMongo();
  const officers = await OfficerModel.find().lean();

  if (!officers.length) {
    const demo = getDemoOfficers();
    const topFiveDemo = demo
      .sort((a, b) => b.totalScore - a.totalScore)
      .slice(0, 5)
      .map((officer, index) => ({
        id: `${index}`,
        name: officer.name,
        badgeId: officer.badgeId,
        department: officer.department,
        totalScore: officer.totalScore,
        caseClosed: officer.caseClosed
      }));

    return {
      total: demo.length,
      avgScore: Number(
        (demo.reduce((acc, officer) => acc + officer.totalScore, 0) / demo.length).toFixed(2)
      ),
      caseClosed: demo.reduce((acc, officer) => acc + officer.caseClosed, 0),
      cyberResolved: demo.reduce((acc, officer) => acc + officer.cyberResolved, 0),
      awarenessPrograms: demo.reduce((acc, officer) => acc + officer.awarenessPrograms, 0),
      emergencyResponses: demo.reduce((acc, officer) => acc + officer.emergencyResponses, 0),
      topFive: topFiveDemo
    };
  }
  const total = officers.length;
  const avgScore = total
    ? officers.reduce((acc, officer) => acc + (officer.totalScore ?? 0), 0) / total
    : 0;
  const caseClosed = officers.reduce((acc, officer) => acc + (officer.caseClosed ?? 0), 0);
  const cyberResolved = officers.reduce((acc, officer) => acc + (officer.cyberResolved ?? 0), 0);
  const awarenessPrograms = officers.reduce(
    (acc, officer) => acc + (officer.awarenessPrograms ?? 0),
    0
  );
  const emergencyResponses = officers.reduce(
    (acc, officer) => acc + (officer.emergencyResponses ?? 0),
    0
  );

  const topFive = officers
    .sort((a, b) => b.totalScore - a.totalScore)
    .slice(0, 5)
    .map((officer) => ({
      id: officer._id.toString(),
      name: officer.name,
      badgeId: officer.badgeId,
      department: officer.department,
      totalScore: officer.totalScore,
      caseClosed: officer.caseClosed
    }));

  return {
    total,
    avgScore: Number(avgScore.toFixed(2)),
    caseClosed,
    cyberResolved,
    awarenessPrograms,
    emergencyResponses,
    topFive
  };
}


