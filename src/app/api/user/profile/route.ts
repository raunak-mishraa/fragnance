// app/api/user/profile/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("authToken")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: { addresses: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      addresses: user.addresses,
    });
  } catch (err) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}


// PATCH update user profile (name)
export async function PATCH(req: Request) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("authToken")?.value;

  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const body = await req.json();
    const { name } = body;

    const updatedUser = await prisma.user.update({
      where: { id: decoded.id },
      data: { name },
    });

    return NextResponse.json({ message: "Profile updated", user: updatedUser });
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}