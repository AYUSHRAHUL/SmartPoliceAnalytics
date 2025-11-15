import { Schema, model, models } from "mongoose";

export type CCTNSModule = "SpecialDrives" | "Convictions" | "Detections";

export interface CCTNSDataDocument {
  module: CCTNSModule;
  officerBadgeId: string;
  officerName?: string;
  department?: string;
  district?: string;
  // Special Drives fields
  driveName?: string;
  driveDate?: Date;
  casesHandled?: number;
  // Convictions fields
  caseNumber?: string;
  convictionDate?: Date;
  crimeType?: string;
  courtName?: string;
  // Detections fields
  detectionDate?: Date;
  crimeCategory?: string;
  valueRecovered?: number;
  // Common fields
  rawData: Record<string, unknown>;
  importLogId: string;
  createdAt: Date;
  updatedAt: Date;
}

const CCTNSDataSchema = new Schema(
  {
    module: {
      type: String,
      enum: ["SpecialDrives", "Convictions", "Detections"],
      required: true
    },
    officerBadgeId: { type: String, required: true },
    officerName: { type: String },
    department: { type: String },
    district: { type: String },
    // Special Drives
    driveName: { type: String },
    driveDate: { type: Date },
    casesHandled: { type: Number },
    // Convictions
    caseNumber: { type: String },
    convictionDate: { type: Date },
    crimeType: { type: String },
    courtName: { type: String },
    // Detections
    detectionDate: { type: Date },
    crimeCategory: { type: String },
    valueRecovered: { type: Number },
    // Raw data storage
    rawData: { type: Schema.Types.Mixed },
    importLogId: { type: Schema.Types.ObjectId, ref: "ImportLog", required: true }
  },
  { timestamps: true }
);

CCTNSDataSchema.index({ officerBadgeId: 1, module: 1 });
CCTNSDataSchema.index({ importLogId: 1 });
CCTNSDataSchema.index({ module: 1, createdAt: -1 });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CCTNSDataModel =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (models.CCTNSData as any) || (model("CCTNSData", CCTNSDataSchema) as any);

