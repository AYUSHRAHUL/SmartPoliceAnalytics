import { Schema, model, models } from "mongoose";

export type ImportStatus = "pending" | "processing" | "completed" | "failed";
export type ImportSource = "CCTNS_SpecialDrives" | "CCTNS_Convictions" | "CCTNS_Detections" | "Manual" | "Excel" | "CSV" | "PDF";

export interface ImportLogDocument {
  filename: string;
  source: ImportSource;
  status: ImportStatus;
  totalRecords: number;
  processedRecords: number;
  failedRecords: number;
  errors: Array<{ row: number; field: string; message: string }>;
  uploadedBy: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const ImportLogSchema = new Schema(
  {
    filename: { type: String, required: true },
    source: {
      type: String,
      enum: ["CCTNS_SpecialDrives", "CCTNS_Convictions", "CCTNS_Detections", "Manual", "Excel", "CSV", "PDF"],
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending"
    },
    totalRecords: { type: Number, default: 0 },
    processedRecords: { type: Number, default: 0 },
    failedRecords: { type: Number, default: 0 },
    errors: [
      {
        row: Number,
        field: String,
        message: String
      }
    ],
    uploadedBy: { type: String, required: true },
    metadata: { type: Schema.Types.Mixed }
  },
  { timestamps: true }
);

ImportLogSchema.index({ uploadedBy: 1, createdAt: -1 });
ImportLogSchema.index({ status: 1 });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ImportLogModel =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (models.ImportLog as any) || (model("ImportLog", ImportLogSchema) as any);

