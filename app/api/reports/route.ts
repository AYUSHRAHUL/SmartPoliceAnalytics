import { NextRequest } from "next/server";
import ExcelJS from "exceljs";
import PDFDocument from "pdfkit";
import { connectMongo } from "@/lib/db";
import { OfficerModel } from "@/lib/models";
import { requireAuth } from "@/lib/roles";
import { badRequest, serverError } from "@/lib/http";

export const runtime = 'nodejs';

type OfficerData = {
  name: string;
  badgeId: string;
  department: string;
  designation?: string;
  totalScore: number;
};

async function generatePdf(officers: OfficerData[]) {
  return new Promise<Buffer>((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const chunks: Buffer[] = [];

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => {
      resolve(Buffer.concat(chunks as readonly Uint8Array[]));
    });
    doc.on("error", reject);

    doc.fontSize(18).text("Police Good Work Recognition Report", { align: "center" });
    doc.moveDown();

    officers.forEach((officer, index) => {
      doc
        .fontSize(12)
        .text(
          `${index + 1}. ${officer.name} (${officer.badgeId}) - ${officer.department} | Score: ${officer.totalScore.toFixed(2)}`
        );
      doc.moveDown(0.5);
    });

    doc.end();
  });
}

async function generateExcel(officers: OfficerData[]) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Performance Report");

  sheet.columns = [
    { header: "Name", key: "name", width: 28 },
    { header: "Badge ID", key: "badgeId", width: 15 },
    { header: "Department", key: "department", width: 20 },
    { header: "Designation", key: "designation", width: 20 },
    { header: "Case Closed", key: "caseClosed", width: 16 },
    { header: "Cyber Resolved", key: "cyberResolved", width: 16 },
    { header: "Feedback Score", key: "feedbackScore", width: 16 },
    { header: "Awareness Programs", key: "awarenessPrograms", width: 18 },
    { header: "Emergency Responses", key: "emergencyResponses", width: 18 },
    { header: "Total Score", key: "totalScore", width: 16 }
  ];

  officers.forEach((officer) => {
    sheet.addRow(officer);
  });

  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
}

export async function GET(request: NextRequest) {
  const auth = requireAuth(request);
  if (!("role" in auth)) {
    return auth;
  }

  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format") ?? "pdf";

  if (!["pdf", "xlsx"].includes(format)) {
    return badRequest("Invalid format. Use pdf or xlsx.");
  }

  try {
    await connectMongo();
    const officers = await OfficerModel.find().sort({ totalScore: -1 }).limit(100).lean();

    if (format === "pdf") {
      const pdfBuffer = await generatePdf(officers);
      return new Response(new Uint8Array(pdfBuffer), {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="police-report.pdf"`
        }
      });
    }

    const buffer = await generateExcel(officers);
    return new Response(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="police-report.xlsx"`
      }
    });
  } catch (error) {
    return serverError("Failed to generate report", error);
  }
}


