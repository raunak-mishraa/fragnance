import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("admin_refresh")?.value;

    if (!refreshToken) {
      return NextResponse.json({ error: "No refresh token" }, { status: 401 });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!);

    // Issue new access token
    const newAccessToken = jwt.sign(
      { adminId: (decoded as any).adminId },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    );

    cookieStore.set("admin_access", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 15,
    });

    return NextResponse.json({ message: "Token refreshed" });
  } catch (err) {
    return NextResponse.json({ error: "Invalid refresh token" }, { status: 403 });
  }
}
