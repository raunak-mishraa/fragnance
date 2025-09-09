import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export async function GET() {
  const userId = (await cookies()).get("userId")?.value;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const addresses = await prisma.address.findMany({
    where: { userId },
  });

  return NextResponse.json(addresses);
}

export async function POST(req: Request) {
  const cookieStore = await cookies(); // not async
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const newAddress = await prisma.address.create({
    data: {
      userId,
      fullName: body.fullName ?? "Unnamed",
      phone: body.phone,
      street: body.street,
      city: body.city,
      state: body.state,
      zip: body.zip,
      country: body.country,
      isDefault: body.isDefault ?? false,
    },
  });

  return NextResponse.json(newAddress, { status: 201 });
}

export async function DELETE(req: Request) {
  const userId = (await cookies()).get("userId")?.value;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  // ensure user owns this address
  const address = await prisma.address.findUnique({
    where: { id },
  });

  if (!address || address.userId !== userId) {
    return NextResponse.json({ error: "Not found or forbidden" }, { status: 403 });
  }

  await prisma.address.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
