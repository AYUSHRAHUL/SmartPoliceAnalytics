import { connectMongo } from "../db";
import { OfficerModel, CCTNSDataModel, ImportLogModel } from "../models";
import { parseFile, type ParsedRow } from "../utils/fileParser";
import type { CCTNSModule, ImportSource } from "../models/ImportLog";

export interface IngestionResult {
  success: boolean;
  importLogId: string;
  totalRecords: number;
  processedRecords: number;
  failedRecords: number;
  errors: Array<{ row: number; field: string; message: string }>;
}

/**
 * Clean and normalize data values
 */
function cleanValue(value: unknown): string | number | Date | null {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed === "" || trimmed.toLowerCase() === "null" || trimmed.toLowerCase() === "n/a") {
      return null;
    }
    return trimmed;
  }

  if (value instanceof Date) {
    return value;
  }

  // Try to parse as date
  if (typeof value === "string") {
    const date = new Date(value);
    if (!isNaN(date.getTime())) {
      return date;
    }
  }

  return String(value);
}

/**
 * Extract badge ID from various formats
 */
function extractBadgeId(row: ParsedRow): string | null {
  const possibleKeys = [
    "badgeId",
    "badge_id",
    "badge",
    "officerBadgeId",
    "officer_badge_id",
    "officer_id",
    "id",
    "Badge ID",
    "BadgeID"
  ];

  for (const key of possibleKeys) {
    const value = row[key];
    if (value) {
      const cleaned = String(value).trim().toUpperCase();
      if (cleaned.length > 0) {
        return cleaned;
      }
    }
  }

  return null;
}

/**
 * Transform Special Drives data
 */
function transformSpecialDrives(row: ParsedRow, rowIndex: number): {
  success: boolean;
  data?: any;
  error?: string;
} {
  const badgeId = extractBadgeId(row);
  if (!badgeId) {
    return {
      success: false,
      error: `Row ${rowIndex + 1}: Missing badge ID`
    };
  }

  const driveName = cleanValue(row.driveName || row["Drive Name"] || row["drive_name"]);
  const driveDate = cleanValue(row.driveDate || row["Drive Date"] || row["drive_date"]);
  const casesHandled = cleanValue(row.casesHandled || row["Cases Handled"] || row["cases_handled"]);

  return {
    success: true,
    data: {
      module: "SpecialDrives" as CCTNSModule,
      officerBadgeId: badgeId,
      officerName: cleanValue(row.officerName || row["Officer Name"] || row["officer_name"]),
      department: cleanValue(row.department || row["Department"] || row["department"]),
      district: cleanValue(row.district || row["District"] || row["district"]),
      driveName: typeof driveName === "string" ? driveName : null,
      driveDate: driveDate instanceof Date ? driveDate : null,
      casesHandled: typeof casesHandled === "number" ? casesHandled : (typeof casesHandled === "string" ? parseInt(casesHandled) || 0 : 0),
      rawData: row
    }
  };
}

/**
 * Transform Convictions data
 */
function transformConvictions(row: ParsedRow, rowIndex: number): {
  success: boolean;
  data?: any;
  error?: string;
} {
  const badgeId = extractBadgeId(row);
  if (!badgeId) {
    return {
      success: false,
      error: `Row ${rowIndex + 1}: Missing badge ID`
    };
  }

  const caseNumber = cleanValue(row.caseNumber || row["Case Number"] || row["case_number"]);
  const convictionDate = cleanValue(row.convictionDate || row["Conviction Date"] || row["conviction_date"]);
  const crimeType = cleanValue(row.crimeType || row["Crime Type"] || row["crime_type"]);

  return {
    success: true,
    data: {
      module: "Convictions" as CCTNSModule,
      officerBadgeId: badgeId,
      officerName: cleanValue(row.officerName || row["Officer Name"] || row["officer_name"]),
      department: cleanValue(row.department || row["Department"] || row["department"]),
      district: cleanValue(row.district || row["District"] || row["district"]),
      caseNumber: typeof caseNumber === "string" ? caseNumber : null,
      convictionDate: convictionDate instanceof Date ? convictionDate : null,
      crimeType: typeof crimeType === "string" ? crimeType : null,
      courtName: cleanValue(row.courtName || row["Court Name"] || row["court_name"]),
      rawData: row
    }
  };
}

/**
 * Transform Detections data
 */
function transformDetections(row: ParsedRow, rowIndex: number): {
  success: boolean;
  data?: any;
  error?: string;
} {
  const badgeId = extractBadgeId(row);
  if (!badgeId) {
    return {
      success: false,
      error: `Row ${rowIndex + 1}: Missing badge ID`
    };
  }

  const detectionDate = cleanValue(row.detectionDate || row["Detection Date"] || row["detection_date"]);
  const crimeCategory = cleanValue(row.crimeCategory || row["Crime Category"] || row["crime_category"]);
  const valueRecovered = cleanValue(row.valueRecovered || row["Value Recovered"] || row["value_recovered"]);

  return {
    success: true,
    data: {
      module: "Detections" as CCTNSModule,
      officerBadgeId: badgeId,
      officerName: cleanValue(row.officerName || row["Officer Name"] || row["officer_name"]),
      department: cleanValue(row.department || row["Department"] || row["department"]),
      district: cleanValue(row.district || row["District"] || row["district"]),
      detectionDate: detectionDate instanceof Date ? detectionDate : null,
      crimeCategory: typeof crimeCategory === "string" ? crimeCategory : null,
      valueRecovered: typeof valueRecovered === "number" ? valueRecovered : (typeof valueRecovered === "string" ? parseFloat(valueRecovered) || 0 : 0),
      rawData: row
    }
  };
}

/**
 * Update officer KPIs based on CCTNS data
 */
async function updateOfficerKPIs(cctnsData: any): Promise<void> {
  let officer = await OfficerModel.findOne({ badgeId: cctnsData.officerBadgeId });

  if (!officer) {
    // Create officer if not exists with basic info
    officer = await OfficerModel.create({
      badgeId: cctnsData.officerBadgeId,
      name: cctnsData.officerName || `Officer ${cctnsData.officerBadgeId}`,
      department: cctnsData.department || "Unknown",
      designation: "Officer",
      district: cctnsData.district,
      caseClosed: 0,
      cyberResolved: 0,
      feedbackScore: 0,
      awarenessPrograms: 0,
      emergencyResponses: 0,
      totalScore: 0
    });
  }

  // Update based on module type
  switch (cctnsData.module) {
    case "SpecialDrives":
      if (cctnsData.casesHandled) {
        officer.caseClosed = (officer.caseClosed || 0) + cctnsData.casesHandled;
      }
      break;
    case "Convictions":
      officer.caseClosed = (officer.caseClosed || 0) + 1;
      break;
    case "Detections":
      // Detections might contribute to cyber resolved or other metrics
      if (cctnsData.crimeCategory?.toLowerCase().includes("cyber")) {
        officer.cyberResolved = (officer.cyberResolved || 0) + 1;
      }
      break;
  }

  // Update officer info if provided
  if (cctnsData.officerName && !officer.name.includes("Officer")) {
    officer.name = cctnsData.officerName;
  }
  if (cctnsData.department) {
    officer.department = cctnsData.department;
  }
  if (cctnsData.district) {
    officer.district = cctnsData.district;
  }

  officer.lastUpdated = new Date();
  await officer.save();
}

/**
 * Main ingestion function
 */
export async function ingestData(
  buffer: Buffer,
  filename: string,
  source: ImportSource,
  module: CCTNSModule,
  uploadedBy: string
): Promise<IngestionResult> {
  await connectMongo();

  // Create import log
  const importLog = await ImportLogModel.create({
    filename,
    source,
    status: "processing",
    uploadedBy,
    totalRecords: 0,
    processedRecords: 0,
    failedRecords: 0,
    errors: []
  });

  try {
    // Parse file
    const rows = await parseFile(buffer, filename);
    importLog.totalRecords = rows.length;

    const errors: Array<{ row: number; field: string; message: string }> = [];
    let processedCount = 0;
    let failedCount = 0;

    // Transform and save each row
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      let transformed: { success: boolean; data?: any; error?: string };

      // Transform based on module
      switch (module) {
        case "SpecialDrives":
          transformed = transformSpecialDrives(row, i);
          break;
        case "Convictions":
          transformed = transformConvictions(row, i);
          break;
        case "Detections":
          transformed = transformDetections(row, i);
          break;
        default:
          transformed = { success: false, error: `Unknown module: ${module}` };
      }

      if (transformed.success && transformed.data) {
        try {
          const cctnsRecord = await CCTNSDataModel.create({
            ...transformed.data,
            importLogId: importLog._id
          });

          // Update officer KPIs
          await updateOfficerKPIs(cctnsRecord);

          processedCount++;
        } catch (error) {
          failedCount++;
          errors.push({
            row: i + 1,
            field: "general",
            message: error instanceof Error ? error.message : String(error)
          });
        }
      } else {
        failedCount++;
        errors.push({
          row: i + 1,
          field: "transformation",
          message: transformed.error || "Transformation failed"
        });
      }
    }

    // Update import log
    importLog.status = failedCount === rows.length ? "failed" : "completed";
    importLog.processedRecords = processedCount;
    importLog.failedRecords = failedCount;
    importLog.errors = errors;
    await importLog.save();

    return {
      success: importLog.status === "completed",
      importLogId: importLog._id.toString(),
      totalRecords: rows.length,
      processedRecords: processedCount,
      failedRecords: failedCount,
      errors
    };
  } catch (error) {
    importLog.status = "failed";
    importLog.errors = [
      {
        row: 0,
        field: "file_parsing",
        message: error instanceof Error ? error.message : String(error)
      }
    ];
    await importLog.save();

    throw error;
  }
}

