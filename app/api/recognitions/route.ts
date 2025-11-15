import { NextRequest } from "next/server";
import { connectMongo } from "@/lib/db";
import { RecognitionModel, AuditLogModel } from "@/lib/models";
import { ok, created, badRequest, serverError } from "@/lib/http";
import { recognitionSchema } from "@/lib/validators/recognition";
import { requireAuth } from "@/lib/roles";

export const runtime = 'nodejs';

export async function GET() {
  try {
    await connectMongo();
    const recognitions = await RecognitionModel.find()
      .populate("officerId")
      .sort({ createdAt: -1 })
      .lean();
    return ok(recognitions);
  } catch (error) {
    return serverError("Failed to fetch recognitions", error);
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
    const parsed = recognitionSchema.safeParse(payload);
    if (!parsed.success) {
      return badRequest("Invalid recognition payload", parsed.error.flatten());
    }

    await connectMongo();
    const recognition = await RecognitionModel.create(parsed.data);

    await AuditLogModel.create({
      action: "CREATE",
      entity: "Recognition",
      entityId: recognition._id.toString(),
      user: auth.username,
      metadata: parsed.data
    });

    return created(recognition);
  } catch (error) {
    return serverError("Failed to create recognition", error);
  }
}


