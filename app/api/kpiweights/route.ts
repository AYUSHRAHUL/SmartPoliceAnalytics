import { NextRequest } from "next/server";
import { connectMongo } from "@/lib/db";
import { KPIWeightsModel } from "@/lib/models";
import { ok, badRequest, serverError } from "@/lib/http";
import { kpiWeightsSchema } from "@/lib/validators/kpi";
import { requireAuth } from "@/lib/roles";

export const runtime = 'nodejs';

export async function GET() {
  try {
    await connectMongo();
    const doc = await KPIWeightsModel.findOne().lean();
    if (!doc) {
      const created = await KPIWeightsModel.create({});
      return ok(created);
    }
    return ok(doc);
  } catch (error) {
    return serverError("Failed to fetch KPI weights", error);
  }
}

export async function PUT(request: NextRequest) {
  const auth = requireAuth(request);
  if (!("role" in auth)) {
    return auth;
  }
  if (auth.role === "Officer") {
    return badRequest("Insufficient permissions");
  }

  try {
    const payload = await request.json();
    const parsed = kpiWeightsSchema.safeParse(payload);
    if (!parsed.success) {
      return badRequest("Invalid KPI weights payload", parsed.error.flatten());
    }

    await connectMongo();
    const doc = await KPIWeightsModel.findOneAndUpdate({}, parsed.data, {
      new: true,
      upsert: true
    });
    return ok(doc);
  } catch (error) {
    return serverError("Failed to update KPI weights", error);
  }
}


