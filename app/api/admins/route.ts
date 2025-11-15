import { NextRequest } from "next/server";
import { connectMongo } from "@/lib/db";
import { AdminModel, AuditLogModel } from "@/lib/models";
import { ok, created, badRequest, serverError } from "@/lib/http";
import { requireAuth } from "@/lib/roles";
import { hashPassword } from "@/lib/auth";
import { z } from "zod";

export const runtime = 'nodejs';

const createAdminSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
  role: z.enum(["Officer", "Admin", "SuperAdmin"]).default("Admin")
});

export async function GET(request: NextRequest) {
  const auth = requireAuth(request);
  if (!("role" in auth)) {
    return auth;
  }
  if (auth.role !== "SuperAdmin") {
    return badRequest("Only SuperAdmin can view admins");
  }

  try {
    await connectMongo();
    const admins = await AdminModel.find().select("-password").lean();
    return ok(admins);
  } catch (error) {
    return serverError("Failed to fetch admins", error);
  }
}

export async function POST(request: NextRequest) {
  const auth = requireAuth(request);
  if (!("role" in auth)) {
    return auth;
  }
  if (auth.role !== "SuperAdmin") {
    return badRequest("Only SuperAdmin can create admins");
  }

  try {
    const payload = await request.json();
    const parsed = createAdminSchema.safeParse(payload);
    if (!parsed.success) {
      return badRequest("Invalid admin payload", parsed.error.flatten());
    }

    await connectMongo();
    const existing = await AdminModel.findOne({ username: parsed.data.username });
    if (existing) {
      return badRequest("Username already exists");
    }

    const password = await hashPassword(parsed.data.password);
    const admin = await AdminModel.create({
      username: parsed.data.username,
      password,
      role: parsed.data.role
    });

    await AuditLogModel.create({
      action: "CREATE",
      entity: "Admin",
      entityId: admin._id.toString(),
      user: auth.username,
      metadata: { username: admin.username, role: admin.role }
    });

    return created({
      _id: admin._id,
      username: admin.username,
      role: admin.role
    });
  } catch (error) {
    return serverError("Failed to create admin", error);
  }
}


