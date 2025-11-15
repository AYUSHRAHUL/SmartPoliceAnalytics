import { NextRequest } from "next/server";
import { connectMongo } from "@/lib/db";
import { OfficerModel } from "@/lib/models";
import { ok, created, badRequest, serverError } from "@/lib/http";
import { createOfficerSchema } from "@/lib/validators/officer";
import { requireAuth } from "@/lib/roles";

export const runtime = 'nodejs';

export async function GET() {
  try {
    await connectMongo();
    const officers = await OfficerModel.find().sort({ totalScore: -1 }).lean();
    return ok(officers);
  } catch (error) {
    return serverError("Failed to fetch officers", error);
  }
}

export async function POST(request: NextRequest) {
  const auth = requireAuth(request);
  if (!("role" in auth)) {
    return auth;
  }
  if (auth.role === "Officer") {
    return badRequest("Insufficient permissions");
  }

  try {
    const payload = await request.json();
    const parsed = createOfficerSchema.safeParse(payload);
    if (!parsed.success) {
      return badRequest("Invalid officer payload", parsed.error.flatten());
    }
    await connectMongo();
    const officer = await OfficerModel.create(parsed.data);
    return created(officer);
  } catch (error) {
    return serverError("Failed to create officer", error);
  }
}


