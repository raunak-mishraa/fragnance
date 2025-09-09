// src/app/api/v1/verify-otp/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
// console.log(JWT_SECRET)
export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();
    
    if (!email || !otp) {
      return NextResponse.json({ message: "Email and OTP required" }, { status: 400 });
    }

    // Get latest OTP for the email
    const otpEntry = await prisma.oTP.findFirst({
      where: { email },
      orderBy: { createdAt: 'desc' },
    });


    if (!otpEntry) {
      return NextResponse.json({ message: "No OTP found" }, { status: 400 });
    }

   // Check expiry (15 min)
    const now = new Date();
    if (otpEntry.expiresAt < now) {
      return NextResponse.json({ message: "OTP expired" }, { status: 400 });
    }

    // Check OTP
    const isMatch = await bcrypt.compare(otp, otpEntry.code);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
    }

    // Create user if not exists
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({ data: { email } });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: "user" },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Set cookie (HttpOnly, Secure)
    const response = NextResponse.json({ message: "OTP verified, logged in" });
    response.cookies.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (err) {
    console.error("Verify OTP error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
