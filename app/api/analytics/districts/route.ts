import { NextRequest } from "next/server";
import { connectMongo } from "@/lib/db";
import { getDistrictPerformance, getTopDistricts } from "@/lib/services/districtAnalytics";
import { ok, serverError, badRequest } from "@/lib/http";

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    await connectMongo();
    const { searchParams } = new URL(request.url);
    const district = searchParams.get("district");
    const top = searchParams.get("top");

    if (top) {
      const limit = Number(top) || 10;
      const districts = await getTopDistricts(limit);
      return ok(districts);
    }

    const districts = await getDistrictPerformance(district || undefined);
    return ok(districts);
  } catch (error) {
    return serverError("Failed to fetch district analytics", error);
  }
}

