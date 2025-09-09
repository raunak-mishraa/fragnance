import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken"; // install with `npm install jsonwebtoken`

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();

    // 1. Find OTP record
    const otpRecord = await prisma.adminOTP.findFirst({
      where: {
        email,
        code,
        used: false,
        expiresAt: { gt: new Date() },
      },
    });

    if (!otpRecord) {
      return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
    }

    // 2. Mark OTP as used
    await prisma.adminOTP.update({
      where: { id: otpRecord.id },
      data: { used: true },
    });

    // 3. Verify admin
    const admin = await prisma.admin.update({
      where: { email },
      data: { isVerified: true },
    });

    // 4. Create JWT
    const accessToken = jwt.sign(
      { id: admin.id, email: admin.email, role: "admin" },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" } 
    );
    
    const refreshToken = jwt.sign(
      { adminId: admin.id },
      process.env.JWT_REFRESH_SECRET!, 
      { expiresIn: "30d" }
    );
    

    // 5. Secure cookie with JWT
    const cookieStore = await cookies();
    cookieStore.set("authToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24, 
    });
    
    cookieStore.set("admin_refresh", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return NextResponse.json({ message: "Admin authenticated", accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
