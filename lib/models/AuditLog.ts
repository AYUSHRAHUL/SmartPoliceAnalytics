import { Schema, model, models } from "mongoose";

export interface AuditLogDocument {
  action: string;
  entity: string;
  entityId: string;
  user: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const AuditLogSchema = new Schema(
  {
    action: { type: String, required: true },
    entity: { type: String, required: true },
    entityId: { type: String, required: true },
    user: { type: String, default: "system" },
    metadata: { type: Schema.Types.Mixed }
  },
  { timestamps: true }
);

AuditLogSchema.index({ entity: 1, createdAt: -1 });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AuditLogModel =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (models.AuditLog as any) || (model("AuditLog", AuditLogSchema) as any);


