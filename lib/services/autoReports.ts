import { connectMongo } from "../db";
import { OfficerModel, CCTNSDataModel, RecognitionModel } from "../models";
import { getDistrictPerformance, getTopDistricts } from "./districtAnalytics";
import { generateNLSummary } from "./aiInsights";
import ExcelJS from "exceljs";
import PDFDocument from "pdfkit";

export interface GoodWorkReport {
  period: string;
  topPerformers: Array<{
    name: string;
    badgeId: string;
    department: string;
    achievements: string[];
    score: number;
  }>;
  districtHighlights: Array<{
    district: string;
    achievement: string;
    metric: string;
  }>;
  summary: string;
  statistics: {
    totalOfficers: number;
    totalCasesClosed: number;
    totalConvictions: number;
    totalDetections: number;
    averageScore: number;
  };
}

/**
 * Generate "Good Work Done" report
 */
export async function generateGoodWorkReport(
  period: "week" | "month" | "quarter" = "month"
): Promise<GoodWorkReport> {
  await connectMongo();

  // Get top performers
  const topOfficers = await OfficerModel.find()
    .sort({ totalScore: -1 })
    .limit(10)
    .lean();

  // Get district highlights
  const topDistricts = await getTopDistricts(5);
  const districtHighlights = topDistricts.map((district: any) => {
    let achievement = "";
    let metric = "";

    if (district.convictionRatio && district.convictionRatio > 50) {
      achievement = `Achieved ${district.convictionRatio.toFixed(1)}% conviction rate`;
      metric = "Conviction Ratio";
    } else if (district.totalDetections > 20) {
      achievement = `Led with ${district.totalDetections} detections`;
      metric = "Detections";
    } else if (district.totalCasesClosed > 100) {
      achievement = `Closed ${district.totalCasesClosed} cases`;
      metric = "Case Closure";
    } else {
      achievement = `Average score of ${district.averageScore.toFixed(1)}`;
      metric = "Overall Performance";
    }

    return {
      district: district.district,
      achievement,
      metric
    };
  });

  // Get recognitions
  const recognitions = await RecognitionModel.find()
    .populate("officerId")
    .sort({ createdAt: -1 })
    .limit(20)
    .lean();

  // Build top performers with achievements
  const topPerformers = topOfficers.map((officer: any) => {
    const achievements: string[] = [];

    if (officer.caseClosed && officer.caseClosed > 50) {
      achievements.push(`Closed ${officer.caseClosed} cases`);
    }
    if (officer.cyberResolved && officer.cyberResolved > 10) {
      achievements.push(`Resolved ${officer.cyberResolved} cyber crimes`);
    }
    if (officer.totalScore > 80) {
      achievements.push(`Excellence score of ${officer.totalScore.toFixed(1)}`);
    }

    const officerRecognitions = recognitions.filter((r: any) => (r.officerId as any)?._id?.toString() === officer._id.toString());
    if (officerRecognitions.length > 0) {
      const badges = officerRecognitions.map((r: any) => r.badge).join(", ");
      achievements.push(`Awarded ${badges} recognition`);
    }

    return {
      name: officer.name,
      badgeId: officer.badgeId,
      department: officer.department,
      achievements: achievements.length > 0 ? achievements : ["Consistent performance"],
      score: officer.totalScore
    };
  });

  // Get statistics
  const allOfficers = await OfficerModel.find().lean();
  const allCCTNS = await CCTNSDataModel.find().lean();

  const statistics = {
    totalOfficers: allOfficers.length,
    totalCasesClosed: allOfficers.reduce((sum: number, o: any) => sum + (o.caseClosed || 0), 0),
    totalConvictions: allCCTNS.filter((c: any) => c.module === "Convictions").length,
    totalDetections: allCCTNS.filter((c: any) => c.module === "Detections").length,
    averageScore:
      allOfficers.length > 0
        ? Number(
            (
              allOfficers.reduce((sum: number, o: any) => sum + (o.totalScore || 0), 0) / allOfficers.length
            ).toFixed(2)
          )
        : 0
  };

  // Generate summary
  const aiSummary = await generateNLSummary(period);
  const summary = aiSummary.summary;

  return {
    period,
    topPerformers,
    districtHighlights,
    summary,
    statistics
  };
}

/**
 * Generate PDF report
 */
export async function generateGoodWorkPDF(report: GoodWorkReport): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50, size: "A4" });
    const chunks: Buffer[] = [];

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks as readonly Uint8Array[])));
    doc.on("error", reject);

    // Header
    doc.fontSize(24).text("Good Work Done Report", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Period: ${report.period}`, { align: "center" });
    doc.moveDown(2);

    // Summary
    doc.fontSize(16).text("Executive Summary", { underline: true });
    doc.moveDown();
    doc.fontSize(11).text(report.summary, { align: "justify" });
    doc.moveDown(2);

    // Statistics
    doc.fontSize(16).text("Key Statistics", { underline: true });
    doc.moveDown();
    doc.fontSize(11);
    doc.text(`Total Officers: ${report.statistics.totalOfficers}`);
    doc.text(`Total Cases Closed: ${report.statistics.totalCasesClosed}`);
    doc.text(`Total Convictions: ${report.statistics.totalConvictions}`);
    doc.text(`Total Detections: ${report.statistics.totalDetections}`);
    doc.text(`Average Score: ${report.statistics.averageScore.toFixed(2)}`);
    doc.moveDown(2);

    // Top Performers
    doc.fontSize(16).text("Top Performers", { underline: true });
    doc.moveDown();
    report.topPerformers.forEach((performer, idx) => {
      doc.fontSize(12).text(`${idx + 1}. ${performer.name} (${performer.badgeId})`, {
        continued: false
      });
      doc.fontSize(10).text(`   Department: ${performer.department}`);
      doc.fontSize(10).text(`   Score: ${performer.score.toFixed(2)}`);
      doc.fontSize(10).text(`   Achievements:`);
      performer.achievements.forEach((ach) => {
        doc.fontSize(9).text(`     • ${ach}`, { indent: 20 });
      });
      doc.moveDown();
    });

    // District Highlights
    if (report.districtHighlights.length > 0) {
      doc.addPage();
      doc.fontSize(16).text("District Highlights", { underline: true });
      doc.moveDown();
      report.districtHighlights.forEach((highlight) => {
        doc.fontSize(12).text(`${highlight.district}`, { continued: false });
        doc.fontSize(10).text(`   ${highlight.achievement} (${highlight.metric})`, {
          indent: 20
        });
        doc.moveDown();
      });
    }

    // Footer
    doc.fontSize(8).text(
      `Generated on ${new Date().toLocaleDateString()} by Smart Police Analytics System`,
      { align: "center" }
    );

    doc.end();
  });
}

/**
 * Generate Excel report
 */
export async function generateGoodWorkExcel(report: GoodWorkReport): Promise<Buffer> {
  const workbook = new ExcelJS.Workbook();

  // Summary Sheet
  const summarySheet = workbook.addWorksheet("Summary");
  summarySheet.columns = [
    { header: "Metric", key: "metric", width: 30 },
    { header: "Value", key: "value", width: 20 }
  ];
  summarySheet.addRow({ metric: "Period", value: report.period });
  summarySheet.addRow({ metric: "Total Officers", value: report.statistics.totalOfficers });
  summarySheet.addRow({
    metric: "Total Cases Closed",
    value: report.statistics.totalCasesClosed
  });
  summarySheet.addRow({
    metric: "Total Convictions",
    value: report.statistics.totalConvictions
  });
  summarySheet.addRow({
    metric: "Total Detections",
    value: report.statistics.totalDetections
  });
  summarySheet.addRow({
    metric: "Average Score",
    value: report.statistics.averageScore.toFixed(2)
  });

  // Top Performers Sheet
  const performersSheet = workbook.addWorksheet("Top Performers");
  performersSheet.columns = [
    { header: "Rank", key: "rank", width: 8 },
    { header: "Name", key: "name", width: 25 },
    { header: "Badge ID", key: "badgeId", width: 15 },
    { header: "Department", key: "department", width: 20 },
    { header: "Score", key: "score", width: 12 },
    { header: "Achievements", key: "achievements", width: 50 }
  ];
  report.topPerformers.forEach((performer, idx) => {
    performersSheet.addRow({
      rank: idx + 1,
      name: performer.name,
      badgeId: performer.badgeId,
      department: performer.department,
      score: performer.score.toFixed(2),
      achievements: performer.achievements.join("; ")
    });
  });

  // District Highlights Sheet
  const districtsSheet = workbook.addWorksheet("District Highlights");
  districtsSheet.columns = [
    { header: "District", key: "district", width: 25 },
    { header: "Achievement", key: "achievement", width: 40 },
    { header: "Metric", key: "metric", width: 20 }
  ];
  report.districtHighlights.forEach((highlight) => {
    districtsSheet.addRow({
      district: highlight.district,
      achievement: highlight.achievement,
      metric: highlight.metric
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  return buffer as unknown as Buffer;
}

