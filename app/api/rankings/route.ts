import { NextRequest } from "next/server";
import { connectMongo } from "@/lib/db";
import { OfficerModel } from "@/lib/models";
import { ok, serverError } from "@/lib/http";

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const district = searchParams.get("district");
  const department = searchParams.get("department");
  const limit = Number(searchParams.get("limit") ?? 10);

  const sortMap: Record<string, string> = {
    CrimeSolving: "caseClosed",
    Cybercrime: "cyberResolved",
    CitizenEngagement: "feedbackScore",
    Awareness: "awarenessPrograms"
  };

  const sortKey = sortMap[category ?? ""] ?? "totalScore";

  try {
    await connectMongo();
    const query: Record<string, unknown> = {};
    if (district) query.district = district;
    if (department) query.department = department;

    const officers = await OfficerModel.find(query)
      .sort({ [sortKey]: -1 })
      .limit(limit)
      .lean();

    return ok(officers);
  } catch (error) {
    return serverError("Failed to fetch rankings", error);
  }
}


