import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature") as string;
  const body = await req.text();

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );

    switch (event.type) {
      // ✅ Payment succeeded
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.metadata?.orderId;

        if (orderId) {
          await prisma.$transaction(async (tx) => {
            // Update order status
            const order = await tx.order.update({
              where: { id: orderId },
              data: { status: "CONFIRMED" },
            });

            // Create payment record
            await tx.payment.create({
              data: {
                orderId,
                provider: "stripe",
                amount: session.amount_total! / 100,
                status: "SUCCESS",
              },
            });

            // Clear user's cart
            await tx.cartItem.deleteMany({
              where: { cart: { userId: order.userId } },
            });
          });
        }
        break;
      }

      // ❌ Payment expired
      case "checkout.session.expired": {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.metadata?.orderId;

        if (orderId) {
          await prisma.$transaction(async (tx) => {
            await tx.order.update({
              where: { id: orderId },
              data: { status: "CANCELLED" },
            });

            await tx.payment.create({
              data: {
                orderId,
                provider: "stripe",
                amount: session.amount_total! / 100,
                status: "FAILED",
              },
            });
          });
        }
        break;
      }

      // 💸 Refund issued
      case "charge.refunded": {
        const charge = event.data.object as Stripe.Charge;
        const orderId = charge.metadata?.orderId;

        if (orderId) {
          await prisma.payment.updateMany({
            where: { orderId },
            data: { status: "REFUNDED" },
          });

          await prisma.order.update({
            where: { id: orderId },
            data: { status: "CANCELLED" }, // optional, depends on your logic
          });
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }
}
