import { Schema, model, models } from "mongoose";

export interface KPIWeightsDocument {
  caseClosedWeight: number;
  cyberResolvedWeight: number;
  feedbackWeight: number;
  awarenessWeight: number;
  createdAt: Date;
  updatedAt: Date;
}

const KPIWeightsSchema = new Schema(
  {
    caseClosedWeight: { type: Number, default: 0.4 },
    cyberResolvedWeight: { type: Number, default: 0.3 },
    feedbackWeight: { type: Number, default: 0.2 },
    awarenessWeight: { type: Number, default: 0.1 }
  },
  { timestamps: true }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const KPIWeightsModel =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (models.KPIWeights as any) || (model("KPIWeights", KPIWeightsSchema) as any);


