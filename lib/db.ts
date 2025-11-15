import mongoose from "mongoose";
import { env } from "./env";

declare global {
  // eslint-disable-next-line no-var
  var mongooseConn: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

const globalWithMongoose = global as typeof globalThis & {
  mongooseConn: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
};

let cached = globalWithMongoose.mongooseConn;

if (!cached) {
  cached = globalWithMongoose.mongooseConn = { conn: null, promise: null };
}

export async function connectMongo(): Promise<typeof mongoose | null> {
  // If the build is running and we want to skip DB access during
  // static export, respect the flag and return null instead of
  // attempting to connect. This avoids build-time failures when the
  // project's environment cannot reach MongoDB (e.g., local build
  // without Atlas IP whitelisting).
  if (process.env.SKIP_DB_ON_BUILD === "true") {
    // Keep a short-circuit to avoid repeated attempts.
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const uri = env.MONGODB_URI || "mongodb://localhost:27017/police_analytics";
    cached.promise = mongoose.connect(uri, {
      dbName: "police_analytics"
    }).catch((error: any) => {
      // Don't keep a rejected promise around.
      cached.promise = null;
      // Log and swallow the error so build-time prerender doesn't fail.
      // Callers should handle missing data gracefully where possible.
      // eslint-disable-next-line no-console
      console.warn("connectMongo: connection failed (swallowed):", error?.message || error);
      return null as unknown as typeof mongoose;
    });
  }

  try {
    const conn = await cached.promise;
    if (!conn) {
      // Connection attempt returned null (was swallowed). Return null.
      return null;
    }
    cached.conn = conn;
    return cached.conn;
  } catch (error: any) {
    // Reset promise so future calls can retry, but do not throw during
    // build/export to avoid aborting the process.
    cached.promise = null;
    // eslint-disable-next-line no-console
    console.warn("connectMongo: connection attempt threw (swallowed):", error?.message || error);
    return null;
  }
}


