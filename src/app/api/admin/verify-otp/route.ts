import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { email, code } = await req.json();

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

  await prisma.adminOTP.update({
    where: { id: otpRecord.id },
    data: { used: true },
  });

  await prisma.admin.update({
    where: { email },
    data: { isVerified: true },
  });

  // Secure cookie
  const cookieStore = await cookies();
  cookieStore.set("admin_session", otpRecord.adminId!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });

  return NextResponse.json({ message: "Admin authenticated" });
}
