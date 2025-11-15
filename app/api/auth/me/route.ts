import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/roles";
import { ok } from "@/lib/http";

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const auth = requireAuth(request);
  if ("role" in auth) {
    return ok({ user: auth });
  }
  return auth;
}


