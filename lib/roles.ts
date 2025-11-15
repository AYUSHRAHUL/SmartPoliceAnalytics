import { NextRequest } from "next/server";
import { TOKEN_COOKIE, verifyJwt } from "./auth";
import { forbidden, unauthorized } from "./http";
import type { JwtPayload } from "./auth";

export type Role = "Officer" | "Admin" | "SuperAdmin";

export function requireAuth(request: NextRequest): JwtPayload | ReturnType<typeof unauthorized> {
  const token = request.cookies.get(TOKEN_COOKIE)?.value;
  if (!token) {
    return unauthorized();
  }

  try {
    const payload = verifyJwt(token);
    return payload;
  } catch (error) {
    console.warn("Auth verification failed", error);
    return unauthorized();
  }
}

export function requireRole(request: NextRequest, roles: Role[]) {
  const result = requireAuth(request);
  if ("role" in result) {
    if (!roles.includes(result.role)) {
      return forbidden();
    }
    return result;
  }
  return result;
}


