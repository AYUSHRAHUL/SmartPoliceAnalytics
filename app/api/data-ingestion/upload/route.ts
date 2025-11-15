import { NextRequest } from "next/server";
import { requireRole } from "@/lib/roles";
import { badRequest, serverError, ok } from "@/lib/http";
import { ingestData } from "@/lib/services/dataIngestion";
import type { CCTNSModule } from "@/lib/models/CCTNSData";
import type { ImportSource } from "@/lib/models/ImportLog";

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const auth = requireRole(request, ["Admin", "SuperAdmin"]);
  if (!("role" in auth)) {
    return auth;
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const source = formData.get("source") as string;
    const moduleName = formData.get("module") as string;

    if (!file) {
      return badRequest("No file provided");
    }

    if (!source || !moduleName) {
      return badRequest("Source and module are required");
    }

    // Validate module
    const validModules: CCTNSModule[] = ["SpecialDrives", "Convictions", "Detections"];
    if (!validModules.includes(moduleName as CCTNSModule)) {
      return badRequest(`Invalid module. Must be one of: ${validModules.join(", ")}`);
    }

    // Validate source
    const validSources: ImportSource[] = [
      "CCTNS_SpecialDrives",
      "CCTNS_Convictions",
      "CCTNS_Detections",
      "Manual",
      "Excel",
      "CSV",
      "PDF"
    ];
    if (!validSources.includes(source as ImportSource)) {
      return badRequest(`Invalid source. Must be one of: ${validSources.join(", ")}`);
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Process the file
    const result = await ingestData(
      buffer,
      file.name,
      source as ImportSource,
      moduleName as CCTNSModule,
      auth.username
    );

    return ok(result);
  } catch (error) {
    console.error("Upload error:", error);
    return serverError("Failed to process file upload", error);
  }
}

