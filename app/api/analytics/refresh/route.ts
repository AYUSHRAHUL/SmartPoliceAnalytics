import { NextRequest } from "next/server";
import axios from "axios";
import { env } from "@/lib/env";
import { requireRole } from "@/lib/roles";
import { ok, serverError } from "@/lib/http";

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const auth = requireRole(request, ["Admin", "SuperAdmin"]);
  if (!("role" in auth)) {
    return auth;
  }

  try {
    if (!env.ANALYTICS_SERVICE_URL) {
      return serverError("ANALYTICS_SERVICE_URL not configured");
    }

    const response = await axios.get(`${env.ANALYTICS_SERVICE_URL}/analyze`);
    return ok(response.data);
  } catch (error) {
    return serverError("Failed to trigger analytics service", error);
  }
}


