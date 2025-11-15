import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/roles";
import { badRequest, serverError } from "@/lib/http";
import {
  generateNBWPDF,
  generateNBWExcel,
  generateFirearmsExcel,
  generateNarcoticsExcel
} from "@/lib/services/specialDriveReports";

export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  { params }: { params: { type: string } }
) {
  const auth = requireAuth(request);
  if (!("role" in auth)) {
    return auth;
  }

  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format") ?? "excel";

  if (!["pdf", "xlsx"].includes(format)) {
    return badRequest("Invalid format. Use pdf or xlsx.");
  }

  try {
    let buffer: Buffer;

    switch (params.type) {
      case "nbw":
        if (format === "pdf") {
          buffer = await generateNBWPDF();
          return new Response(new Uint8Array(buffer), {
            headers: {
              "Content-Type": "application/pdf",
              "Content-Disposition": 'attachment; filename="nbw-drive-report.pdf"'
            }
          });
        } else {
          buffer = await generateNBWExcel();
          return new Response(new Uint8Array(buffer), {
            headers: {
              "Content-Type":
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
              "Content-Disposition": 'attachment; filename="nbw-drive-report.xlsx"'
            }
          });
        }

      case "firearms":
        buffer = await generateFirearmsExcel();
        return new Response(new Uint8Array(buffer), {
          headers: {
            "Content-Type":
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "Content-Disposition": 'attachment; filename="firearms-drive-report.xlsx"'
          }
        });

      case "narcotics":
        buffer = await generateNarcoticsExcel();
        return new Response(new Uint8Array(buffer), {
          headers: {
            "Content-Type":
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "Content-Disposition": 'attachment; filename="narcotics-enforcement-report.xlsx"'
          }
        });

      default:
        return badRequest(`Report generation not yet implemented for type: ${params.type}`);
    }
  } catch (error) {
    return serverError("Failed to generate report", error);
  }
}

