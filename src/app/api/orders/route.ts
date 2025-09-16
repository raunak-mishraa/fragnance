// app/api/orders/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const userId = req.headers.get("x-user-id"); // ✅ replace with auth session (e.g. Lucia / JWT)

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const orders = await prisma.order.findMany({
  where: { userId },
  include: {
    items: {
      include: { perfume: { include: { images: true } } }, // ✅ use perfume, not product
    },
    payment: true,
  },
  orderBy: { createdAt: "desc" },
});


  return NextResponse.json(orders);
}
