import { NextRequest } from "next/server";
import { connectMongo } from "@/lib/db";
import {
  NBWDriveModel,
  FirearmsDriveModel,
  SandMiningDriveModel,
  MissingPersonsDriveModel,
  CasePendencyDriveModel,
  PreventiveMeasuresDriveModel,
  ExciseActModel,
  OPGActModel,
  NarcoticsEnforcementModel
} from "@/lib/models/SpecialDrive";
import { requireAuth } from "@/lib/roles";
import { ok, badRequest, serverError, created } from "@/lib/http";

export const runtime = 'nodejs';

const modelMap: Record<string, any> = {
  nbw: NBWDriveModel,
  firearms: FirearmsDriveModel,
  "sand-mining": SandMiningDriveModel,
  "missing-persons": MissingPersonsDriveModel,
  "case-pendency": CasePendencyDriveModel,
  "preventive-measures": PreventiveMeasuresDriveModel,
  excise: ExciseActModel,
  opg: OPGActModel,
  narcotics: NarcoticsEnforcementModel
};

export async function GET(
  request: NextRequest,
  { params }: { params: { type: string } }
) {
  try {
    await connectMongo();
    const { searchParams } = new URL(request.url);
    const district = searchParams.get("district");

    const model = modelMap[params.type];
    if (!model) {
      return badRequest(`Invalid drive type: ${params.type}`);
    }

    const query = district ? { district } : {};
    const data = await model.find(query).sort({ driveDate: -1 }).lean();
    return ok(data);
  } catch (error) {
    return serverError("Failed to fetch special drive data", error);
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { type: string } }
) {
  const auth = requireAuth(request);
  if (!("role" in auth)) {
    return auth;
  }

  if (auth.role === "Officer") {
    return badRequest("Insufficient permissions");
  }

  try {
    await connectMongo();
    const model = modelMap[params.type];
    if (!model) {
      return badRequest(`Invalid drive type: ${params.type}`);
    }

    const payload = await request.json();
    const data = await model.create(payload);
    return created(data);
  } catch (error) {
    return serverError("Failed to create special drive data", error);
  }
}

