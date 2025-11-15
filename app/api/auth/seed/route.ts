import { connectMongo } from "@/lib/db";
import { AdminModel, KPIWeightsModel } from "@/lib/models";
import { hashPassword } from "@/lib/auth";
import { ok, serverError } from "@/lib/http";

export const runtime = 'nodejs';

export async function POST() {
  try {
    // Try to connect to MongoDB
    try {
      await connectMongo();
    } catch (dbError: unknown) {
      const errorMsg = (dbError instanceof Error ? dbError.message : String(dbError)) || "Unknown database error";
      if (errorMsg.includes("ECONNREFUSED") || errorMsg.includes("ENOTFOUND")) {
        return serverError("Cannot connect to MongoDB. Please check your MONGODB_URI in .env.local", {
          error: "Database connection failed",
          hint: "Make sure MongoDB is running and MONGODB_URI is correct in .env.local"
        });
      }
      throw dbError;
    }

    let adminCreated = false;
    // Check if SuperAdmin exists
    const superAdmin = await AdminModel.findOne({ role: "SuperAdmin" });
    if (!superAdmin) {
      const passwordHash = await hashPassword("admin123");
      await AdminModel.create({
        username: "superadmin",
        password: passwordHash,
        role: "SuperAdmin"
      });
      adminCreated = true;
    }

    let weightsCreated = false;
    // Check if KPI weights exist
    const weights = await KPIWeightsModel.findOne();
    if (!weights) {
      await KPIWeightsModel.create({});
      weightsCreated = true;
    }

    return ok({ 
      message: adminCreated 
        ? "Database seeded successfully! Demo account created." 
        : "Database already seeded. Demo account exists.",
      adminCreated,
      weightsCreated,
      credentials: {
        username: "superadmin",
        password: "admin123"
      }
    });
  } catch (error: unknown) {
    console.error("Seed error:", error);
    const errorMsg = (error instanceof Error ? error.message : String(error)) || "Unknown error";
    return serverError("Failed to seed database", {
      error: errorMsg,
      hint: "Check your MongoDB connection string in .env.local"
    });
  }
}

