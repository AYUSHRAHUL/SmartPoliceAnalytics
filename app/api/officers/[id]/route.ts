import { NextRequest } from "next/server";
import { connectMongo } from "@/lib/db";
import { OfficerModel, AuditLogModel } from "@/lib/models";
import { badRequest, notFound, ok, serverError } from "@/lib/http";
import { requireAuth } from "@/lib/roles";
import { updateOfficerSchema } from "@/lib/validators/officer";

export const runtime = 'nodejs';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const auth = requireAuth(request);
  if (!("role" in auth)) {
    return auth;
  }
  if (auth.role === "Officer") {
    return badRequest("Insufficient permissions");
  }

  try {
    const payload = await request.json();
    const parsed = updateOfficerSchema.safeParse(payload);
    if (!parsed.success) {
      return badRequest("Invalid officer payload", parsed.error.flatten());
    }

    await connectMongo();
    const officer = await OfficerModel.findByIdAndUpdate(params.id, parsed.data, {
      new: true
    });
    if (!officer) {
      return notFound("Officer not found");
    }

    await AuditLogModel.create({
      action: "UPDATE",
      entity: "Officer",
      entityId: officer._id.toString(),
      user: auth.username,
      metadata: parsed.data
    });

    return ok(officer);
  } catch (error) {
    return serverError("Failed to update officer", error);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const auth = requireAuth(request);
  if (!("role" in auth)) {
    return auth;
  }
  if (auth.role !== "SuperAdmin") {
    return badRequest("Only SuperAdmin can delete officers");
  }

  try {
    await connectMongo();
    const officer = await OfficerModel.findByIdAndDelete(params.id);
    if (!officer) {
      return notFound("Officer not found");
    }

    await AuditLogModel.create({
      action: "DELETE",
      entity: "Officer",
      entityId: params.id,
      user: auth.username
    });

    return ok({ deleted: true });
  } catch (error) {
    return serverError("Failed to delete officer", error);
  }
}


