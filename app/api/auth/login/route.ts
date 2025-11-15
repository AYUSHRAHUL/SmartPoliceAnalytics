import { NextRequest, NextResponse } from "next/server";
import { connectMongo } from "@/lib/db";
import { AdminModel } from "@/lib/models";
import { comparePassword, signJwt } from "@/lib/auth";
import { badRequest, serverError, unauthorized } from "@/lib/http";
import { loginSchema } from "@/lib/validators/auth";

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const parseResult = loginSchema.safeParse(json);
    if (!parseResult.success) {
      return badRequest("Invalid credentials payload", parseResult.error.flatten());
    }

    const { username, password } = parseResult.data;
    
    // Try to connect to MongoDB
    try {
      await connectMongo();
    } catch (dbError: unknown) {
      console.error("Database connection error:", dbError);
      const errorMsg = (dbError instanceof Error ? dbError.message : String(dbError)) || "Database connection failed";
      if (errorMsg.includes("ECONNREFUSED") || errorMsg.includes("ENOTFOUND")) {
        return serverError("Cannot connect to database. Please check your MongoDB connection.", {
          error: "Database connection failed",
          hint: "Make sure MongoDB is running and MONGODB_URI is set in .env.local"
        });
      }
      throw dbError;
    }

    const admin = await AdminModel.findOne({ username });
    if (!admin) {
      return unauthorized("Invalid username or password");
    }

    const passwordMatch = await comparePassword(password, admin.password);
    if (!passwordMatch) {
      return unauthorized("Invalid username or password");
    }

    const token = signJwt({
      sub: admin._id.toString(),
      username: admin.username,
      role: admin.role
    });

    // Set HTTP-only cookie
    const response = NextResponse.json(
      { username: admin.username, role: admin.role, token },
      { status: 200 }
    );

    response.cookies.set("police-dashboard-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return serverError("Failed to login", error);
  }
}


