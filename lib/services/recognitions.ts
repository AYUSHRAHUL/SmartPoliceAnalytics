import { connectMongo } from "../db";
import { RecognitionModel } from "../models";
import { getDemoOfficers } from "../demo";

export async function getRecognitionFeed() {
  await connectMongo();
  const recognitions = await RecognitionModel.find()
    .populate("officerId")
    .sort({ createdAt: -1 })
    .limit(25)
    .lean();

  if (!recognitions.length) {
    const demoOfficers = getDemoOfficers(6);
    return demoOfficers.map((officer, index) => ({
      id: `${index}`,
      badge: index < 2 ? "Gold" : index < 4 ? "Silver" : "Bronze",
      month: "2025-10",
      recognizedBy: "HQ",
      message: "Outstanding service and commitment.",
      officer: {
        name: officer.name,
        badgeId: officer.badgeId,
        department: officer.department
      }
    }));
  }

  type PopulatedOfficer = {
    name?: string;
    badgeId?: string;
    department?: string;
  };

  return recognitions.map((rec: any) => {
    const officer = rec.officerId as PopulatedOfficer | null;
    return {
      id: rec._id.toString(),
      badge: rec.badge,
      month: rec.month,
      recognizedBy: rec.recognizedBy,
      message: rec.message,
      officer: {
        name: officer?.name ?? "Unknown Officer",
        badgeId: officer?.badgeId ?? "N/A",
        department: officer?.department ?? "N/A"
      }
    };
  });
}


