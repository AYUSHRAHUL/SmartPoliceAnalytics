import { NextRequest } from "next/server";
import { connectMongo } from "@/lib/db";
import { getDrivePerformance } from "@/lib/services/districtAnalytics";
import { ok, serverError } from "@/lib/http";

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    await connectMongo();
    const { searchParams } = new URL(request.url);
    const driveName = searchParams.get("driveName");
    const district = searchParams.get("district");

    const drives = await getDrivePerformance(driveName || undefined, district || undefined);
    return ok(drives);
  } catch (error) {
    return serverError("Failed to fetch drive analytics", error);
  }
}

