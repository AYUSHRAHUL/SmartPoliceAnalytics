import { NextResponse } from "next/server";

export function ok<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ success: true, data }, { status: 200, ...init });
}

export function created<T>(data: T) {
  return NextResponse.json({ success: true, data }, { status: 201 });
}

export function badRequest(message: string, details?: unknown) {
  return NextResponse.json({ success: false, message, details }, { status: 400 });
}

export function unauthorized(message = "Unauthorized") {
  return NextResponse.json({ success: false, message }, { status: 401 });
}

export function forbidden(message = "Forbidden") {
  return NextResponse.json({ success: false, message }, { status: 403 });
}

export function notFound(message = "Not found") {
  return NextResponse.json({ success: false, message }, { status: 404 });
}

export function serverError(message = "Internal server error", details?: unknown) {
  console.error(message, details);
  return NextResponse.json({ success: false, message }, { status: 500 });
}


