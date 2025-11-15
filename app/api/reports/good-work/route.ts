import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/roles";
import { badRequest, serverError } from "@/lib/http";
import {
  generateGoodWorkReport,
  generateGoodWorkPDF,
  generateGoodWorkExcel
} from "@/lib/services/autoReports";

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const auth = requireAuth(request);
  if (!("role" in auth)) {
    return auth;
  }

  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format") ?? "pdf";
  const period = (searchParams.get("period") as "week" | "month" | "quarter") || "month";

  if (!["pdf", "xlsx"].includes(format)) {
    return badRequest("Invalid format. Use pdf or xlsx.");
  }

  try {
    const report = await generateGoodWorkReport(period);

    if (format === "pdf") {
      const pdfBuffer = await generateGoodWorkPDF(report);
      return new Response(new Uint8Array(pdfBuffer), {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="good-work-report-${period}.pdf"`
        }
      });
    }

    const buffer = await generateGoodWorkExcel(report);
    return new Response(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="good-work-report-${period}.xlsx"`
      }
    });
  } catch (error) {
    return serverError("Failed to generate report", error);
  }
}

