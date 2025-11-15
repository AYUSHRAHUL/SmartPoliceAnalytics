import { z } from "zod";

const clientEnvSchema = z.object({
  NEXT_PUBLIC_APP_NAME: z.string().default("Smart Police Analytics"),
  NEXT_PUBLIC_DEMO_MODE: z.enum(["0", "1"]).default("0")
});

const serverEnvSchema = z.object({
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters"),
  JWT_EXPIRES_IN: z.string().default("7d"),
  APP_URL: z.string().url().default("http://localhost:3000"),
  ANALYTICS_SERVICE_URL: z.string().url().optional()
});

const _clientEnv = clientEnvSchema.safeParse({
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_DEMO_MODE: process.env.NEXT_PUBLIC_DEMO_MODE
});

if (!_clientEnv.success) {
  console.warn("Invalid client environment variables", _clientEnv.error.flatten().fieldErrors);
}

// Use defaults for development if env vars are missing
const serverEnvDefaults = {
  MONGODB_URI: process.env.MONGODB_URI || (process.env.NODE_ENV === "development" ? "mongodb://localhost:27017/police_analytics" : ""),
  JWT_SECRET: process.env.JWT_SECRET || (process.env.NODE_ENV === "development" ? "dev-secret-key-change-in-production-min-32-chars-long" : ""),
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
  APP_URL: process.env.APP_URL || "http://localhost:3000",
  ANALYTICS_SERVICE_URL: process.env.ANALYTICS_SERVICE_URL
};

const _serverEnv = serverEnvSchema.safeParse(serverEnvDefaults);

let serverEnvData;
if (!_serverEnv.success) {
  console.error("Invalid server environment variables:", _serverEnv.error.flatten().fieldErrors);
  // In development, use defaults instead of throwing
  if (process.env.NODE_ENV === "development") {
    console.warn("Using default values for missing environment variables");
    // Use defaults even if validation fails in dev
    serverEnvData = {
      MONGODB_URI: serverEnvDefaults.MONGODB_URI || "mongodb://localhost:27017/police_analytics",
      JWT_SECRET: serverEnvDefaults.JWT_SECRET || "dev-secret-key-change-in-production-min-32-chars-long",
      JWT_EXPIRES_IN: serverEnvDefaults.JWT_EXPIRES_IN,
      APP_URL: serverEnvDefaults.APP_URL,
      ANALYTICS_SERVICE_URL: serverEnvDefaults.ANALYTICS_SERVICE_URL
    };
  } else {
    throw new Error(`Invalid server environment variables: ${JSON.stringify(_serverEnv.error.flatten().fieldErrors)}`);
  }
} else {
  serverEnvData = _serverEnv.data;
}

export const env = {
  ...(_clientEnv.data || {}),
  ...serverEnvData
};


