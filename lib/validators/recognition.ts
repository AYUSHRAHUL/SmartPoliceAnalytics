import { z } from "zod";

export const recognitionSchema = z.object({
  officerId: z.string().min(1),
  month: z.string().min(4),
  badge: z.enum(["Gold", "Silver", "Bronze"]),
  message: z.string().max(280).optional(),
  recognizedBy: z.string().min(1)
});


