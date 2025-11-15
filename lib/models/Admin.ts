import { Schema, model, models } from "mongoose";

export type AdminRole = "Officer" | "Admin" | "SuperAdmin";

export interface AdminDocument {
  username: string;
  password: string;
  role: AdminRole;
  createdAt: Date;
  updatedAt: Date;
}

const AdminSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["Officer", "Admin", "SuperAdmin"],
      default: "Admin"
    }
  },
  { timestamps: true }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AdminModel =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (models.Admin as any) || (model("Admin", AdminSchema) as any);



