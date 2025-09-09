import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;
console.log("Token from cookie:", token);
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Verify JWT
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
      role: string;
    };

    console.log("Decoded JWT:", decoded);
    // Optionally fetch user
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: { addresses: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
  }
}

export async function PUT(req: Request) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("authToken")?.value;
  console.log("userId from cookie:", userId);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { name: body.name },
    include: { addresses: true },
  });

  return NextResponse.json(updatedUser);
}
