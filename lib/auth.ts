import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import { cookies } from "next/headers";
import { env } from "./env";

export const TOKEN_COOKIE = "police-dashboard-token";

export function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export interface JwtPayload {
  sub: string;
  username: string;
  role: "Officer" | "Admin" | "SuperAdmin";
}

export function signJwt(payload: JwtPayload) {
  const secret = env.JWT_SECRET as string;
  const expiresIn = env.JWT_EXPIRES_IN || "7d";
  const options = { expiresIn };
  return jwt.sign(payload, secret, options as SignOptions);
}

export function verifyJwt(token: string) {
  const secret = env.JWT_SECRET as string;
  return jwt.verify(token, secret) as JwtPayload;
}

export function setAuthCookie(token: string) {
  cookies().set(TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7 // 7 days
  });
}

export function clearAuthCookie() {
  cookies().delete(TOKEN_COOKIE);
}

export function getAuthCookie() {
  return cookies().get(TOKEN_COOKIE)?.value ?? null;
}


