import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import Stripe from "stripe";
import jwt from "jsonwebtoken";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

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

export async function POST(req: NextRequest) {
  const user = getUserFromCookie(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { shippingId } = await req.json();
  if (!shippingId) {
    return NextResponse.json({ error: "Shipping address required" }, { status: 400 });
  }

  // Get cart
  const cart = await prisma.cart.findFirst({
    where: { userId: user.id },
    include: { items: { include: { perfume: true } } },
  });

  if (!cart || cart.items.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  // Calculate total + prepare line items for Stripe
  const lineItems = cart.items.map((item) => ({
    price_data: {
      currency: "inr", // or "inr"
      product_data: {
        name: item.perfume.flavor,
        description: item.perfume.description ?? "",
      },
      unit_amount: Math.round(Number(item.perfume.mrp) * 100), // cents/paise
    },
    quantity: item.quantity,
  }));

  // Create pending order in DB
  const order = await prisma.order.create({
    data: {
      userId: user.id,
      shippingId,
      totalAmount: cart.items.reduce(
        (acc, item) => acc + Number(item.perfume.mrp) * item.quantity,
        0
      ),
      status: "PENDING",
      items: {
        create: cart.items.map((item) => ({
          perfumeId: item.perfumeId,
          quantity: item.quantity,
          price: item.perfume.mrp,
        })),
      },
    },
  });

  // Create Stripe Checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: lineItems,
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?orderId=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/cancel?orderId=${order.id}`,
    metadata: { orderId: order.id },
  });

  return NextResponse.json({ url: session.url });
}
