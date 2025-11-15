import { NextRequest } from "next/server";
import { connectMongo } from "@/lib/db";
import { ImportLogModel, CCTNSDataModel } from "@/lib/models";
import { requireAuth } from "@/lib/roles";
import { ok, serverError, notFound } from "@/lib/http";

export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = requireAuth(request);
  if (!("role" in auth)) {
    return auth;
  }

  try {
    await connectMongo();
    const importLog = await ImportLogModel.findById(params.id).lean();

    if (!importLog) {
      return notFound("Import log not found");
    }

    // Get associated CCTNS data
    const cctnsData = await CCTNSDataModel.find({ importLogId: params.id })
      .limit(100)
      .lean();

    return ok({
      ...importLog,
      sampleData: cctnsData
    });
  } catch (error) {
    return serverError("Failed to fetch import log", error);
  }
}

