import { NextRequest, NextResponse } from "next/server";
import { TOKEN_COOKIE } from "@/lib/auth";

const PUBLIC_PATHS = ["/", "/login", "/showcase", "/api/auth/login", "/api/auth/logout"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublic = PUBLIC_PATHS.some((path) => pathname.startsWith(path));

  const token = request.cookies.get(TOKEN_COOKIE)?.value;

  if (!isPublic && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isPublic && token && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/leaderboard/:path*", "/analytics/:path*", "/districts/:path*", "/drives/:path*", "/special-drives/:path*", "/map/:path*", "/reports/:path*", "/data-ingestion/:path*", "/admin/:path*", "/profile/:path*", "/api/:path*"]
};


