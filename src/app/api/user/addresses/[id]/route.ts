import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

interface Params {
  params: { id: string };
}

export async function DELETE(req: Request, { params }: Params) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("authToken")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const address = await prisma.address.findUnique({ where: { id: params.id } });

    if (!address || address.userId !== decoded.id) {
      return NextResponse.json({ error: "Not allowed" }, { status: 403 });
    }

    await prisma.address.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Address deleted" });
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
