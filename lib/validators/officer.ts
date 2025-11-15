import { z } from "zod";

export const createOfficerSchema = z.object({
  name: z.string().min(1),
  badgeId: z.string().min(1),
  department: z.string().min(1),
  designation: z.string().min(1),
  district: z.string().optional(),
  caseClosed: z.number().nonnegative().optional(),
  cyberResolved: z.number().nonnegative().optional(),
  feedbackScore: z.number().min(0).max(5).optional(),
  awarenessPrograms: z.number().nonnegative().optional(),
  emergencyResponses: z.number().nonnegative().optional(),
  totalScore: z.number().nonnegative().optional()
});

export const updateOfficerSchema = createOfficerSchema.partial();


