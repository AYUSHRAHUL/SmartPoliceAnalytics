import { z } from "zod";

export const kpiWeightsSchema = z.object({
  caseClosedWeight: z.number().min(0).max(1),
  cyberResolvedWeight: z.number().min(0).max(1),
  feedbackWeight: z.number().min(0).max(1),
  awarenessWeight: z.number().min(0).max(1)
}).refine((data) => {
  const total = data.caseClosedWeight + data.cyberResolvedWeight + data.feedbackWeight + data.awarenessWeight;
  return Math.abs(total - 1) < 0.0001;
}, {
  message: "Weights must sum to 1"
});


