import { NextRequest } from "next/server";
import { connectMongo } from "@/lib/db";
import { ImportLogModel } from "@/lib/models";
import { requireAuth } from "@/lib/roles";
import { ok, serverError } from "@/lib/http";

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const auth = requireAuth(request);
  if (!("role" in auth)) {
    return auth;
  }

  try {
    await connectMongo();
    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get("limit") || 50);
    const status = searchParams.get("status");

    const query: Record<string, unknown> = {};
    if (status) {
      query.status = status;
    }

    const imports = await ImportLogModel.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return ok(imports);
  } catch (error) {
    return serverError("Failed to fetch import logs", error);
  }
}

