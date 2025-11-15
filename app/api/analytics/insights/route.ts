import { NextRequest } from "next/server";
import { connectMongo } from "@/lib/db";
import {
  predictUnderperformingDistricts,
  generateNLSummary
} from "@/lib/services/aiInsights";
import { ok, serverError, badRequest } from "@/lib/http";

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    await connectMongo();
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type"); // "predictions" or "summary"

    if (type === "predictions") {
      const predictions = await predictUnderperformingDistricts();
      return ok(predictions);
    }

    if (type === "summary") {
      const period = (searchParams.get("period") as "week" | "month" | "quarter") || "month";
      const summary = await generateNLSummary(period);
      return ok(summary);
    }

    // Return both by default
    const [predictions, summary] = await Promise.all([
      predictUnderperformingDistricts(),
      generateNLSummary("month")
    ]);

    return ok({ predictions, summary });
  } catch (error) {
    return serverError("Failed to fetch AI insights", error);
  }
}

