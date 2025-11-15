import { NextRequest } from "next/server";
import { connectMongo } from "@/lib/db";
import { getMonthlyTrend, getDriveTrend } from "@/lib/services/trendAnalysis";
import { ok, serverError, badRequest } from "@/lib/http";

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    await connectMongo();
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type"); // "monthly" or "drive"
    const metric = searchParams.get("metric") as "cases" | "convictions" | "detections" | "score";
    const district = searchParams.get("district");
    const driveName = searchParams.get("driveName");
    const months = Number(searchParams.get("months") || 12);

    if (type === "drive") {
      if (!driveName) {
        return badRequest("driveName is required for drive trends");
      }
      const trend = await getDriveTrend(driveName);
      return ok(trend);
    }

    if (!metric) {
      return badRequest("metric is required for monthly trends");
    }

    const trend = await getMonthlyTrend(metric, district || undefined, months);
    return ok(trend);
  } catch (error) {
    return serverError("Failed to fetch trend analysis", error);
  }
}

