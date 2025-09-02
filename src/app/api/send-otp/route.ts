import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { sendOtpEmail } from "@/helpers/sendOtpEmail";
import bcrypt from "bcryptjs";
import { generateOtp } from "@/lib/otp";

// function generateOTP() {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// }

export async function POST(request: Request) {
  try {
    console.log("Form submitted:");
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // Invalidate all previous unused OTPs for this email
    await prisma.oTP.updateMany({
      where: { email, used: false },
      data: { used: true },
    });

    const otpCode = generateOtp();
    const hashedOtp = await bcrypt.hash(otpCode, 10);
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15); // valid for 15 mins

    // Create new OTP entry
    await prisma.oTP.create({
      data: {
        code: hashedOtp,
        email,
        expiresAt,
        used: false,
      },
    });

    await sendOtpEmail(email, otpCode);

    return NextResponse.json(
      { message: "OTP sent successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
