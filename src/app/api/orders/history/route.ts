import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

function getUserFromCookie(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value;
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET) as { id: string };
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const user = getUserFromCookie(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    include: {
      items: {
        include: {
          perfume: { include: { images: true } },
        },
      },
      payment: true,
      shipping: true, // ✅ Include shipping address
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(orders);
}
