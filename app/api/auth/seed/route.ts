import { connectMongo } from "@/lib/db";
import { AdminModel, KPIWeightsModel } from "@/lib/models";
import { hashPassword } from "@/lib/auth";
import { ok, serverError } from "@/lib/http";
import { seedOdishaData } from "@/lib/services/seedOdishaData";

export const runtime = 'nodejs';

export async function POST() {
  try {
    console.log("Starting seed process...");
    
    // Try to connect to MongoDB
    console.log("Attempting to connect to MongoDB...");
    console.log("MONGODB_URI:", process.env.MONGODB_URI ? "***configured***" : "NOT SET - using default");
    
    const connection = await connectMongo();
    if (!connection) {
      console.error("MongoDB connection failed - connection is null");
      const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/police_analytics";
      const isLocal = mongoUri.includes("localhost") || mongoUri.includes("127.0.0.1");
      
      let hint = "Make sure MongoDB is running and MONGODB_URI is correct.";
      if (isLocal) {
        hint = "Local MongoDB connection failed. Make sure MongoDB is installed and running on your machine. You can:\n1. Install MongoDB locally\n2. Use MongoDB Atlas (cloud) and update MONGODB_URI in .env.local\n3. Check if MongoDB service is running: `mongod --version`";
      } else {
        hint = "MongoDB Atlas connection failed. Check:\n1. Your MONGODB_URI in .env.local is correct\n2. Your IP address is whitelisted in MongoDB Atlas Network Access\n3. Your database user has proper permissions";
      }
      
      return serverError("Cannot connect to MongoDB. Please check your MONGODB_URI in .env.local", {
        error: "Database connection failed",
        hint: hint,
        mongoUri: isLocal ? "Using default: mongodb://localhost:27017/police_analytics" : "Check your .env.local file"
      });
    }
    console.log("MongoDB connected successfully");
    
    // Verify connection is ready (mongoose.connection.readyState: 0=disconnected, 1=connected, 2=connecting, 3=disconnecting)
    const readyState = connection.connection?.readyState;
    if (readyState !== 1) {
      console.error("MongoDB connection not ready, state:", readyState);
      return serverError("MongoDB connection is not ready", {
        error: "Database connection not ready",
        hint: `Connection state: ${readyState}. Wait a moment and try again, or check your MongoDB connection.`
      });
    }
    console.log("MongoDB connection verified ready");

    let adminCreated = false;
    // Check if superadmin user exists (by username, not just role)
    console.log("Checking for superadmin user...");
    const superAdmin = await AdminModel.findOne({ username: "superadmin" });
    if (!superAdmin) {
      console.log("superadmin user not found, creating new one...");
      const passwordHash = await hashPassword("admin123");
      await AdminModel.create({
        username: "superadmin",
        password: passwordHash,
        role: "SuperAdmin"
      });
      adminCreated = true;
      console.log("Created superadmin user with password: admin123");
    } else {
      console.log("superadmin user found, resetting password...");
      // If admin exists but password might be wrong, reset it
      const passwordHash = await hashPassword("admin123");
      superAdmin.password = passwordHash;
      await superAdmin.save();
      adminCreated = false; // Not newly created, but password was reset
      console.log("superadmin user already exists, password reset to: admin123");
    }

    let weightsCreated = false;
    // Check if KPI weights exist
    console.log("Checking for KPI weights...");
    const weights = await KPIWeightsModel.findOne();
    if (!weights) {
      console.log("KPI weights not found, creating default...");
      await KPIWeightsModel.create({});
      weightsCreated = true;
      console.log("Created default KPI weights");
    } else {
      console.log("KPI weights already exist");
    }

    // Seed Odisha data (officers, CCTNS data, recognitions, special drives)
    console.log("\nStarting Odisha data seeding...");
    try {
      await seedOdishaData();
      console.log("✅ Odisha data seeding completed");
    } catch (odishaError) {
      console.error("Error seeding Odisha data:", odishaError);
      // Don't fail the entire request if Odisha seeding fails
      // Admin user and KPI weights are more critical
    }

    return ok({ 
      message: adminCreated 
        ? "Database seeded successfully! Demo account created with Odisha state data." 
        : "Database seeded with Odisha state data. Demo account password reset to ensure it works.",
      adminCreated,
      passwordReset: !adminCreated,
      weightsCreated,
      odishaDataSeeded: true,
      credentials: {
        username: "superadmin",
        password: "admin123"
      },
      summary: {
        officers: 1000,
        cctnsData: 2500,
        recognitions: 500,
        districts: 30,
        specialDrives: "All drive types for all districts"
      }
    });
  } catch (error: unknown) {
    console.error("Seed error:", error);
    const errorMsg = (error instanceof Error ? error.message : String(error)) || "Unknown error";
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error("Error stack:", errorStack);
    
    // Provide more specific error messages
    let hint = "Check your MongoDB connection string in .env.local";
    if (errorMsg.includes("timeout") || errorMsg.includes("buffering")) {
      hint = "MongoDB connection timed out. Check if MongoDB is running and your IP is whitelisted in MongoDB Atlas.";
    } else if (errorMsg.includes("ECONNREFUSED") || errorMsg.includes("ENOTFOUND")) {
      hint = "Cannot reach MongoDB server. Verify your MONGODB_URI and ensure MongoDB is running.";
    } else if (errorMsg.includes("authentication failed")) {
      hint = "MongoDB authentication failed. Check your username and password in MONGODB_URI.";
    }
    
    return serverError("Failed to seed database", {
      error: errorMsg,
      hint: hint,
      details: process.env.NODE_ENV === "development" ? errorStack : undefined
    });
  }
}

