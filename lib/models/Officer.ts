import { Schema, model, models } from "mongoose";

export interface OfficerDocument {
  name: string;
  badgeId: string;
  department: string;
  designation: string;
  district?: string;
  caseClosed: number;
  cyberResolved: number;
  feedbackScore: number;
  awarenessPrograms: number;
  emergencyResponses: number;
  totalScore: number;
  lastUpdated: Date;
  createdAt: Date;
  updatedAt: Date;
}

const OfficerSchema = new Schema(
  {
    name: { type: String, required: true },
    badgeId: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    designation: { type: String, required: true },
    district: { type: String },
    caseClosed: { type: Number, default: 0 },
    cyberResolved: { type: Number, default: 0 },
    feedbackScore: { type: Number, default: 0 },
    awarenessPrograms: { type: Number, default: 0 },
    emergencyResponses: { type: Number, default: 0 },
    totalScore: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: () => new Date() }
  },
  { timestamps: true }
);

OfficerSchema.index({ badgeId: 1 });
OfficerSchema.index({ department: 1 });
OfficerSchema.index({ totalScore: -1 });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const OfficerModel =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (models.Officer as any) || (model("Officer", OfficerSchema) as any);


