import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateOtp, addMinutes } from "@/lib/otp";
import { sendOtpEmail } from "@/helpers/sendOtpEmail";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    const otp = generateOtp();
    const expiresAt = addMinutes(new Date(), 5);

    await prisma.adminOTP.create({
      data: {
        code: otp,
        email,
        adminId: admin.id,
        expiresAt,
      },
    });

    await sendOtpEmail(email, otp);

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
