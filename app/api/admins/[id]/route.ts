import { NextRequest } from "next/server";
import { connectMongo } from "@/lib/db";
import { AdminModel, AuditLogModel } from "@/lib/models";
import { badRequest, notFound, ok, serverError } from "@/lib/http";
import { requireAuth } from "@/lib/roles";
import { z } from "zod";

export const runtime = 'nodejs';

const updateRoleSchema = z.object({
  role: z.enum(["Officer", "Admin", "SuperAdmin"])
});

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const auth = requireAuth(request);
  if (!("role" in auth)) {
    return auth;
  }
  if (auth.role !== "SuperAdmin") {
    return badRequest("Only SuperAdmin can update roles");
  }

  try {
    const payload = await request.json();
    const parsed = updateRoleSchema.safeParse(payload);
    if (!parsed.success) {
      return badRequest("Invalid role payload", parsed.error.flatten());
    }

    await connectMongo();
    const admin = await AdminModel.findByIdAndUpdate(
      params.id,
      { role: parsed.data.role },
      { new: true }
    ).select("-password");
    if (!admin) {
      return notFound("Admin not found");
    }

    await AuditLogModel.create({
      action: "UPDATE",
      entity: "Admin",
      entityId: params.id,
      user: auth.username,
      metadata: { role: parsed.data.role }
    });

    return ok(admin);
  } catch (error) {
    return serverError("Failed to update admin", error);
  }
}


