import { Schema, model, models, Types } from "mongoose";

export interface RecognitionDocument {
  officerId: Types.ObjectId;
  month: string;
  badge: "Gold" | "Silver" | "Bronze";
  message?: string;
  recognizedBy: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const RecognitionSchema = new Schema(
  {
    officerId: { type: Schema.Types.ObjectId, ref: "Officer", required: true },
    month: { type: String, required: true },
    badge: { type: String, enum: ["Gold", "Silver", "Bronze"], required: true },
    message: { type: String },
    recognizedBy: { type: String, required: true },
    date: { type: Date, default: () => new Date() }
  },
  { timestamps: true }
);

RecognitionSchema.index({ officerId: 1, month: 1 });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const RecognitionModel =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (models.Recognition as any) || (model("Recognition", RecognitionSchema) as any);


