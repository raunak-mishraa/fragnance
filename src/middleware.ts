// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const session = req.cookies.get("admin_session");

  const isAuthRoute =
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/otp-verification");

  // If not logged in → redirect to login
  if (!session && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If logged in → block access to login/otp
  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  // For rolling sessions: if session exists and on protected route, extend the session cookie
  if (session && !isAuthRoute) {
    const response = NextResponse.next();
    // Assuming a session duration, e.g., 7 days. Adjust as needed.
    // Include original cookie options if known (e.g., secure, httpOnly).
    response.cookies.set("admin_session", session.value, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/login", "/otp-verification"],
};