import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

// ✅ Helper to extract user from cookie
function getUserFromCookie(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value;
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET) as { id: string; email: string; role: string };
  } catch {
    return null;
  }
}

// ✅ GET Cart (user’s cart with items)
export async function GET(req: NextRequest) {
  const user = getUserFromCookie(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const cart = await prisma.cart.findFirst({
    where: { userId: user.id },
    include: {
      items: {
        include: { perfume: { include: { images: true, brand: true } } },
      },
    },
  });

  return NextResponse.json(cart || { items: [] });
}

// ✅ POST Add item to cart
export async function POST(req: NextRequest) {
  const user = getUserFromCookie(req);
  console.log("User from cookie:", user);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { perfumeId, quantity } = await req.json();
  if (!perfumeId) return NextResponse.json({ error: "perfumeId required" }, { status: 400 });

  let cart = await prisma.cart.findFirst({ where: { userId: user.id } });
  if (!cart) {
    cart = await prisma.cart.create({ data: { userId: user.id } });
  }

  const existingItem = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, perfumeId },
  });
  console.log("Existing item:", existingItem);

  if (existingItem) {
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + (quantity || 1) },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        perfumeId,
        quantity: quantity || 1,
      },
    });
  }

  return NextResponse.json({ message: "Item added to cart" });
}

// ✅ PATCH Update quantity
export async function PATCH(req: NextRequest) {
  const user = getUserFromCookie(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { itemId, quantity } = await req.json();
  if (!itemId || quantity < 1)
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });

  await prisma.cartItem.update({
    where: { id: itemId },
    data: { quantity },
  });

  return NextResponse.json({ message: "Quantity updated" });
}

// ✅ DELETE Remove item
export async function DELETE(req: NextRequest) {
  const user = getUserFromCookie(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { itemId } = await req.json();
  if (!itemId) return NextResponse.json({ error: "itemId required" }, { status: 400 });

  await prisma.cartItem.delete({ where: { id: itemId } });

  return NextResponse.json({ message: "Item removed" });
}
